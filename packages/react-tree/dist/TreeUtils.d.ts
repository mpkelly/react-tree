import { FlatNode, NodeId } from "./Node";
import { Schema } from "./Schema";
export declare const isMoveValid: (nodes: FlatNode[], selection: NodeId[], overId: NodeId | undefined, schema: Schema | undefined) => boolean;
