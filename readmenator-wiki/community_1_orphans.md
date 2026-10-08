# orphans

*Community 1 | 1 files | cohesion 0.00*

## Definition

This community groups 1 file(s) rooted at `root` with dominant language js (cohesion 0.00). Central symbols: `LiveView`, `ViewRenderer`, `listarAudios`, `playRecording`, `startRecording`, `stopRecording`. Core file: `app.js` (6 symbols).

## Files

| File | Language | Layer | Symbols | Doc |
|------|----------|-------|---------|-----|
| `app.js` | js | presentation | 6 | no |

## Key Symbols

- `listarAudios` (function, `app.js:9`)
- `ViewRenderer` (class, `app.js:14`)
- `LiveView` (class, `app.js:29`)
- `startRecording` (function, `app.js:159`)
- `stopRecording` (function, `app.js:172`)
- `playRecording` (function, `app.js:181`)

## Internal vs External Edges

- Internal resolved imports (EXTRACTED): 0
- Cross-boundary resolved imports (EXTRACTED): 0

## Connections

- [INFERRED] shares_context community 0 <-> 1 (strength 0.5): Inferred shared context (language js and layer presentation) with no import path between community 0 (root) and community 1 (orphans).

## Risks

- No scoped security, taint, cycle, or layer risks.

## Open Questions

- Why do 1 file(s) lack file-level docs (e.g. `app.js`)? What purpose do they serve?
- What would break if the most connected file in orphans changed?
- Should orphans be split, given cohesion 0.00?

## Sources

- `app.js`
