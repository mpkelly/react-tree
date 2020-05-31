import { NodeType, Node } from "./Node";
declare type Key = NodeType;
declare type Func = (dragNode: Node, dropNode: Node) => boolean;
export declare type Schema = {
    [key in Key]: NodeType[];
} & {
    isDropAllowed?: Func;
};
export declare const isDropAllowed: (dragNode: Node, dropNode: Node, schema?: Schema) => boolean;
export {};
