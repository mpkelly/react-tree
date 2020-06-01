import { NodeType, Node } from "./Node";
declare type SchemaKey = NodeType;
declare type SchemaAllowedFunction = (dragNode: Node, dropNode: Node) => boolean;
/**
 *  A Schema can describe the constraints you would like to enforce for each `NodeType`.
 *
 *  For example, in a file system, a folder can not be dropped on a file (normally).
 *  You can add properties for each type you wish to constrain. The property key is the
 *  `NodeType` you are constraining and the value is an array of `NodeType`s that can be accepted
 *  as children by the key type. An empty array means this type does not accept any children.
 */
export declare type Schema = {
    [key in SchemaKey]: NodeType[];
} & {
    isDropAllowed?: SchemaAllowedFunction;
};
export declare const isDropAllowed: (dragNode: Node, dropNode: Node, schema?: Schema) => boolean;
export {};
