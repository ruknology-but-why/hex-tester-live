import { db } from './db.js';

export function listProducts() {
  return db.prepare('SELECT sku, name, stock, price_cents FROM products ORDER BY sku').all();
}

export function findProduct(sku) {
  return db.prepare('SELECT sku, name, stock, price_cents FROM products WHERE sku = ?').get(sku) ?? null;
}

export function searchProducts(term) {
  return db.prepare('SELECT sku, name FROM products WHERE name LIKE ?').all('%' + term + '%');
}
