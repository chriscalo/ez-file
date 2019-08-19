# @chriscalo/file
No fuss utility for fetching the contents of a file.

Works for relative paths, absolute paths, and module paths (inside `node_modules` folder);

Usage:

``` js
const { file } = require("@chriscalo/file");

const contents1 = file("./relative/path/to/file.txt");
const contents2 = file("/absolute/path/to/file.txt");
const contents3 = file("module/path/to/file.txt");
```

Installation:

``` sh
npm install @chriscalo/file
# or
yarn add @chriscalo/file
```
