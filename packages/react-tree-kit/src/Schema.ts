import { NodeType, Node } from "./Node";

type Key = NodeType;
type Func = (dragNode: Node, dropNode: Node) => boolean;

export type Schema = {
  [key in Key]: NodeType[];
} & {
  isDropAllowed?: Func;
};

export const isDropAllowed = (
  dragNode: Node,
  dropNode: Node,
  schema?: Schema
) => {
  if (!schema) return true;

  const accepts = schema[dropNode.type];

  if (!accepts) {
    return true;
  }

  if (accepts.length === 0) {
    return false;
  } else if (!accepts.includes(dragNode.type)) {
    return false;
  } else if (schema.isDropAllowed) {
    return schema.isDropAllowed(dragNode, dropNode);
  }
  return true;
};
