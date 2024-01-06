import { CustomNodeProps, FilterNodeType } from "../../types/customNode.types";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { Conditions } from "../../types/filter.types";
import Input from "../Input/Input";
import { runNode } from "../../utils/nodeMap";
import { useAppDispatch } from "../../store";
import { updateFilterNodeData } from "../../store/reducers/editorReducer";
import { addTableData } from "../../store/reducers/tableReducer";

function FilterNode(props: CustomNodeProps) {
  const dispatch = useAppDispatch();

  const onRunHandler = () => {
    const tableData = runNode(props.id);
    dispatch(addTableData(tableData));
  };
  const onConditionChange = (value: string) => {
    dispatch(
      updateFilterNodeData({
        id: props.id,
        filterConditionType: value as Conditions,
      })
    );
  };
  const onColumnChange = (value: string) => {
    dispatch(updateFilterNodeData({ id: props.id, column: value }));
  };
  const onEnteredConditionChange = (value: string) => {
    dispatch(updateFilterNodeData({ id: props.id, condition: value }));
  };
  const conditions = [
    Conditions.TEXT_EQUALS,
    Conditions.TEXT_INCLUDES,
    Conditions.TEXT_NOT_EQUALS,
    Conditions.TEXT_NOT_INCLUDES,
  ];
  const nodeData = props.data.data as FilterNodeType;
  return (
    <div className="flex flex-col">
      <Select
        options={nodeData.allColumns?.map((columnItem) => ({
          label: columnItem,
        }))}
        onChange={onColumnChange}
        label="Select a Column"
      />
      {nodeData.column && (
        <Select
          onChange={onConditionChange}
          options={conditions.map((conditionItem) => ({
            label: conditionItem,
          }))}
          label="Select a Condition"
        />
      )}

      {nodeData.column && nodeData.filterConditionType && (
        <Input onChange={onEnteredConditionChange} label="Condition Name" />
      )}
      {nodeData.column &&
        nodeData.filterConditionType &&
        nodeData.condition && <Button onClick={onRunHandler}>Run</Button>}
    </div>
  );
}

export default FilterNode;
