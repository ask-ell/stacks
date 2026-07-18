#!/usr/bin/env bash

nx build $1 && \

node scripts/update-internal-dependencies-versions.js && \

pushd dist/packages/$1 && \

npm publish --access public && \

popd
