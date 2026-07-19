#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Error: First parameter is missing and must be the package id." >&2
    exit 1
fi

nx build $1 && \

node scripts/update-dependencies-versions.js $1
