# root

*Community 0 | 2 files | cohesion 1.00*

## Definition

This community groups 2 file(s) rooted at `root` with dominant language js (cohesion 1.00). Central symbols: `AutomaticCodeReloading`, `Channels`, `Condorito`, `CustomLiveView`, `ElixirLikeSyntax`, `LiveView`, `LiveViewManager`, `Presence`. Core file: `Condorito.js` (9 symbols).

## Files

| File | Language | Layer | Symbols | Doc |
|------|----------|-------|---------|-----|
| `Condorito.js` | js | presentation | 9 | yes |
| `app_example.js` | js | presentation | 1 | yes |

## Key Symbols

- `Condorito` (class, `Condorito.js:7`)
- `Channels` (class, `Condorito.js:24`)
- `Presence` (class, `Condorito.js:54`)
- `PubSub` (class, `Condorito.js:80`)
- `ElixirLikeSyntax` (class, `Condorito.js:110`)
- `Resource` (class, `Condorito.js:149`)
- `AutomaticCodeReloading` (class, `Condorito.js:184`)
- `LiveView` (class, `Condorito.js:207`)
- `LiveViewManager` (class, `Condorito.js:230`)
- `CustomLiveView` (class, `app_example.js:24`)

## Internal vs External Edges

- Internal resolved imports (EXTRACTED): 1
- Cross-boundary resolved imports (EXTRACTED): 0

## Connections

- [INFERRED] shares_context community 0 <-> 1 (strength 0.5): Inferred shared context (language js and layer presentation) with no import path between community 0 (root) and community 1 (orphans).

## Risks

- No scoped security, taint, cycle, or layer risks.

## Open Questions

- What would break if the most connected file in root changed?
- Should root be split, given cohesion 1.00?

## Sources

- `Condorito.js`
- `app_example.js`
