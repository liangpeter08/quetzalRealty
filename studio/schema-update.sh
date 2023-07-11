#!/bin/bash
cd ../strapi/v2strapi/
npm i
npm run strapi ts:generate-types --verbose #optional flag
cd ../../studio
cp -rf ../strapi/v2strapi/types/generated/ ./src/utils