import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { Edge, Node } from "reactflow";
import {
  CustomeNodeType,
  FilterNodeType,
  NodeData,
  SliceNodeType,
  SortNodeType,
} from "../../types/customNode.types";
import {
  addEdgeToMap,
  addNodeToMap,
  deleteNodeFromMap,
  NodeTypeForMap,
  updateNextNodesWithColumn,
  updateNodeToMap,
} from "../../utils/nodeMapStructure";
import { SortConditions } from "../../types/sort.types";

export interface EditorState {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

const initialState: EditorState = {
  nodes: [],
  edges: [],
};

export type FileNodePayload = {
  fileData: { [key: string]: string }[];
  id: string;
  columns: string[];
};
export type UpdateFilterNodePayload = {
  id: string;
} & Partial<Omit<FilterNodeType, "allColumns" | "type">>;

export type UpdateSortNodePayload = {
  id: string;
} & Partial<Omit<SortNodeType, "allColumns" | "type">>;

export type UpdateSliceNodePayload = {
  id: string;
} & Partial<Omit<SliceNodeType, "type">>;
export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<CustomeNodeType>) => {
      const nodeData: Node<NodeData> = {
        id: uuid(),
        position: { x: 0, y: 0 },
        type: "textUpdater",
        data: { typeOf: action.payload },
      };
      switch (action.payload) {
        case CustomeNodeType.FILE: {
          nodeData.data.data = {
            type: action.payload,
            uploadedData: [],
            allColumns: [],
          };
          break;
        }
        case CustomeNodeType.FILTER: {
          nodeData.data.data = {
            column: null,
            condition: null,
            filterConditionType: null,
            allColumns: [],
            type: action.payload,
          };
          break;
        }
        case CustomeNodeType.SORT: {
          nodeData.data.data = {
            type: action.payload,
            allColumns: [],
            column: null,
            typeOfSort: SortConditions.ASC,
          };
          break;
        }
        case CustomeNodeType.SLICE: {
          nodeData.data.data = {
            type: action.payload,
            beginIndex: null,
            endIndex: null,
          };
          break;
        }
      }
      const nodeForMap: NodeTypeForMap = {
        ...nodeData.data.data,
        source: null,
        end: null,
      };
      addNodeToMap(nodeData.id, nodeForMap);
      state.nodes.push(nodeData);
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(
        (nodeItem) => nodeItem.id !== action.payload
      );
      state.edges = state.edges.filter((edgeItem) => {
        return (
          edgeItem.source !== action.payload &&
          edgeItem.target !== action.payload
        );
      });
      deleteNodeFromMap(action.payload);
    },
    updateNodes: (state, action: PayloadAction<Node<NodeData>[]>) => {
      state.nodes = action.payload;
    },
    addEdgeToNode: (state, action: PayloadAction<Edge[]>) => {
      const lastEdge = action.payload[action.payload.length - 1];
      addEdgeToMap(lastEdge.source, lastEdge.target);
      state.edges = action.payload;
      const indexOfNode = state.nodes.findIndex(
        (nodeItem) => nodeItem.id === lastEdge.source
      );
      if (indexOfNode > -1) {
        const sourceNode = state.nodes[indexOfNode].data.data;
        if (sourceNode && "allColumns" in sourceNode) {
          updateNodeToMap(state.nodes[indexOfNode].id, {
            allColumns: sourceNode?.allColumns,
          });
          const idSet = updateNextNodesWithColumn(
            state.nodes[indexOfNode].id,
            sourceNode?.allColumns ?? []
          );
          state.nodes.forEach((nodeItem) => {
            if (idSet.has(nodeItem.id)) {
              if (
                nodeItem.data &&
                nodeItem.data.data &&
                "allColumns" in nodeItem.data.data
              ) {
                nodeItem.data.data.allColumns = sourceNode?.allColumns ?? [];
              }
            }
          });
        }
      }
    },
    addFileNodeData: (state, action: PayloadAction<FileNodePayload>) => {
      const nodeIndex = state.nodes.findIndex(
        (nodeItem) => nodeItem.id === action.payload.id
      );

      if (nodeIndex > -1) {
        const fileNode = state.nodes[nodeIndex];
        if (fileNode.data?.data?.type === CustomeNodeType.FILE) {
          fileNode.data.data.uploadedData = action.payload.fileData;
          updateNodeToMap(action.payload.id, { ...fileNode.data.data });
          const idSet = updateNextNodesWithColumn(action.payload.id, [
            ...action.payload.columns,
          ]);
          state.nodes.forEach((nodeItem) => {
            if (idSet.has(nodeItem.id)) {
              if (
                nodeItem.data &&
                nodeItem.data.data &&
                "allColumns" in nodeItem.data.data
              ) {
                nodeItem.data.data.allColumns = action.payload.columns;
              }
            }
          });
        }
      }
    },
    updateFilterNodeData: (
      state,
      action: PayloadAction<UpdateFilterNodePayload>
    ) => {
      const nodeIndex = state.nodes.findIndex(
        (nodeItem) => nodeItem.id === action.payload.id
      );
      if (nodeIndex > -1) {
        const filterNode = state.nodes[nodeIndex];
        if (filterNode.data?.data?.type === CustomeNodeType.FILTER) {
          const { id, ...restData } = action.payload;
          filterNode.data.data = { ...filterNode.data.data, ...restData };
          updateNodeToMap(id, filterNode.data.data);
        }
      }
    },
    updateSortNodeData: (
      state,
      action: PayloadAction<UpdateSortNodePayload>
    ) => {
      const nodeIndex = state.nodes.findIndex(
        (nodeItem) => nodeItem.id === action.payload.id
      );
      if (nodeIndex > -1) {
        const sortNode = state.nodes[nodeIndex];
        if (sortNode.data?.data?.type === CustomeNodeType.SORT) {
          const { id, ...restData } = action.payload;
          sortNode.data.data = { ...sortNode.data.data, ...restData };
          updateNodeToMap(id, sortNode.data.data);
        }
      }
    },
    updateSliceNodeData: (
      state,
      action: PayloadAction<UpdateSliceNodePayload>
    ) => {
      const nodeIndex = state.nodes.findIndex(
        (nodeItem) => nodeItem.id === action.payload.id
      );
      if (nodeIndex > -1) {
        const slice = state.nodes[nodeIndex];
        if (slice.data?.data?.type === CustomeNodeType.SLICE) {
          const { id, ...restData } = action.payload;
          slice.data.data = { ...slice.data.data, ...restData };
          updateNodeToMap(id, slice.data.data);
        }
      }
    },
  },
});

export const {
  addNode,
  updateNodes,
  addEdgeToNode,
  updateFilterNodeData,
  addFileNodeData,
  deleteNode,
  updateSliceNodeData,
  updateSortNodeData,
} = editorSlice.actions;

export const { reducer: editorReducer } = editorSlice;
