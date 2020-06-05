/**
 * Can be a string or number only
 */
export type NodeId = string | number;

/**
 * Can be a string, number or enum
 */
export type NodeType = string | number;

/**
 * A simple Node type that supports any additional props required by your app.
 */
export interface Node {
  id: NodeId;

  /**
   * Typically you'll want to define an enum with types and use that here. You
   * could then create a `Schema` to setup constraints. If your nodes are all the same
   * then you could just assign any string or number here.
   */
  type: NodeType;

  /**
   * Only required for container types like folders
   */
  expanded?: boolean;

  /**
   * Can this node be dragged? Defaults to false.
   */
  dragDisabled?: boolean;

  [key: string]: any;
}

/**
 * Flat nodes are nodes stored in a flat array. They keep a reference
 * to their `parentId` so they can be converted into `TreeNodes` which
 * are used by the `<Tree/>` when rendering. A node with no `parentId`
 * becomes a root node on the <Tree/>.
 */
export interface FlatNode extends Node {
  parentId?: NodeId;
}

/**
 * Used by <Tree/> internally. It's really just a `FlatNode` with a children[]
 * property for constructing the tree structure.
 */
export interface TreeNode extends FlatNode {
  children: TreeNode[];
}

export type TreeNodeSort = (a: TreeNode, b: TreeNode) => number;

/**
 * Creates a simple sorting function that performs an alpha-numeric sort
 * using `String.localeCompare`.
 *
 * @param property the property on the node you wish to use for sorting.
 * This property is typically called `name` or `title` etc.
 */
export const createAlphaNumericSort = (
  property: keyof TreeNode
): TreeNodeSort => {
  return (a: TreeNode, b: TreeNode) => {
    return String(a[property]).localeCompare(String(b[property]));
  };
};

export const sortTree = (tree: TreeNode[], sortFunction: TreeNodeSort) => {
  tree.sort(sortFunction);
  tree.forEach((node) => {
    sortTree(node.children, sortFunction);
  });
};

export const toFlatNode = (node: TreeNode, parentId?: NodeId): FlatNode => {
  const { children, ...rest } = node;
  return { ...rest, parentId };
};

/**
 *
 * @param nodes The `TreeNodes` to flatten into `FlatNodes`.
 * @param parentId The parentId of the subtree or undefined if the `nodes`
 * array contains root elements.
 */
export const toFlatNodes = (
  nodes: TreeNode[],
  parentId?: NodeId
): FlatNode[] => {
  let items: FlatNode[] = [];
  nodes.forEach((node) => {
    items.push(toFlatNode(node, parentId));
    items = items.concat(toFlatNodes(node.children, node.id));
  });
  return items;
};

export const toTreeNode = (node: FlatNode): TreeNode => {
  return { ...node, children: [] };
};

/**
 * Convert an array of `FlatNode`s into a tree.
 *
 * @param nodes the `FlatNode`s to convert into a tree.
 */
export const toTreeNodes = (nodes: FlatNode[]): TreeNode[] => {
  const table = Object.create(null);
  nodes.forEach((node) => (table[node.id] = toTreeNode(node)));
  const tree: TreeNode[] = [];
  nodes.forEach((node) => {
    if (node.parentId !== undefined) {
      table[node.parentId].children.push(table[node.id]);
    } else {
      tree.push(table[node.id]);
    }
  });
  return tree;
};

/**
 * Find a `TreeNode` somewhere on a tree. The parent is also returned
 * if it is exists i.e. non-root nodes.
 *
 * @param id the ID to search for
 * @param nodes the nodes to search
 */
export const findTreeNodeById = (
  id: NodeId,
  nodes: TreeNode[],
  parent: TreeNode | null = null
): { node?: TreeNode; parent?: TreeNode | null } | null => {
  for (let node of nodes) {
    if (node.id === id) {
      return { node, parent };
    } else {
      const result = findTreeNodeById(id, node.children, node);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
