import { FlatNode, NodeId, TreeNode } from "./Node";
/**
 * Convert a `TreeNode` into a `FlatNode`.
 *
 * @param node The `TreeNode` to convert.
 * @param parentId the `id` of the parent `TreeNode` unless the node is a root node.
 */
export declare const toFlatNode: (node: TreeNode, parentId?: NodeId) => FlatNode;
/**
 *
 * @param nodes The `TreeNodes` to flatten into `FlatNodes`.
 * @param parentId The parentId of the subtree or undefined if the `nodes`
 * array contains root elements.
 */
export declare const toFlatNodes: (nodes: TreeNode[], parentId?: NodeId) => FlatNode[];
/**
 * Convert a `FlatNode` into a `TreeNode`.
 *
 * @param node the `FlatNode` to convert.
 */
export declare const toTreeNode: (node: FlatNode) => TreeNode;
/**
 * Convert an array of `FlatNode`s into a tree.
 *
 * @param nodes the `FlatNode`s to convert into a tree.
 */
export declare const toTreeNodes: (nodes: FlatNode[]) => TreeNode[];
/**
 * Find a `TreeNode` somewhere on a tree. The parent is also returned
 * if it is exists i.e. non-root nodes.
 *
 * @param id the ID to search for
 * @param nodes the nodes to search
 */
export declare const findTreeNodeById: (id: NodeId, nodes: TreeNode[], parent?: TreeNode | null) => {
    node?: TreeNode;
    parent?: TreeNode | null;
};
/**
 * Convert a tree into a list while maintaining the tree's sort order.
 *
 * @param tree the tree as an array of `TreeNodes`.
 * @param result optional, the array to collect the results into.
 */
export declare const toList: (tree: TreeNode[], result?: FlatNode[]) => FlatNode[];
/**
 * Get a sub-list from a tree that has been converted into a list. The sub-list
 * start index is based on the lowest index of the nodes which mapped to the `ids`
 * param. The end index is the highest index of the node which maps to the `ids`
 * param. Both indices are inclusive.
 *
 *  See also `toList`.
 *
 * @param tree the tree as an array of `TreeNodes`.
 * @param ids the ids that are included.
 */
export declare const toSubList: (tree: TreeNode[], ids: NodeId[]) => FlatNode[];
/**
 * Get all of the nodes which are selected. Only the most compact selection is returned
 * i.e. if a node's folder is also selected then the node will not be returned.
 *
 * @param tree the tree as an array of `TreeNodes`.
 * @param ids the `NodeIds` that are selected.
 */
export declare const getSelectedNodeIds: (tree: TreeNode[], ids: NodeId[]) => NodeId[];
