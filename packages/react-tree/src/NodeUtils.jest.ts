import { TreeNode, FlatNode } from "./Node";
import {
  findTreeNodeById,
  toFlatNodes,
  toTreeNodes,
  toSubList,
  getSelectedNodeIds,
} from "./NodeUtils";

const tree: TreeNode[] = [
  {
    id: 1,
    type: "",
    parentId: undefined,
    children: [
      {
        id: 2,
        type: "",
        parentId: 1,
        children: [
          {
            id: 3,
            type: "",
            parentId: 2,
            children: [],
          },
          {
            id: 5,
            type: "",
            parentId: 2,
            children: [],
          },
        ],
      },
      {
        id: 4,
        type: "",
        parentId: 1,
        children: [],
      },
    ],
  },
];

const flat: FlatNode[] = [
  { id: 1, type: "", parentId: undefined },
  { id: 2, type: "", parentId: 1 },
  { id: 3, type: "", parentId: 2 },
  { id: 5, type: "", parentId: 2 },
  { id: 4, type: "", parentId: 1 },
];

const list: FlatNode[] = [
  { id: 1, type: "", parentId: undefined },
  { id: 2, type: "", parentId: 1 },
  { id: 3, type: "", parentId: 2 },
  { id: 5, type: "", parentId: 2 },
  { id: 4, type: "", parentId: 1 },
];

describe("NodeUtils", function () {
  test("toFlatNodes", async () => {
    expect(toFlatNodes(tree)).toEqual(flat);
  });

  test("toTreeNodes", async () => {
    expect(toTreeNodes(flat)).toEqual(tree);
  });

  test("findTreeNodeById - folder", async () => {
    let result = findTreeNodeById(4, tree);
    expect(result?.node?.id).toEqual(4);
    expect(result?.parent?.id).toEqual(1);

    result = findTreeNodeById(10, tree);
    expect(result).toEqual(null);

    result = findTreeNodeById(1, tree);
    expect(result?.node?.id).toEqual(1);
    expect(result?.parent).toEqual(null);
  });

  test("findTreeNodeById - nested file", async () => {
    let result = findTreeNodeById(5, tree);
    expect(result?.node?.id).toEqual(5);
    expect(result?.parent?.id).toEqual(2);
  });

  test("findTreeNodeById - not present", async () => {
    const result = findTreeNodeById(10, tree);
    expect(result).toEqual(null);
  });

  test("findTreeNodeById - root", async () => {
    let result = findTreeNodeById(1, tree);
    expect(result?.node?.id).toEqual(1);
    expect(result?.parent?.id).toEqual(undefined);
  });

  test("toList", async () => {
    expect(toFlatNodes(tree)).toEqual(list);
  });

  test("toSubList", async () => {
    const sub = list.slice(1, 4);
    expect(toSubList(tree, [2, 5])).toEqual(sub);
  });

  test("getSelectedNodeIds - leaf node", async () => {
    expect(getSelectedNodeIds(tree, [5])).toEqual([5]);
  });

  test("getSelectedNodeIds - multiple roots", async () => {
    expect(getSelectedNodeIds(tree, [2, 3, 4, 5])).toEqual([2, 4]);
  });
});
