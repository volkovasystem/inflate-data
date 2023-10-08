#!/usr/bin/env bash

npx --yes @volkovasystem/format-package-json-file;

npm run reset &&	\
npm install &&		\
npm run build &&	\
npm test &&			\
npm run clean;
