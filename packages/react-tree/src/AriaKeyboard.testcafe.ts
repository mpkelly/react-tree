import { Selector } from "testcafe";

fixture`ARIA Keyboard`.page`../test/index.html`.afterEach(async (t) => {
  await t.expect(Selector("li[tabindex='0']").count).eql(1);
});

const Folder1 = '[data-id="0"]';
const File1 = '[data-id="1"]';
const File2 = '[data-id="2"]';
const Folder2 = '[data-id="3"]';
const Folder3 = '[data-id="4"]';

const checkFocus = async (t: TestController, selector: string) => {
  await t
    .expect(
      Selector(selector)
        .parent()
        .parent()
        .withAttribute("tabindex", "0")
        .withAttribute("aria-expanded", "true")
    )
    .ok();
};

const focusFirstNode = async (t: TestController) => {
  await t.click(Selector(Folder1));
  await checkFocus(t, Folder1);
};

const focusLastNode = async (t: TestController) => {
  await t.click(Selector(Folder2));
  await checkFocus(t, Folder2);
};

test("Space key", async (t) => {
  await focusFirstNode(t);
  await t.pressKey("space");
  await t
    .expect(
      Selector(Folder1)
        .parent()
        .parent()
        .withAttribute("aria-expanded", "false")
    )
    .ok();

  await t.pressKey("space");

  await t
    .expect(
      Selector(Folder1).parent().parent().withAttribute("aria-expanded", "true")
    )
    .ok();
});

test("Down arrow", async (t) => {
  await focusFirstNode(t);
  await t.pressKey("down");
  await checkFocus(t, File1);
  await t.pressKey("down");
  await checkFocus(t, File2);
  await t.pressKey("down");
  await checkFocus(t, Folder2);
  //Should be ignored as at end of tree
  await t.pressKey("down");
  await checkFocus(t, Folder2);

  // Go to top and collapse folder
  await focusFirstNode(t);
  await t.pressKey("space");
  await t.pressKey("down");
  // Make sure focus remains on first node
  await checkFocus(t, Folder1);
});

test("Up arrow", async (t) => {
  await focusLastNode(t);
  await t.pressKey("up");
  await checkFocus(t, File2);
  await t.pressKey("up");
  await checkFocus(t, File1);
  await t.pressKey("up");
  await checkFocus(t, Folder1);
  //Should be ignored as at end of tree
  await t.pressKey("up");
  await checkFocus(t, Folder1);

  // Go to top and collapse folder
  await focusFirstNode(t);
  await t.pressKey("space");
  await t.pressKey("up");
  // Make sure focus remains on first node
  await checkFocus(t, Folder1);
});

test("Right arrow", async (t) => {
  await focusFirstNode(t);
  await t.pressKey("right");
  await checkFocus(t, File1);
  await t.pressKey("right");
  await checkFocus(t, File2);
  await t.pressKey("right");
  await checkFocus(t, Folder2);
  //Should be ignored as at end of tree
  await t.pressKey("right");
  await checkFocus(t, Folder2);

  // Go to top and collapse folder
  await focusFirstNode(t);
  await t.pressKey("space");
  //Should act as expand
  await t.pressKey("right");
  await t
    .expect(
      Selector(Folder1).parent().parent().withAttribute("aria-expanded", "true")
    )
    .ok();
  //move to first child
  await t.pressKey("right");
  await checkFocus(t, File1);
});

test("Left arrow", async (t) => {
  await focusLastNode(t);
  await t.pressKey("up");
  await checkFocus(t, File2);
  await t.pressKey("up");
  await checkFocus(t, File1);
  await t.pressKey("up");
  await checkFocus(t, Folder1);
  //Should collapse folder
  await t.pressKey("up");
  await t
    .expect(
      Selector(Folder1)
        .parent()
        .parent()
        .withAttribute("aria-expanded", "false")
    )
    .ok();
});

test("Home", async (t) => {
  await focusLastNode(t);
  await t.pressKey("home");
  await checkFocus(t, Folder1);
});

test("End", async (t) => {
  await focusFirstNode(t);
  await t.pressKey("end");
  await checkFocus(t, Folder2);
});

test("Search by first char", async (t) => {
  await focusFirstNode(t);
  await t.typeText(Folder1, "f");
  await checkFocus(t, File1);
  await t.typeText(Folder1, "F");
  await checkFocus(t, File2);
  await t.typeText(Folder1, "f");
  await checkFocus(t, Folder2);
  //should wrap
  await t.typeText(Folder1, "f");
  await checkFocus(t, Folder1);
});

test("Asterisk", async (t) => {
  await focusLastNode(t);
  await t.pressKey("meta+c");
  await focusFirstNode(t);
  await t.pressKey("meta+v");
  // Collapse both folders
  await t.pressKey("down down down space down space");

  await t
    .expect(
      Selector(Folder2)
        .parent()
        .parent()
        .withAttribute("aria-expanded", "false")
    )
    .ok();
  await t
    .expect(
      Selector(Folder3)
        .parent()
        .parent()
        .withAttribute("aria-expanded", "false")
    )
    .ok();

  //Expand all folders on current level
  await t.typeText(File1, "*");
  await t
    .expect(
      Selector(Folder2).parent().parent().withAttribute("aria-expanded", "true")
    )
    .ok();
  await t
    .expect(
      Selector(Folder3).parent().parent().withAttribute("aria-expanded", "true")
    )
    .ok();
});

test("ARIA attributes", async (t) => {
  await focusFirstNode(t);
  const tree = "ul[role=tree]";

  await t.expect(Selector(tree).exists).ok();

  const levelOneItems =
    "li[role='treeitem'][aria-level='1'][aria-setsize='1'][aria-posinset='1'][aria-expanded='true'][tabindex='0']";

  await t.expect(Selector(levelOneItems).exists).ok();

  await t.expect(Selector("[role=group]").childNodeCount).eql(3);

  const item1 =
    "li[role='treeitem'][aria-level='2'][aria-setsize='3'][aria-posinset='1'][tabindex='-1']";
  const item2 =
    "li[role='treeitem'][aria-level='2'][aria-setsize='3'][aria-posinset='2'][tabindex='-1']";
  const item3 =
    "li[role='treeitem'][aria-level='2'][aria-setsize='3'][aria-posinset='3'][tabindex='-1']";

  await t.expect(Selector(item1).exists).ok();
  await t.expect(Selector(item2).exists).ok();
  await t.expect(Selector(item3).exists).ok();
});
