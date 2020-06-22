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
    /**
     * Can this node be dragged? Defaults to false.
     */
    dragDisabled?: boolean;
    /**
     * Nodes can include any additional properties as necessary.
     */
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
/**
 * Sort the tree according to the `sortFunction` provided.
 *
 * @param tree the tree as an array of `TreeNodes`.
 * @param sortFunction the sorting function to use.
 */
export declare const sortTree: (tree: TreeNode[], sortFunction: TreeNodeSort) => void;
