rm -rf ./__dist

mv ./dist ./__dist

mkdir ./react
mkdir ./types

echo 'export * from "../__dist/esm/index3";' > ./react/index.js

echo 'export * from "../__dist/react";' > ./react/index.d.ts
echo 'export * from "../__dist/types";' > ./types/index.d.ts