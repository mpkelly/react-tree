import React from "react";
import { TreeNode, FlatNode, NodeId, Node, TreeNodeSort } from "./Node";
import { Schema } from "./Schema";
import { SelectionState } from "./SelectionState";
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
    onChange?(nodes: FlatNode[], property: keyof FlatNode, value: any): void;
    /**
     * Library users need to implement this unless `disableCopy` is set to true.
     * The pasted nodes should be added to the `nodes` prop value
     * so they are reflected in the tree. Note: this is called after copy only. Cut
     * and pasted nodes are handled using `onChange`.
     *
     * @param nodes the nodes that were copied.
     * @param newParentId the `id` if the node they were copied to.
     */
    onPaste?(nodes: FlatNode[], newParentId: NodeId): void;
    /**
     * Listen for selection events.
     *
     * see `SelectionState`
     *
     * @param selected the nodes that are selected
     */
    onSelectionChange?(selected: SelectionState): void;
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
     * Set constraints. See `Schema`.
     */
    schema?: Schema;
    /**
     * Pass a sort function to make the Tree sorted. You can use the exported
     * function `createAlphaNumericSort` for most cases. The default behaviour is to append
     * dropped nodes to the parent node's `children` array.
     */
    sortFunction?: TreeNodeSort;
    /**
     * Disable drag and drop. Default false.
     */
    disableDrag?: boolean;
    /**
     *  Disable all selection. Default false.
     */
    disableSelection?: boolean;
    /**
     *  Disable multiple selection. Default false.
     */
    disableMultiSelection?: boolean;
    /**
     *  Disable support for cutting and pasting nodes. Default false.
     */
    disableCut?: boolean;
    /**
     *  Disable support for copying (adding) and pasting nodes. Default false.
     */
    disableCopy?: boolean;
    /**
     * Override the browser's default drag image.
     *
     * @param nodes the ids of the Nodes that are being dragged
     */
    renderDragImage?(nodes: NodeId[]): HTMLImageElement | HTMLCanvasElement;
}
export interface TreeContextValue {
    overId?: NodeId;
    dragId?: NodeId;
    handleDrag(id?: NodeId): void;
    handleOver(id?: NodeId): void;
    handleDrop(dropped: NodeId, target?: NodeId): void;
    handleToggleCollapse(node: Node): void;
    disableDrag: boolean;
    selection: SelectionState;
    setSelection(selection: SelectionState): void;
    handleClick(event: React.MouseEvent, node: NodeId): void;
    renderDragImage?(nodes: NodeId[]): HTMLImageElement | HTMLCanvasElement;
}
export declare const TreeContext: React.Context<TreeContextValue>;
export declare const useTree: () => TreeContextValue;
/**
 * See docs on `TreeProps`.
 */
export declare const Tree: (props: TreeProps) => JSX.Element;
