#!/usr/bin/env bash

npm install --no-save webpack-cli;

npx --yes webpack build --config "$MODULE_BUNDLE_SETTING_FILE_PATH";
