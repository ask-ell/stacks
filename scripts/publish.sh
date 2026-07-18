#!/usr/bin/env bash

scripts/build.sh $1 && \

pushd dist/packages/$1 && \

npm publish --access public && \

popd
