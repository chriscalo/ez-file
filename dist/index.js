function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var caller = _interopDefault(require('caller'));

function file(filePath, options) {
  if ( options === void 0 ) options = {};

  var absolutePath = resolve(filePath, caller());
  return fs.readFileSync(absolutePath, Object.assign({}, {encoding: "utf-8"},
    options));
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

exports.file = file;
exports.default = file;
exports.resolve = resolve;
//# sourceMappingURL=index.js.map
