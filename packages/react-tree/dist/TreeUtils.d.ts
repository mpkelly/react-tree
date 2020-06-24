import { FlatNode, NodeId } from "./Node";
import { Schema } from "./Schema";
export declare const isMoveValid: (nodes: FlatNode[], selection: NodeId[], isCutOrDrop?: boolean, overId?: NodeId, schema?: Schema) => boolean;
