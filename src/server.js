import express from 'express';
import { findProduct, listProducts, searchProducts } from './inventory.js';
import { ordersFor, placeOrder } from './orders.js';

const app = express();
app.use(express.json());

// Customer identity comes from the upstream gateway.
const customerOf = (req) => req.get('x-customer-id');

app.get('/products', (req, res) => res.json(req.query.q ? searchProducts(String(req.query.q)) : listProducts()));

app.get('/products/:sku', (req, res) => {
  const product = findProduct(req.params.sku);
  product ? res.json(product) : res.status(404).end();
});

app.post('/orders', (req, res) => {
  const customer = customerOf(req);
  if (!customer) return res.status(401).end();
  try {
    res.status(201).json(placeOrder(customer, req.body.sku, req.body.quantity));
  } catch (error) {
    if (error instanceof RangeError) return res.status(400).json({ error: error.message });
    throw error;
  }
});

app.get('/orders', (req, res) => {
  const customer = customerOf(req);
  customer ? res.json(ordersFor(customer)) : res.status(401).end();
});

app.listen(process.env.PORT ?? 4100, () => console.log('inventory-service listening'));
