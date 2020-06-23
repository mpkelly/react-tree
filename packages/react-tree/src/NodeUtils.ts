import { FlatNode, NodeId, TreeNode } from "./Node";

/**
 * Convert a `TreeNode` into a `FlatNode`.
 *
 * @param node The `TreeNode` to convert.
 * @param parentId the `id` of the parent `TreeNode` unless the node is a root node.
 */
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

/**
 * Convert a `FlatNode` into a `TreeNode`.
 *
 * @param node the `FlatNode` to convert.
 */
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
    if (node.parentId !== undefined && table[node.parentId]) {
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

/**
 * Convert a tree into a list while maintaining the tree's sort order.
 *
 * @param tree the tree as an array of `TreeNodes`.
 * @param result optional, the array to collect the results into.
 */
export const toList = (tree: TreeNode[], result: FlatNode[] = []) => {
  tree.forEach((node) => {
    result.push(toFlatNode(node, node.parentId));
    node.children.forEach((child) => {
      result.push(toFlatNode(child, child.parentId));
      toList(child.children, result);
    });
  });
  return result;
};

/**
 * Get a sub-list from a tree that has been converted into a list. The sub-list
 * start index is based on the lowest index of the nodes which are mapped from
 * the `ids` param. The end index is the highest index of the node which
 * maps from the `ids` param. All intermediate nodes even if their id is not in
 * the `ids` paramsare returned and both indices are inclusive.
 *
 *  See also `toList`.
 *
 * @param tree the tree as an array of `TreeNodes`.
 * @param ids the ids that are included.
 */
export const toSubList = (tree: TreeNode[], ids: NodeId[]) => {
  const list = toList(tree);
  let min = list.length;
  let max = 0;
  ids.forEach((nodeId) => {
    const index = list.findIndex((node) => node.id === nodeId);
    if (index >= max) {
      max = index;
    }
    if (index <= min) {
      min = index;
    }
  });
  return list.slice(min, max + 1);
};

/**
 * Get all of the nodes which are selected. Only the most compact selection is returned
 * i.e. if a node's folder is also selected then the node will not be returned.
 *
 * @param tree the tree as an array of `TreeNodes`.
 * @param ids the `NodeIds` that are selected.
 */
export const getSelectedNodeIds = (tree: TreeNode[], ids: NodeId[]) => {
  const list = toSubList(tree, ids).filter((node) => ids.includes(node.id));
  return toTreeNodes(list).map((node) => node.id);
};
