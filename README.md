# inventory-service

Warehouse inventory and order API (Express + SQLite).

> **Test fixture.** This repo is the live target for Hex's push-triggered reviews. It starts clean; the drills in [DRILLS.md](DRILLS.md) introduce one vulnerability per push.

```sh
npm install
npm start      # http://localhost:4100
npm test       # node:test, no install needed
```

| Method | Path | Description |
|---|---|---|
| GET | `/products?q=` | List or search products |
| GET | `/products/:sku` | Product details |
| POST | `/orders` | Place an order (`x-customer-id` header) |
| GET | `/orders` | Your orders |
