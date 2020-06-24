import { FlatNode, NodeId } from "./Node";
import { Schema, isDropAllowed } from "./Schema";
import { findTreeNodeById, toFlatNodes, toTreeNodes } from "./NodeUtils";

export const isMoveValid = (
  nodes: FlatNode[],
  selection: NodeId[],
  overId: NodeId | undefined,
  schema: Schema | undefined
) => {
  if (overId === undefined) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const dragId of selection) {
    // Don't allow drop on self
    if (dragId === overId) {
      return false;
    }
    const dragNode: FlatNode | undefined = nodes.find(
      (node) => node.id === dragId
    );
    if (dragNode) {
      if (dragNode.dragDisabled) {
        return false;
      }
      // Don't allow dropping into existing parent
      if (dragNode.parentId === overId) {
        return false;
      }
      const overNode = nodes.find((node) => node.id === overId);
      if (overNode) {
        const search = findTreeNodeById(dragId as NodeId, toTreeNodes(nodes));
        if (search && search.node) {
          const children = toFlatNodes(search.node.children);
          // Don't allow dropping into a child node
          if (children.find((child) => child.id === overId)) {
            return false;
          }
        }
        // Validate against schema, if set
        if (!isDropAllowed(dragNode, overNode, schema)) {
          return false;
        }
      }
    }
  }
  return true;
};
