import fs from 'fs';
import path from 'path';
import caller from 'caller';

function file(filePath) {
  var absolutePath = resolve(filePath, caller());
  return fs.readFileSync(absolutePath, {
    encoding: "utf-8"
  });
}
// 1. absolute path (starts with /) => use as is
// 2. relative path (starts with ./ or ../) => use path.resolve()
// 3. module path: use require.resolve()

function resolve(pathString, callerPath) {
  if (callerPath === undefined) {
    callerPath = caller();
  }

  var ref = path.parse(pathString);
  var dir = ref.dir;
  var isAbsolute = path.isAbsolute(pathString);
  var isRelative = !isAbsolute && String(dir).startsWith(".");
  var isModule = !isAbsolute && !isRelative;

  if (isAbsolute) {
    return pathString;
  } else if (isRelative) {
    var callerDir = path.dirname(callerPath);
    return path.resolve(callerDir, pathString);
  } else if (isModule) {
    return require.resolve(pathString);
  } else {
    var msg = "Can't resolve absolute path for template: " + pathString;
    throw new Error(msg);
  }
}

export default file;
export { file, resolve };
//# sourceMappingURL=index.mjs.map
