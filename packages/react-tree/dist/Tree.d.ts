import React from "react";
import { TreeNode, FlatNode, NodeId, Node, TreeNodeSort } from "./Node";
import { Schema } from "./Schema";
export interface TreeProps {
    /**
     * The nodes to create a Tree from. This property is not converted into
     * a state variable so the <Tree/> should always reflect this value.
     */
    nodes: FlatNode[];
    /**
     * Library users need to implement this and update the node with the value
     * and also update their own state with the new node for changes to be reflected
     * in the <Tree/>.
     *
     * @param node The node that changed.
     * @param property The property that changed
     * @param value The new value
     */
    onChange?(node: FlatNode, property: keyof FlatNode, value: any): void;
    /**
     * Render a single node however you like. The output of this call will be wrapped
     * in an internal `TreeElement` wrapper which is setup for drag and drop.
     *
     * @param node The `TreeNode` to be rendered. This is created
     * form the `FlatNode` provided to the `nodes` prop
     *
     * @param depth The node's depth in the tree. Useful for apply
     * horizontal padding. Zero is root.
     */
    renderElement(node: TreeNode, depth: number): JSX.Element;
    /**
     * Pass a sort function to make the Tree sorted. You can use the exported
     * function `createAlphaNumericSort` for most cases.
     */
    sortFunction?: TreeNodeSort;
    /**
     * Disable drag and drop
     */
    readOnly?: boolean;
    /**
     * Set constraints. See `Schema`.
     */
    schema?: Schema;
}
export interface TreeContextValue {
    overId?: NodeId;
    handleDrag(id?: NodeId): void;
    handleOver(id?: NodeId): void;
    handleDrop(dropped: NodeId, target?: NodeId): void;
    handleToggleCollapse(node: Node): void;
    readOnly: boolean;
}
export declare const TreeContext: React.Context<TreeContextValue>;
export declare const useTreeContext: () => TreeContextValue;
/**
 * See docs on `TreeProps`.
 */
export declare const Tree: (props: TreeProps) => JSX.Element;
