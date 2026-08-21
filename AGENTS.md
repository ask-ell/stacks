# AGENTS.md

## Important modifications check

After each important codebase change, run the following check-up :

```bash
scripts/check-pull-request-validity.sh
```

## Running steps individually

- Single project: `npx nx test <project>`, `npx nx lint <project>`, `npx nx build <project>` (project names match the `packages/*` and `examples/*` directory names, e.g. `core`, `nest`, `back-end`, `blog`).
- Affected only: `npx nx affected -t test lint build`.

## Releasing (changesets)

- Any PR into `develop` that changes a publishable package under `packages/*` must include a changeset: run `npx changeset` and follow the prompts. CI (`check-changeset` job) fails PRs into `develop` that touch a package without one.
- `examples/blog` is not published and is excluded from changesets (`.changeset/config.json` `ignore` list) and from `nx-release-publish` (see `examples/blog/project.json`).
- Merging changesets into `develop` triggers the `Version` workflow, which opens/updates a "chore: version packages" PR bumping `package.json` versions and `CHANGELOG.md` files. Merging that PR is what actually bumps versions on `develop`.
- Promoting `develop` to `release` (as today) triggers `publish.yml`, which builds, resolves internal `@ask-ell/*` dependency versions (`scripts/update-dependencies-versions.js`), publishes each package from `dist/packages/*` via `nx-release-publish`, and tags the release commit with `npx changeset tag`.
