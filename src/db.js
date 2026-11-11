import { DatabaseSync } from 'node:sqlite';

export const db = new DatabaseSync(process.env.INVENTORY_DB ?? ':memory:');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (sku TEXT PRIMARY KEY, name TEXT NOT NULL, stock INTEGER NOT NULL, price_cents INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, customer TEXT NOT NULL, sku TEXT NOT NULL, quantity INTEGER NOT NULL);
`);

if (!db.prepare('SELECT COUNT(*) AS n FROM products').get().n) {
  const insert = db.prepare('INSERT INTO products VALUES (?, ?, ?, ?)');
  insert.run('BOLT-M6', 'M6 hex bolt (100 pack)', 240, 1299);
  insert.run('NUT-M6', 'M6 nut (100 pack)', 180, 899);
  insert.run('DRILL-18V', '18V cordless drill', 12, 8999);
}
