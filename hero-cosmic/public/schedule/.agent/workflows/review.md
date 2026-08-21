# /review — Code Review

1. Run `git diff main` to identify changed files
2. For each changed file check:
   - [ ] No hardcoded secrets
   - [ ] No `console.log` left in from debugging
   - [ ] Errors fail loudly (per AGENTS.md) rather than being swallowed
   - [ ] Motion timing/easing values pulled from css/tokens.css or a data constant, not hardcoded inline
   - [ ] `prefers-reduced-motion` fallback still works after this change
3. Check: were any files changed that are outside the stated task's [LAYER]?
4. Output summary table: File | Change Type | Issues Found
5. If critical issues found: list them, ask if I want them fixed
