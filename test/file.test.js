import test from "ava";
import { expect } from "chai";

import { file, resolve } from "../";

test("reads files", t => {
  const markdownFile = file("./test.md");
  expect(markdownFile).to.be.a("string");
  expect(markdownFile.length > 0).to.be.true;
});
