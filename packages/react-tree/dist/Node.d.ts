/**
 * Can be a string or number only
 */
export declare type NodeId = string | number;
/**
 * Can be a string, number or enum
 */
export declare type NodeType = string | number;
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
export declare type TreeNodeSort = (a: TreeNode, b: TreeNode) => number;
/**
 * Creates a simple sorting function that performs an alpha-numeric sort
 * using `String.localeCompare`.
 *
 * @param property the property on the node you wish to use for sorting.
 * This property is typically called `name` or `title` etc.
 */
export declare const createAlphaNumericSort: (property: keyof TreeNode) => TreeNodeSort;
export declare const sortTree: (tree: TreeNode[], sortFunction: TreeNodeSort) => void;
export declare const toFlatNode: (node: TreeNode, parentId?: NodeId) => FlatNode;
/**
 *
 * @param nodes The `TreeNodes` to flatten into `FlatNodes`.
 * @param parentId The parentId of the subtree or undefined if the `nodes`
 * array contains root elements.
 */
export declare const toFlatNodes: (nodes: TreeNode[], parentId?: NodeId) => FlatNode[];
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
