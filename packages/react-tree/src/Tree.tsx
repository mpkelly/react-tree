/* eslint-disable react/prop-types */

import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  useCallback,
  CSSProperties,
  forwardRef,
  memo
} from "react";
import {
  TreeNode,
  FlatNode,
  NodeId,
  Node,
  TreeNodeSort,
  sortTree,
  createAlphaNumericSort
} from "./Node";
import { TreeElement } from "./TreeElement";
import { Schema } from "./Schema";
import { useSelectionState, SelectionState } from "./SelectionState";
import { getSelectedNodeIds, toTreeNodes, findTreeNodeById } from "./NodeUtils";
import { useKeyboard } from "./Keyboard";
import { isMoveValid } from "./TreeUtils";

export interface TreeProps {
  /**
   * The nodes to create a Tree from. This property is not converted into
   * a state variable so the <Tree/> should always reflect this value.
   */
  nodes: FlatNode[];

  /**
   * The property on your `FlatNode` which serves as the name. This is text
   * the user sees for each node and is typically be called `name` or `title`. This
   * is required to support searching in ARIA and is also used to creating a
   * sorting function if prop `sortFunction` is not set.
   *
   * See:
   *
   * https://www.w3.org/TR/wai-aria-practices/examples/treeview/treeview-1/treeview-1b.html#kbd_label
   */
  nameProperty: keyof FlatNode;

  /**
   * Library users need to implement this and update the nodes with the new value
   * and also update their own state with the new nodes so the changes are reflected
   * in the <Tree/>.
   *
   * @param node The node that changed.
   * @param property The property that changed
   * @param value The new value
   */
  onChange?(nodes: FlatNode[], property: keyof FlatNode, value: any): void;

  /**
   * Library users need to implement this unless `disableCopy` is set to true. This
   * is called after copy only. Cut and pasted nodes are handled using `onChange`.
   *
   * The pasted nodes in a tree structure which should be incroporated to the `nodes`
   * prop value after a new `id` property has been assigned to each node and
   * the `parentId` has been updated to reference the new parent
   * node `id`.
   *
   * See the example code for a possible implementation of the
   * `handlePaste` function.
   *
   * @param nodes the TreeNode that were copied.
   * @param newParentId the `id` if the node they were copied to.
   */
  onPaste?(nodes: TreeNode[], newParentId: NodeId): void;

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
   * function `createAlphaNumericSort` for most cases. If you don't set this
   * prop then an alphanumeric sort is is used based on the `nameProperty` prop.
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
   *  The `id` of the node which should be focused, if any. The tree does
   *  not ensure this node is visible in an expanded parent or perform any
   *  scrolling. Default behaviour is not to focus any nodes.
   */
  initialFocusedNodeId?: NodeId;

  /**
   * Override the browser's default drag image.
   *
   * @param nodes the ids of the Nodes that are being dragged
   */
  renderDragImage?(nodes: NodeId[]): HTMLImageElement | HTMLCanvasElement;

  /**
   * The ARIA label Id. This should be the Id of heading element which explains
   * what the tree is used for. This element can be visually hidden if necessary
   * but needs to present in accessible applications.
   *
   * See:
   *
   * https://www.w3.org/TR/wai-aria-practices/examples/treeview/treeview-1/treeview-1b.html#kbd_label
   * https://a11yproject.com/posts/how-to-hide-content/
   *
   */
  labelledbyId?: string;
}

export interface TreeContextValue {
  overId?: NodeId;
  dragId?: NodeId;
  handleDrag(id?: NodeId): void;
  handleOver(id?: NodeId): void;
  handleDrop(dropped: NodeId, target?: NodeId): void;
  handleToggleCollapse(nodes: Node[]): void;
  disableDrag: boolean;
  selection: SelectionState;
  handleSelectionChange(selection: SelectionState): void;
  handleClick(event: React.MouseEvent, node: NodeId): void;
  renderDragImage?(nodes: NodeId[]): HTMLImageElement | HTMLCanvasElement;
}

export const TreeContext = createContext<TreeContextValue | undefined>(
  undefined
);

export const useTree = () => useContext(TreeContext);

const ListStyle: CSSProperties = {
  padding: 0
};

const ListItemStyle: CSSProperties = {
  listStyle: "none"
};

/**
 * See docs on `TreeProps`.
 */
export const Tree = forwardRef<HTMLUListElement, TreeProps>((props, ref) => {
  const {
    nodes,
    nameProperty,
    renderElement,
    onChange,
    onPaste,
    onSelectionChange,
    sortFunction,
    disableDrag,
    schema,
    disableSelection,
    disableMultiSelection,
    disableCut,
    disableCopy,
    renderDragImage,
    initialFocusedNodeId,
    labelledbyId
  } = props;
  const treeNodes = toTreeNodes(nodes);
  const [dragId, setDragId] = useState<NodeId>();
  const [overId, setOverId] = useState<NodeId>();

  if (sortFunction) {
    sortTree(treeNodes, sortFunction);
  } else {
    sortTree(treeNodes, createAlphaNumericSort(nameProperty));
  }

  const initialSelection =
    initialFocusedNodeId !== undefined ? [initialFocusedNodeId!] : [];

  const {
    selection,
    handleClick,
    handleSelectionChange,
    handleBlur
  } = useSelectionState(
    treeNodes,
    onSelectionChange,
    disableSelection,
    disableMultiSelection,
    initialSelection
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
          true,
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
          false,
          target,
          schema
        )
      ) {
        const rootNodes = getSelectedNodeIds(treeNodes, selection.copied);
        const changedTree = rootNodes.map((id) => {
          const result = findTreeNodeById(id, treeNodes);
          return result?.node as TreeNode;
        });
        onPaste(changedTree, target);
      }
    }
  };

  const handleToggleCollapse = (nodes: Node[]) => {
    if (onChange) {
      onChange(nodes, "expanded", !nodes[0].expanded);
    }
  };

  useKeyboard(
    treeNodes,
    selection,
    nameProperty,
    handleSelectionChange,
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
    if (isMoveValid(nodes, selected, true, overId, schema)) {
      setOverId(overId);
    } else {
      setOverId(undefined);
    }
  };

  const renderTree = useCallback(
    (nodes: TreeNode[], depth = 0) => {
      const result: ReactNode[] = [];
      nodes.forEach((node, index) => {
        const nodeItem = renderElement(node, depth);
        let children: ReactNode[] = [];
        const expanded = node.expanded === undefined || node.expanded;
        if (expanded) {
          children = renderTree(node.children, depth + 1);
        }
        const attrs: any = {};
        if (node.id === overId && overId !== node.parentId) {
          attrs["data-rt-drop-valid"] = true;
        }
        if (node.children.length) {
          attrs["aria-expanded"] = expanded;
        }
        const focused = selection.focused && node.id === selection.selected[0];
        result.push(
          <ListItem
            node={node}
            index={index}
            depth={depth}
            setsize={nodes.length}
            focused={focused}
            nodeItem={nodeItem}
            {...attrs}
          >
            {children}
          </ListItem>
        );
      });
      return result;
    },
    [overId, selection, renderElement]
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
    handleSelectionChange,
    handleClick,
    renderDragImage,
    dragId
  };

  return (
    <TreeContext.Provider value={value}>
      <ul
        ref={ref}
        data-rt-tree
        role="tree"
        style={ListStyle}
        onBlur={handleBlur}
        aria-labelledby={labelledbyId}
      >
        {tree}
      </ul>
    </TreeContext.Provider>
  );
});

interface ListItemProps {
  node: TreeNode;
  index: number;
  depth: number;
  setsize: number;
  focused: boolean;
  nodeItem: JSX.Element;
  children?: ReactNode;
  [key: string]: any;
}

const ListItem = memo((props: ListItemProps) => {
  const {
    node,
    index,
    depth,
    setsize,
    focused,
    nodeItem,
    children,
    ...rest
  } = props;
  return (
    <li
      data-rt-element-wrapper={node.id}
      role="treeitem"
      aria-level={depth + 1}
      aria-setsize={setsize}
      aria-posinset={index + 1}
      tabIndex={focused ? 0 : -1}
      {...rest}
      style={ListItemStyle}
      key={node.id}
    >
      <TreeElement node={node} depth={depth}>
        {nodeItem}
      </TreeElement>
      {children && (
        <ul role="group" style={ListStyle}>
          {children}
        </ul>
      )}
    </li>
  );
});
