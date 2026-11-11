import test from 'node:test';
import assert from 'node:assert/strict';
import { ordersFor, placeOrder } from '../src/orders.js';
import { findProduct } from '../src/inventory.js';

test('placing an order reduces stock and records it', () => {
  const before = findProduct('BOLT-M6').stock;
  const order = placeOrder('acme', 'BOLT-M6', 2);
  assert.equal(order.total_cents, 2598);
  assert.equal(findProduct('BOLT-M6').stock, before - 2);
  assert.deepEqual(ordersFor('acme').map((o) => o.id), [order.id]);
});

test('rejects quantities above stock', () => {
  assert.throws(() => placeOrder('acme', 'DRILL-18V', 999), /Not enough stock/);
});

test('rejects non-integer quantities', () => {
  assert.throws(() => placeOrder('acme', 'NUT-M6', 1.5), /positive integer/);
});
