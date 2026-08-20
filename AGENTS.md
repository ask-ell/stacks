# AGENTS.md

## Important modifications check

After each important codebase change, run the following check-up :

```bash
scripts/check-pull-request-validity.sh
```

## Running steps individually

- Single project: `npx nx test <project>`, `npx nx lint <project>`, `npx nx build <project>` (project names match the `packages/*` and `examples/*` directory names, e.g. `core`, `nest`, `back-end`, `blog`).
- Affected only: `npx nx affected -t test lint build`.
