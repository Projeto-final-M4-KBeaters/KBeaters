#!/usr/bin/env bash
# exit on error
set -o errexit

yarn add node-gyp
yarn build
yarn typeorm migration:run -d dist/src/data-source