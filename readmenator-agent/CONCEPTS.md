# Concepts

Nouns map atomically to file sets (EXTRACTED); verbs aggregate structural edges (INFERRED).

- `view` | files=3 | mentions=5 | `Condorito.js`, `app.js`, `app_example.js`
- `live` | files=3 | mentions=4 | `Condorito.js`, `app.js`, `app_example.js`
- `app` | files=2 | mentions=5 | `app.js`, `app_example.js`

## Verb Edges

- `app` --depends_on--> `live` (strength 1.00)
- `app` --depends_on--> `view` (strength 1.00)
- `live` --depends_on--> `view` (strength 1.00)
- `view` --depends_on--> `live` (strength 1.00)

## Dialectic

- Thesis: `app` centralizes 2 files; Antithesis: `live` pulls 3 files with 2 shared (Jaccard 0.67); Synthesis: should they merge, split by layer, or keep `depends_on` explicit?
- Thesis: `app` centralizes 2 files; Antithesis: `view` pulls 3 files with 2 shared (Jaccard 0.67); Synthesis: should they merge, split by layer, or keep `depends_on` explicit?
- Thesis: `live` centralizes 3 files; Antithesis: `view` pulls 3 files with 3 shared (Jaccard 1.00); Synthesis: should they merge, split by layer, or keep `depends_on` explicit?
