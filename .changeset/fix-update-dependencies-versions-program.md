---
'@ask-ell/back-end': patch
---

`UpdateDependenciesVersionsProgram` now runs all its logic inside `execute` instead of at module load or construction, writes each package file to `dist/packages/<id>/package.json` instead of overwriting the root `package.json`, and no longer loses `this` when filtering blacklisted packages.
