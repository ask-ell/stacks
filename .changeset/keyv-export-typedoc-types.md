---
'@ask-ell/keyv': patch
---

Exported `KeyvClient` from the package entry point, since the public `KeyvAggregateRootProvider` and `KeyvAggregateRootRepository` classes extend it and it was previously undocumented.
