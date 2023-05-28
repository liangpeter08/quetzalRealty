#!/bin/bash
cd ../strapi/v2strapi/
npm i
npm run strapi ts:generate-types --verbose #optional flag
cd ../../studio
cp ../strapi/v2strapi/schemas.d.ts ./src/utils