---
'@ask-ell/back-end': patch
---

Exported `CreateKeyvStoreAdapterOptions`, `ErrorInterceptorProps`, `NestApplicationFactoryParams`, and the `update-dependencies-versions` script types so they resolve correctly in generated documentation. Also wired up the `http`, `add-ons`, `filters`, `interceptors`, and `modules` barrels that were left disconnected from the package entry point after the last refactor, so the public API is fully reachable and documented from `index.ts`.
