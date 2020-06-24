import { NodeType, Node } from "./Node";

type SchemaKey = NodeType;
type SchemaAllowedFunction = (dragNode: Node, dropNode: Node) => boolean;

/**
 *  A Schema can describe the constraints you would like to enforce for each `NodeType`.
 *
 *  For example, in a file system, a folder can not be dropped on a file (normally).
 *  You can add properties to `Schema.rules` for each type you wish to constrain. The property
 *  key is the  `NodeType` you are constraining and the value is an array of `NodeType`s that
 *  can be accepted  as children by the key type. An empty array means this type does not accept
 *  any children.
 */

export type Schema = {
  rules?: { [key in SchemaKey]: NodeType[] };
  isDropAllowed?: SchemaAllowedFunction;
};

export const isDropAllowed = (
  dragNode: Node,
  dropNode: Node,
  schema?: Schema
) => {
  if (!schema) return true;

  const accepts = schema.rules ? schema.rules[dropNode.type] : undefined;

  if (accepts && accepts.length === 0) {
    return false;
  }
  if (accepts && !accepts.includes(dragNode.type)) {
    return false;
  }
  if (schema.isDropAllowed) {
    return schema.isDropAllowed(dragNode, dropNode);
  }
  return true;
};
