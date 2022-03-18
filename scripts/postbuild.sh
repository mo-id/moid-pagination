mkdir ./react
mkdir ./types

echo 'export * from "../dist/esm/index3";' > ./react/index.js
echo 'export * from "./index.d";' > ./types/index.js

echo 'export * from "../dist/react";' > ./react/index.d.ts
echo 'export * from "../dist/types";' > ./types/index.d.ts