import ReactFlow, {
  Connection,
  EdgeChange,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { useCallback, useMemo } from "react";
import CustomNode from "../CustomNode/CustomNode";
import { addEdgeToNode, updateNodes } from "../../store/reducers/editorReducer";
const rfStyle = {
  backgroundColor: "#B8CEFF",
};

function Editor() {
  const nodeTypes = useMemo(() => ({ textUpdater: CustomNode }), []);
  const nodes = useAppSelector((state) => state.editor.nodes);
  const edges = useAppSelector((state) => state.editor.edges);
  const dispatch = useAppDispatch();
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const assas = applyNodeChanges(changes, nodes);

      dispatch(updateNodes(assas));
    },
    [dispatch, nodes]
  );

  const onEdgeChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(addEdgeToNode(applyEdgeChanges(changes, edges)));
    },
    [dispatch, edges]
  );
  const onConnect = useCallback(
    (changes: Connection) => {
      dispatch(addEdgeToNode(addEdge(changes, edges)));
    },
    [dispatch, edges]
  );
  return (
    <div className="col-span-9">
      <ReactFlow
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgeChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        style={rfStyle}
        fitView
      />
    </div>
  );
}

export default Editor;
