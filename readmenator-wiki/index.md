# Second Brain

*Last synthesized: 2026-10-07 | 3 files | 2 concept pages | offline, zero tokens*

> Raw sources -> readmenator wiki -> links (Karpathy LLM Wiki Pattern, deterministic).
> Start here, then open one community page. Prefer grep over full reads.

## Vault Overview

The codebase centres on `Condorito.js`, `app_example.js`, `app.js`. Architecturally it is 1 layers, dominant presentation (3 files) across 2 import-based communities. Recorded risk surface: 0 security findings and 0 dependency cycles.

Surprising tissue lives between root, orphans: 0 extracted cross-community imports and 1 inferred bridges. Follow `connections.json` sorted by strength before refactoring.

Open work clusters around documentation (67% file coverage), 0 security findings, 0 taint paths, and 5 suggested exploration questions in `queries.md`.

## Stats

| Metric | Value |
|--------|-------|
| Files | 3 |
| Symbols | 16 |
| Resolved imports | 1 |
| Languages | js |
| Communities | 2 |
| Doc coverage | 67% (2/3 files) |
| Security findings | 0 |
| Estimated read cost | ~589 tokens (chars/4, offline so $0) |

## Reading Order

1. Skim Stats and God Nodes below for blast radius.
2. Open the largest community page first, then follow Connections.
3. Use `queries.md` for the next question; log the answer there.

```
grep -rn '<keyword>' index.md community_*.md
readmenator query "<question>" --target readmenator_Condorito-Framework_etzstld7
```

## Concept Wiki

- [root (2 files, cohesion 1.00)](./community_0_root.md)
- [orphans (1 files, cohesion 0.00)](./community_1_orphans.md)

## God Nodes

| File | Score |
|------|-------|
| `Condorito.js` | 2.9 |
| `app_example.js` | 2.1 |
| `app.js` | 0.6 |

## Strongest Connections

- 0 -> 1: shares_context (strength 0.5, INFERRED)

## Navigation Tips

- Obsidian Graph View works: every community page links back here.
- `connections.json` is machine-readable for GraphRAG pipelines.
- `REPORT.md` states what was extracted vs inferred and current limits.
- Regenerate offline: `readmenator . --rebuild` (no network, no tokens).
