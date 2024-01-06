import { CustomNodeProps, FilterNodeType } from "../../types/customNode.type";
import { useState } from "react";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { Conditions } from "../../types/filter.types";
import Input from "../Input/Input";
import { runNode } from "../../utils/nodeMapStructure";
import { useAppDispatch } from "../../store";
import { updateFilterNodeData } from "../../store/reducers/editorReducer";
import { addTableData } from "../../store/reducers/tableReducer";

function FilterNode(props: CustomNodeProps) {
  const [selectedColumn, setSelectedColumn] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const [selectedCondition, setSelectedCondition] = useState<null | Conditions>(
    null
  );
  const [, setEnteredCondition] = useState<null | string>(null);
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
    setSelectedCondition(value as Conditions);
  };
  const onColumnChange = (value: string) => {
    dispatch(updateFilterNodeData({ id: props.id, column: value }));
    setSelectedColumn(value);
  };
  const onEnteredConditionChange = (value: string) => {
    dispatch(updateFilterNodeData({ id: props.id, condition: value }));
    setEnteredCondition(value);
  };
  const conditions = [
    Conditions.TEXT_EQUALS,
    Conditions.TEXT_INCLUDES,
    Conditions.TEXT_NOT_EQUALS,
    Conditions.TEXT_NOT_INCLUDES,
  ];
  const columns = (props.data.data as FilterNodeType).allColumns;
  return (
    <div className="flex flex-col">
      <Select
        options={columns.map((columnItem) => ({
          label: columnItem,
        }))}
        onChange={onColumnChange}
        label="Select a Column"
      />
      {selectedColumn && (
        <Select
          onChange={onConditionChange}
          options={conditions.map((conditionItem) => ({
            label: conditionItem,
          }))}
          label="Select a Condition"
        />
      )}

      {selectedColumn && selectedCondition && (
        <Input onChange={onEnteredConditionChange} label="Condition Name" />
      )}
      {/* {selectedColumn && selectedCondition && ( */}
      <Button onClick={onRunHandler}>Run</Button>
      {/* )} */}
    </div>
  );
}

export default FilterNode;
