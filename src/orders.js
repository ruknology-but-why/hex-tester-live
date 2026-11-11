import { db } from './db.js';
import { findProduct } from './inventory.js';

export function placeOrder(customer, sku, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) throw new RangeError('Quantity must be a positive integer.');
  const product = findProduct(sku);
  if (!product) throw new RangeError('Unknown SKU.');
  if (product.stock < quantity) throw new RangeError('Not enough stock.');
  db.prepare('UPDATE products SET stock = stock - ? WHERE sku = ?').run(quantity, sku);
  const { lastInsertRowid } = db.prepare('INSERT INTO orders (customer, sku, quantity) VALUES (?, ?, ?)').run(customer, sku, quantity);
  return { id: Number(lastInsertRowid), total_cents: product.price_cents * quantity };
}

export function ordersFor(customer) {
  return db.prepare('SELECT id, sku, quantity FROM orders WHERE customer = ? ORDER BY id').all(customer);
}
