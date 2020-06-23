import { FlatNode } from "./Node";
import { isMoveValid } from "./TreeUtils";
import { Schema } from "./Schema";

const nodes: FlatNode[] = [
  { id: 1, type: "", parentId: undefined },
  { id: 2, type: "", parentId: 1 },
  { id: 3, type: "", parentId: 2 },
  { id: 5, type: "", parentId: 2 },
  { id: 4, type: "", parentId: 1 },
];

describe("TreeUtils", function () {
  test("isMoveValid - undefined", async () => {
    expect(isMoveValid(nodes, [2], undefined, undefined)).toBe(false);
  });

  test("isMoveValid - self", async () => {
    expect(isMoveValid(nodes, [2], 2, undefined)).toBe(false);
  });

  test("isMoveValid - same parent", async () => {
    expect(isMoveValid(nodes, [2], 1, undefined)).toBe(false);
  });

  test("isMoveValid - drop on child", async () => {
    expect(isMoveValid(nodes, [2], 3, undefined)).toBe(false);
  });

  test("isMoveValid - use schema", async () => {
    const isDropAllowed = jest.fn(() => true);
    const schema: Schema = {
      rules: {},
      isDropAllowed,
    };
    isMoveValid(nodes, [2], 4, schema);
    expect(isDropAllowed).toBeCalled();
  });

  test("isMoveValid - valid", async () => {
    expect(isMoveValid(nodes, [2, 3, 5], 4, undefined)).toBe(true);
  });
});
