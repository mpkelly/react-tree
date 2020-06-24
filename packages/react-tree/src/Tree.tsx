import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  useCallback
} from "react";
import {
  TreeNode,
  FlatNode,
  NodeId,
  Node,
  TreeNodeSort,
  sortTree
} from "./Node";
import { TreeElement } from "./TreeElement";
import { Schema } from "./Schema";
import { useSelectionState, SelectionState } from "./SelectionState";
import { getSelectedNodeIds, toTreeNodes } from "./NodeUtils";
import { useKeyboard } from "./Keyboard";
import { isMoveValid } from "./TreeUtils";

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

export const TreeContext = createContext<TreeContextValue | undefined>(
  undefined
);

export const useTree = () => useContext(TreeContext);

/**
 * See docs on `TreeProps`.
 */
export const Tree = (props: TreeProps) => {
  const {
    nodes,
    renderElement,
    onChange,
    onPaste,
    sortFunction,
    disableDrag,
    schema,
    disableSelection,
    disableMultiSelection,
    disableCut,
    disableCopy,
    renderDragImage
  } = props;
  const treeNodes = toTreeNodes(nodes);
  const [dragId, setDragId] = useState<NodeId>();
  const [overId, setOverId] = useState<NodeId>();

  if (sortFunction) {
    sortTree(treeNodes, sortFunction);
  }

  const { selection, handleClick, setSelection } = useSelectionState(
    treeNodes,
    disableSelection,
    disableMultiSelection
  );

  const selected = [...selection.selected, dragId as NodeId];

  const handlePasteNodes = () => {
    const target = selection.selected[0];
    if (target === undefined) {
      return;
    }
    if (selection.cut.length) {
      if (!onChange) {
        return;
      }
      const changed = nodes.filter((node) => selection.cut.includes(node.id));
      if (
        isMoveValid(
          nodes,
          changed.map((node) => node.id),
          target,
          schema
        )
      ) {
        onChange(changed, "parentId", target);
      }
    } else {
      if (!onPaste) {
        return;
      }
      const changed = nodes.filter((node) =>
        selection.copied.includes(node.id)
      );
      if (
        isMoveValid(
          nodes,
          changed.map((node) => node.id),
          target,
          schema
        )
      ) {
        onPaste(changed, target);
      }
    }
  };

  const handleToggleCollapse = (node: Node) => {
    if (onChange) {
      onChange([node], "expanded", !node.expanded);
    }
  };

  useKeyboard(
    treeNodes,
    selection,
    setSelection,
    handlePasteNodes,
    handleToggleCollapse,
    !!disableCut,
    !!disableCopy
  );

  const handleDrop = (dropped: NodeId, target?: NodeId) => {
    if (target !== undefined) {
      const node = nodes.find((node) => String(node.id) === String(dropped));
      if (node && String(node.parentId) !== String(target)) {
        if (onChange) {
          const changedIds = getSelectedNodeIds(treeNodes, [
            ...selection.selected,
            dragId as NodeId
          ]);
          const changed = changedIds.map((id) =>
            nodes.find((node) => node.id === id)
          ) as FlatNode[];
          onChange(changed, "parentId", target);
        }
      }
    }
    setOverId(undefined);
    setDragId(undefined);
  };

  const handleOver = (overId?: NodeId) => {
    if (isMoveValid(nodes, selected, overId, schema)) {
      setOverId(overId);
    } else {
      setOverId(undefined);
    }
  };

  const renderTree = useCallback(
    (nodes: TreeNode[], depth = 0) => {
      const result: ReactNode[] = [];
      nodes.forEach((node) => {
        const nodeItem = renderElement(node, depth);
        let children: ReactNode[] = [];
        if (node.expanded === undefined || node.expanded) {
          children = renderTree(node.children, depth + 1);
        }
        const props: any = {};
        if (node.id === overId && overId !== node.parentId) {
          props["data-rt-drop-valid"] = true;
        }
        result.push(
          <div data-rt-element-wrapper={node.id} {...props}>
            <TreeElement node={node} depth={depth}>
              {nodeItem}
            </TreeElement>
            {children}
          </div>
        );
      });
      return result;
    },
    [overId, renderElement]
  );

  const tree = renderTree(treeNodes);

  const value: TreeContextValue = {
    overId,
    handleDrag: setDragId,
    handleOver,
    handleDrop,
    handleToggleCollapse,
    disableDrag: !!disableDrag,
    selection,
    setSelection,
    handleClick,
    renderDragImage,
    dragId
  };

  return (
    <TreeContext.Provider value={value}>
      <div data-rt-tree>{tree}</div>
    </TreeContext.Provider>
  );
};
