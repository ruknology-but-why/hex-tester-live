import test from 'node:test';
import assert from 'node:assert/strict';
import { findProduct, listProducts, searchProducts } from '../src/inventory.js';

test('lists seeded products', () => {
  assert.equal(listProducts().length >= 3, true);
});

test('finds a product by SKU', () => {
  assert.equal(findProduct('NUT-M6').name, 'M6 nut (100 pack)');
});

test('unknown SKU returns null', () => {
  assert.equal(findProduct('NOPE'), null);
});

test('search matches by name', () => {
  assert.deepEqual(searchProducts('drill').map((p) => p.sku), ['DRILL-18V']);
});

test('security: search input is treated as text', () => {
  assert.deepEqual(searchProducts("' OR 1=1 --"), []);
});
