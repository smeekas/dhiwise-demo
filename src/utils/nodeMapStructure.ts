import {
  CustomeNodeType,
  FileNodeType,
  FilterNodeType,
  SortNodeType,
} from "../types/customNode.type";
import { Conditions } from "../types/filter.types";
import { SortConditions } from "../types/sort.types";

type CommonForMap = { source: string | null; end: string | null };
type FilterForMap = FilterNodeType & CommonForMap;
type FileForMap = FileNodeType & CommonForMap;
type SortForMap = SortNodeType & CommonForMap;

export type NodeTypeForMap = FilterForMap | FileForMap | SortForMap;
const nodes = new Map<string, NodeTypeForMap>();

export const addEdgeToMap = (startId: string, endId: string) => {
  const source = nodes.get(startId);
  const des = nodes.get(endId);
  if (source) {
    source.end = endId;
    nodes.set(startId, source);
  }
  if (des) {
    des.source = startId;
    nodes.set(endId, des);
  }
};
export const addNodeToMap = (id: string, node: NodeTypeForMap) => {
  nodes.set(id, node);
};

export const runNode = (id: string) => {
  let backId: string | null = id;
  const arrayOfNodes = [];
  while (backId != null) {
    const nodeData = nodes.get(backId);
    arrayOfNodes.unshift(nodeData);
    backId = nodeData?.source ?? null;
  }
  let tableData: {
    [key: string]: string;
  }[] = [];
  arrayOfNodes.forEach((nodeItem) => {
    if (nodeItem?.type === CustomeNodeType.FILE) {
      tableData = nodeItem.uploadedData;
    } else if (nodeItem?.type === CustomeNodeType.FILTER) {
      switch (nodeItem.filterConditionType) {
        case Conditions.TEXT_EQUALS: {
          if (nodeItem.column != null) {
            tableData = tableData.filter(
              (tableRow) => tableRow[nodeItem.column!] === nodeItem.condition
            );
          }
          break;
        }
        case Conditions.TEXT_INCLUDES: {
          if (nodeItem.column != null && nodeItem.condition != null) {
            tableData = tableData.filter((tableRow) =>
              tableRow[nodeItem.column!].includes(nodeItem.condition!)
            );
          }
          break;
        }
        case Conditions.TEXT_NOT_EQUALS: {
          if (nodeItem.column != null) {
            tableData = tableData.filter(
              (tableRow) => tableRow[nodeItem.column!] !== nodeItem.condition
            );
          }
          break;
        }
        case Conditions.TEXT_NOT_INCLUDES: {
          if (nodeItem.column != null && nodeItem.condition != null) {
            tableData = tableData.filter(
              (tableRow) =>
                !tableRow[nodeItem.column!].includes(nodeItem.condition!)
            );
          }
          break;
        }
      }
    } else if (nodeItem?.type === CustomeNodeType.SORT) {
      if (nodeItem.column) {
        const asc = nodeItem.typeOfSort === SortConditions.ASC ? 1 : -1;
        const dsc = nodeItem.typeOfSort === SortConditions.DSC ? 1 : -1;

        tableData = [...tableData].sort((a, b) => {
          if (a[nodeItem.column!] > b[nodeItem.column!]) return asc;
          if (a[nodeItem.column!] < b[nodeItem.column!]) return dsc;
          return 0;
        });
      }
    }
  });
  return tableData;
};

export const updateNodeToMap = (
  id: string,
  node: Partial<Omit<NodeTypeForMap, "source" | "end" | "type">>
) => {
  let nodeInMap = nodes.get(id);
  if (nodeInMap) {
    nodeInMap = { ...nodeInMap, ...node };
    nodes.set(id, nodeInMap);
  }
};
export const updateNextNodesWithColumn = (id: string, columns: string[]) => {
  let sourceId: string | null = id;
  const idSet = new Set<string>();
  while (sourceId != null) {
    const nodeData = nodes.get(sourceId);
    if (nodeData) {
      nodeData.allColumns = [...columns];
      nodes.set(sourceId, nodeData);
      idSet.add(sourceId);
    }
    sourceId = nodeData?.end ?? null;
  }
  return idSet;
};

export const deleteNodeFromMap = (id: string) => {
  nodes.delete(id);
};
