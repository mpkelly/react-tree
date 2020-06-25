import { Selector } from "testcafe";

fixture`Tree`.page`../test/index.html`;

const Folder1Items = '[data-rt-element-wrapper="0"] [data-rt-element]';
const Folder2Items = '[data-rt-element-wrapper="3"] [data-rt-element]';

const Folder1 = '[data-rt-element="0"]';
const File1 = '[data-rt-element="1"]';
const File2 = '[data-rt-element="2"]';
const Folder2 = '[data-rt-element="3"]';

test("Drop a file into a folder", async (t) => {
  await t.dragToElement(File1, Folder2);

  await t.expect(Selector(Folder1Items).count).eql(4);
  await t.expect(Selector(Folder2Items).count).eql(2);

  await t.dragToElement(File1, Selector(Folder1Items).find(":first-child"));

  await t.expect(Selector(Folder1Items).count).eql(4);
  await t.expect(Selector(Folder2Items).count).eql(1);
});

test("Drop selection into folder", async (t) => {
  await t.click(Selector(File1));
  await t.click(Selector(File2), {
    modifiers: {
      meta: true
    }
  });

  await t.expect(Selector("[data-rt-selected]").count).eql(2);
  await t.dragToElement(File1, Folder2);

  await t.expect(Selector(Folder1Items).count).eql(4);
  await t.expect(Selector(Folder2Items).count).eql(3);
});

test("Collapse & expand", async (t) => {
  //Clicking toggle button
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

  //Using space key
  await t.click(Selector(Folder1Items)).pressKey("space");
  await t.expect(Selector(Folder1Items).count).eql(1);
  await t.click(Selector(Folder1Items)).pressKey("space");
  await t.expect(Selector(Folder1Items).count).eql(4);
});

test("Cut & paste", async (t) => {
  await t.click(Selector(File1));
  await t
    .click(Selector(File2), {
      modifiers: {
        meta: true
      }
    })
    .pressKey("meta+x down");

  await t.expect(Selector("[data-rt-cut]").count).eql(2);

  await t.pressKey("meta+v");

  await t.expect(Selector("[data-rt-cut]").count).eql(0);

  await t.expect(Selector(Folder1Items).count).eql(4);
  await t.expect(Selector(Folder2Items).count).eql(3);
});

test("Cut & cancel", async (t) => {
  await t.click(Selector(File1));
  await t
    .click(Selector(File2), {
      modifiers: {
        meta: true
      }
    })
    .pressKey("meta+x down");

  await t.expect(Selector("[data-rt-cut]").count).eql(2);

  await t.pressKey("esc");

  await t.expect(Selector("[data-rt-cut]").count).eql(0);
});

test("Copy & paste", async (t) => {
  await t.click(Selector(File1));
  await t
    .click(Selector(File2), {
      modifiers: {
        meta: true
      }
    })
    .pressKey("meta+c down");

  await t.expect(Selector("[data-rt-copied]").count).eql(2);

  await t.pressKey("meta+v");

  await t.expect(Selector("[data-rt-copied]").count).eql(0);

  await t.expect(Selector(Folder1Items).count).eql(6);
  await t.expect(Selector(Folder2Items).count).eql(3);

  await t.click(Selector(Folder2)).pressKey("meta+c");

  await t.click(Selector(Folder1)).pressKey("meta+v");

  await t.expect(Selector(Folder1Items).count).eql(9);
  await t.expect(Selector(Folder2Items).count).eql(3);
});

test("Copy & cancel", async (t) => {
  await t.click(Selector(File1));
  await t
    .click(Selector(File2), {
      modifiers: {
        meta: true
      }
    })
    .pressKey("meta+c down");

  await t.expect(Selector("[data-rt-copied]").count).eql(2);

  await t.pressKey("esc");

  await t.expect(Selector("[data-rt-copied]").count).eql(0);
});

const checkSelection = async (t: TestController, count: number) => {
  await t.expect(Selector("[data-rt-selected]").count).eql(count);
  await t.expect(Selector("#selected").textContent).contains(String(count));
};

test("Selecting & deselecting", async (t) => {
  // From top to bottom expand the selection with the cursor
  await t.click(Selector(Folder1)).pressKey("shift+down shift+down shift+down");

  await checkSelection(t, 4);

  // From bottom to top decrease the selection with the cursor
  await t.pressKey("shift+up shift+up shift+up");

  await t.click(Selector(Folder1)).pressKey("shift+down shift+down shift+down");

  await checkSelection(t, 4);

  // Deselect a single item while keeping others selected
  await t.click(Selector(File2), {
    modifiers: {
      meta: true
    }
  });

  await checkSelection(t, 3);

  await t.click(Selector(File2));

  await checkSelection(t, 1);

  await t.pressKey("shift+down");

  await checkSelection(t, 2);

  // No modifier key so should reset previous selection
  await t.pressKey("up");

  await checkSelection(t, 1);
});
