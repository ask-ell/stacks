#!/usr/bin/env bash

nx run-many -t build

node scripts/update-internal-dependencies-versions.js
