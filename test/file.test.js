import test from "ava";
import { file, resolve } from "../";

test("reads files", t => {
  const markdownFile = file("./test.md");
  t.true(markdownFile.length > 0);
});
