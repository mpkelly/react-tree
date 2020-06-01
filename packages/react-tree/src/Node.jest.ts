import {
  Node,
  TreeNode,
  toFlatNodes,
  FlatNode,
  toTreeNodes,
  findTreeNodeById,
} from "./Node";

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
  { id: 4, type: "", parentId: 1 },
];

describe("Nodes", function () {
  test("toFlatNodes", () => {
    expect(toFlatNodes(tree)).toEqual(flat);
  });

  test("toTreeNodes", () => {
    expect(toTreeNodes(flat)).toEqual(tree);
  });

  test("findTreeNodeById", () => {
    let result = findTreeNodeById(4, tree);
    expect(result?.node?.id).toEqual(4);
    expect(result?.parent?.id).toEqual(1);

    result = findTreeNodeById(10, tree);
    expect(result).toEqual(null);

    result = findTreeNodeById(1, tree);
    expect(result?.node?.id).toEqual(1);
    expect(result?.parent).toEqual(null);
  });
});
