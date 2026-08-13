#!/usr/bin/env bash

npm audit --audit-level=high && \

npx nx run-many -t test && \

npx nx run-many -t lint && \

npx nx run-many -t build && \

node scripts/update-dependencies-versions.js
