import fs from "fs";
import path from "path";

import caller from "caller";


// FIXME: include all three cases:
// 1. absolute path (starts with /) => use as is
// 2. relative path (starts with ./ or ../) => use path.resolve()
// 3. module path: use require.resolve()
export function file(filePath) {
  if (path.isAbsolute(filePath)) {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } else {
    const dirname = path.dirname(caller());
    const absolutePath = path.join(dirname, filePath);
    return fs.readFileSync(absolutePath, { encoding: "utf-8" });
  }
}

export default file;

// Three cases:
// 1. absolute path (starts with /) => use as is
// 2. relative path (starts with ./ or ../) => use path.resolve()
// 3. module path: use require.resolve()
function getAbsolutePath(pathString, callerPath) {
  const { dir } = path.parse(pathString);
  const isAbsolute = path.isAbsolute(pathString);
  const isRelative = !isAbsolute && String(dir).startsWith(".");
  const isModule = !isAbsolute && !isRelative;
  
  if (isAbsolute) {
    return pathString;
  } else if (isRelative) {
    const callerDir = path.dirname(callerPath);
    return path.resolve(callerDir, pathString);
  } else if (isModule) {
    return require.resolve(pathString);
  } else {
    const msg = `Can't resolve absolute path for template: ${pathString}`;
    throw new Error(msg);
  }
}
