#!/usr/bin/env bash

nx build $1

pushd dist/packages/$1

npm publish --access public

popd