import { Selector } from "testcafe";

fixture`Tree`.page`../test/index.html`;

const Folder1Items = '[data-rt-element-wrapper="0"] [data-rt-element]';
const Folder2Items = '[data-rt-element-wrapper="3"] [data-rt-element]';

const Folder1 = '[data-rt-element-wrapper="0"]';
const File1 = '[data-rt-element-wrapper="1"]';
const Folder2 = '[data-rt-element-wrapper="3"]';

test("Drop a file into a folder", async (t) => {
  await t.expect(Selector(Folder1Items).count).eql(4);
  await t.expect(Selector(Folder2Items).count).eql(1);

  await t.dragToElement(File1, Folder2);

  await t.expect(Selector(Folder1Items).count).eql(4);
  await t.expect(Selector(Folder2Items).count).eql(2);

  await t.dragToElement(File1, Selector(Folder1Items).find(":first-child"));

  await t.expect(Selector(Folder1Items).count).eql(4);
  await t.expect(Selector(Folder2Items).count).eql(1);
});

test("Collapse and expand", async (t) => {
  await t.expect(Selector(Folder1Items).count).eql(4);
  await t
    .expect(Selector(Folder1).withAttribute("data-rt-collapsed", "false"))
    .ok();

  await t.click(Selector(Folder1).find("[data-rt-collapse-toggle]"));

  await t.expect(Selector(Folder1Items).count).eql(1);
  await t
    .expect(Selector(Folder1).withAttribute("data-rt-collapsed", "true"))
    .ok();

  await t.click(Selector(Folder1).find("[data-rt-collapse-toggle]"));

  await t.expect(Selector(Folder1Items).count).eql(4);
});
