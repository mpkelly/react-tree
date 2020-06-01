import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  TreeNode,
  FlatNode,
  toTreeNodes,
  NodeId,
  Node,
  findTreeNodeById,
  toFlatNodes,
  TreeNodeSort,
  sortTree,
} from "./Node";
import { TreeElement } from "./TreeElement";
import { Schema, isDropAllowed } from "./Schema";

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

export const TreeContext = createContext<TreeContextValue | undefined>(
  undefined
);

export const useTreeContext = () => {
  return useContext(TreeContext);
};

/**
 * See docs on `TreeProps`.
 */
export const Tree = (props: TreeProps) => {
  const {
    nodes,
    renderElement,
    onChange,
    sortFunction,
    readOnly,
    schema,
  } = props;
  const [dragId, setDragId] = useState<NodeId>();
  const [overId, setOverId] = useState<NodeId>();
  const treeNodes = toTreeNodes(nodes);
  if (sortFunction) {
    sortTree(treeNodes, sortFunction);
  }

  const handleDrop = (dropped: NodeId, target?: NodeId) => {
    if (target) {
      const node = nodes.find((node) => String(node.id) === String(dropped));
      if (node && String(node.parentId) !== String(target)) {
        onChange && onChange(node, "parentId", target);
      }
    }
    setOverId(undefined);
  };

  const handleToggleCollapse = (node: TreeNode) => {
    onChange && onChange(node, "expanded", !node.expanded);
  };

  const handleOver = useCallback(
    (overId?: NodeId) => {
      if (overId === undefined) {
        setOverId(undefined);
        return;
      }
      // Don't allow drop on self
      if (dragId === overId) {
        return;
      }
      const dragNode = nodes.find((node) => node.id === dragId);
      if (dragNode) {
        // Don't allow dropping into s existing parent
        if (dragNode.parentId == overId) {
          return false;
        }
        const overNode = nodes.find((node) => node.id === overId);
        if (overNode) {
          const search = findTreeNodeById(dragId as NodeId, treeNodes);
          if (search && search.node) {
            const children = toFlatNodes(search.node.children);
            // Don't allow dropping into a child node
            if (children.find((child) => child.id == overId)) {
              return;
            }
          }
          // Validate against schema, if set
          if (isDropAllowed(dragNode, overNode, schema)) {
            setOverId(overId);
          }
        }
      }
    },
    [dragId]
  );

  const renderTree = (nodes: TreeNode[], depth = 0) => {
    const result: ReactNode[] = [];
    nodes.forEach((node) => {
      const nodeItem = renderElement(node, depth);
      let children: ReactNode[] = [];
      if (node.expanded === undefined || node.expanded) {
        children = renderTree(node.children, depth + 1);
      }
      let props: any = {};
      if (node.id === overId && overId !== node.parentId) {
        props["data-rt-drop-valid"] = true;
      }

      result.push(
        <div data-rt-element {...props}>
          <TreeElement node={node} depth={depth}>
            {nodeItem}
          </TreeElement>
          {children}
        </div>
      );
    });
    return result;
  };

  const tree = renderTree(treeNodes);

  const value: TreeContextValue = {
    overId,
    handleDrag: setDragId,
    handleOver,
    handleDrop,
    handleToggleCollapse,
    readOnly: Boolean(readOnly),
  };

  return (
    <TreeContext.Provider value={value}>
      <div data-rt-tree>{tree}</div>
    </TreeContext.Provider>
  );
};
