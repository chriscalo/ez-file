import test from "ava";

import { file, resolve } from "../";

test("reads files", ({ is, truthy }) => {
  const markdownFile = file("./test.md");
  is(typeof markdownFile, "string");
  truthy(markdownFile.length > 0);
});
