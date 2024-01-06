import { CustomNodeProps } from "../../types/customNode.types";
import Input from "../Input/Input";
import { updateSliceNodeData } from "../../store/reducers/editorReducer";
import { useAppDispatch } from "../../store";
import Button from "../Button/Button";
import { runNode } from "../../utils/nodeMap";
import { addTableData } from "../../store/reducers/tableReducer";

function SliceNode(props: CustomNodeProps) {
  const dispatch = useAppDispatch();
  const indexChangeHandler = (
    value: string,
    typeOfIndex: "beginIndex" | "endIndex"
  ) => {
    if (!Number.isNaN(value)) {
      dispatch(updateSliceNodeData({ id: props.id, [typeOfIndex]: +value }));
    }
  };
  const onRunHandler = () => {
    const tableData = runNode(props.id);
    dispatch(addTableData(tableData));
  };
  return (
    <div className="flex flex-col">
      <Input
        onChange={(value) => indexChangeHandler(value, "beginIndex")}
        type="number"
        label="Start Index"
      />
      <Input
        onChange={(value) => indexChangeHandler(value, "endIndex")}
        type="number"
        label="End Index"
      />
      <Button onClick={onRunHandler}>Run</Button>
    </div>
  );
}

export default SliceNode;
