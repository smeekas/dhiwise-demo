import { Handle, Position } from "reactflow";
import { CustomNodeProps, CustomeNodeType } from "../../types/customNode.type";
import FileNode from "../Nodes/FileNode";
import FilterNode from "../Nodes/FilterNode";
import { useAppDispatch } from "../../store";
import { deleteNode } from "../../store/reducers/editorReducer";
import SortNode from "../Nodes/SortNode";

function CustomNode(props: CustomNodeProps) {
  const dispatch = useAppDispatch();
  const deleteNodeHandler = () => {
    dispatch(deleteNode(props.id));
  };
  return (
    <div className="w-fit text-xs	 bg-white rounded-md overflow-hidden shadow-md p-2">
      <Handle type="target" position={Position.Left} />
      <div className="flex w-full justify-between items-center	mb-2">
        <div>{props.data.typeOf}</div>
        <div
          className="bg-slate-200 m-0 p-0 hover:bg-slate-500 hover:text-white"
          onClick={deleteNodeHandler}
        >
          &#x2715;
        </div>
      </div>
      {props.data.typeOf === CustomeNodeType.FILE && <FileNode {...props} />}
      {props.data.typeOf === CustomeNodeType.FILTER && (
        <FilterNode {...props} />
      )}
      {props.data.typeOf === CustomeNodeType.SORT && <SortNode {...props} />}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomNode;
