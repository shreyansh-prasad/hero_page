---
trigger: always_on
description: Security constraints — never bypass
---

# Security Rules
- Never put credentials in code — this site has no backend, but if a future integration (e.g. a registration form endpoint) needs a key, it goes in an environment variable / secrets manager, never committed
- Always validate and sanitize any user-entered text before inserting it into the DOM (innerHTML) — use textContent or explicit escaping to avoid XSS, even on a site with no login system
- Before installing any package, verify >1000 weekly npm downloads
- If uncertain about a security decision, STOP and ask
