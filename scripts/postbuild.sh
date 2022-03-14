# --- 1. rename dist  into __dist to signal that it is not intended for imports
rm -rf ./__dist

mv ./dist ./__dist

mkdir ./react

# 'dist/esm/index2' is a chunk created for 'src/react/index.ts'
echo 'module.exports = require("./pagination.cjs.production.min.js");' > ./react/index.js

echo 'export * from "../__dist/react";' > ./react/index.d.ts