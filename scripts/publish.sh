#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Error: First parameter is missing and must be the package id." >&2
    exit 1
fi

scripts/build.sh $1 && \

pushd dist/packages/$1 && \

npm publish --access public && \

popd
