import fs from "fs";
import path from "path";

import caller from "caller";


export function file(filePath, options = {}) {
  const absolutePath = resolve(filePath, caller());
  return fs.readFileSync(absolutePath, {
    encoding: "utf-8",
    ...options,
  });
}

export default file;

// Three cases:
// 1. absolute path (starts with /) => use as is
// 2. relative path (starts with ./ or ../) => use path.resolve()
// 3. module path: use require.resolve()
export function resolve(pathString, callerPath) {
  if (callerPath === undefined) {
    callerPath = caller();
  }
  
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
