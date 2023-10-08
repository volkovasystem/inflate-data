#!/usr/bin/env bash

[[ ! -d "$MODULE_ROOT_DIRECTORY_PATH/.build" ]] &&	\
mkdir -p "$MODULE_ROOT_DIRECTORY_PATH/.build";

npm run bundle &&	\
npm run compress &&	\
npm run resolve;
