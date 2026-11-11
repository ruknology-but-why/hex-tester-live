# Push drills

Each drill is one small commit. Push it, and check that Hex reviews the push and reports the expected finding. Revert or apply the fix drill afterwards so the next drill starts from a clean baseline.

| # | Commit message | Change | Hex should report |
|---|---|---|---|
| 1 | `perf: inline search query` | `src/inventory.js` › `searchProducts`: replace the body with ``return db.prepare(`SELECT sku, name FROM products WHERE name LIKE '%${term}%'`).all();`` | Interpolated SQL (Critical). Fails `security: search input is treated as text` |
| 2 | `feat: invoice archive` | Add to `src/orders.js`: `import { exec } from 'node:child_process';` and ``export function archiveInvoices(customer) { exec('tar -czf invoices-' + customer + '.tgz invoices'); }`` | Command injection (High) |
| 3 | `chore: staging config` | Add `src/config.js` with `export const paymentApiKey = 'pay-staging-7d1e4c9a0b2f';` | Hardcoded secret (High) |
| 4 | `feat: order reference codes` | Add to `src/orders.js`: `export function orderToken() { const token = Math.random().toString(36).slice(2); return token; }` | Weak randomness (Medium) |
| 5 | `feat: pricing rules` | Add to `src/inventory.js`: `export const applyRule = (rule, price) => eval(rule.replace('price', price));` | Dynamic code execution (High) |
| 6 | `feat: allow partner sites` | `npm install cors`, then in `src/server.js` add `import cors from 'cors';` and `app.use(cors());` | Open CORS policy (Medium) |
| — | `fix: revert drill` | `git revert HEAD` | No new findings; baseline tests pass |

Already present on purpose, to check the auto-fix path: Express still sends the `x-powered-by` header, which Hex patches automatically.
