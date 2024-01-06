import { NodeProps } from "reactflow";
import { Conditions } from "./filter.types";
import { SortConditions } from "./sort.types";

export enum CustomeNodeType {
  SORT = "Sort",
  FILTER = "Filter",
  FILE = "file",
  SLICE = "slice",
}
export interface FilterNodeType {
  type: CustomeNodeType.FILTER;
  filterConditionType: Conditions | null;
  column: string | null;
  condition: string | null;
  allColumns: string[];
}
export interface FileNodeType {
  type: CustomeNodeType.FILE;
  uploadedData: { [key: string]: string }[];
  allColumns: string[];
}
export interface SortNodeType {
  type: CustomeNodeType.SORT;
  allColumns: string[];
  column: string | null;
  typeOfSort: SortConditions;
}
export interface SliceNodeType {
  type: CustomeNodeType.SLICE;
  beginIndex: number | null;
  endIndex: number | null;
}
export type NodeData = {
  readonly typeOf: CustomeNodeType;
  data?: FilterNodeType | FileNodeType | SortNodeType | SliceNodeType;
};

export type CustomNodeData = NodeProps<NodeData>;
export type CustomNodeProps = NodeProps<NodeData>;

export type CustomNodeTypeForReactFlow = {
  id: string;
  type: "textUpdater";
  position: { x: number; y: number };
  data: CustomNodeData;
};
