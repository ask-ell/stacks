#!/usr/bin/env bash

nx build $1 && \

node scripts/update-dependencies-versions.js
