import { useAppDispatch } from "../../store";
import { updateSortNodeData } from "../../store/reducers/editorReducer";
import { addTableData } from "../../store/reducers/tableReducer";
import { CustomNodeProps, SortNodeType } from "../../types/customNode.types";
import { SortConditions } from "../../types/sort.types";
import { runNode } from "../../utils/nodeMapStructure";
import Button from "../Button/Button";
import Select from "../Select/Select";

function SortNode(props: CustomNodeProps) {
  const options = [SortConditions.ASC, SortConditions.DSC];
  const dispatch = useAppDispatch();
  const onChange = (value: string) => {
    dispatch(
      updateSortNodeData({ id: props.id, typeOfSort: value as SortConditions })
    );
  };
  const onRunHandler = () => {
    const tableData = runNode(props.id);
    dispatch(addTableData(tableData));
  };
  const columns = (props.data.data as SortNodeType).allColumns;
  const onColumnChange = (value: string) => {
    dispatch(updateSortNodeData({ id: props.id, column: value }));
  };
  return (
    <div className="flex flex-col">
      <Select
        options={columns.map((columnItem) => ({
          label: columnItem,
        }))}
        onChange={onColumnChange}
        label="Select a Column"
      />

      <Select
        options={options.map((optionItem) => ({
          label: optionItem,
        }))}
        label="Select type Of sort"
        defaultValue={SortConditions.ASC}
        onChange={onChange}
      />
      <Button onClick={onRunHandler}>Run</Button>
    </div>
  );
}

export default SortNode;
