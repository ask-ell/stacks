# AGENTS.md

## Validating a pull request

Before opening or updating a pull request against `develop` or `release`, run the same check CI runs (`.github/workflows/check-pull-request.yml`):

```bash
scripts/check-pull-request-validity.sh
```

This runs, in order, and stops at the first failure:

1. `npx nx run-many -t test` — unit tests for every project in the workspace
2. `npx nx run-many -t lint` — ESLint for every project
3. `npx nx run-many -t build` — TypeScript build for every project
4. `node scripts/update-dependencies-versions.js` — rewrites each workspace package's `dependencies` (currently `"*"`) to the resolved versions from the root `package.json`, using the Nx project graph

Run it from the repository root, after `npm install`, on a clean or committed working tree — step 4 writes to `packages/*/package.json` and `examples/*/package.json`, so review/revert those changes if you were only checking validity and don't intend to commit version bumps.

`npm audit --audit-level=high` is temporarily disabled in the script (see [STACKS-31](https://ask-ell.atlassian.net/browse/STACKS-31)); use the `fix-vulnerabilities` skill if you need to address `npm audit` findings instead of running `npm audit fix --force` directly.

## Running steps individually

- Single project: `npx nx test <project>`, `npx nx lint <project>`, `npx nx build <project>` (project names match the `packages/*` and `examples/*` directory names, e.g. `core`, `nest`, `back-end`, `blog`).
- Affected only: `npx nx affected -t test lint build`.
