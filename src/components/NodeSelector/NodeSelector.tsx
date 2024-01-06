import React from "react";
import { addNode } from "../../store/reducers/editorReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import { CustomeNodeType } from "../../types/customNode.types";
import Button from "../Button/Button";
import exportData from "../../utils/export";

function NodeSelector() {
  const customNodes: CustomeNodeType[] = [
    CustomeNodeType.FILTER,
    CustomeNodeType.SORT,
    CustomeNodeType.FILE,
    CustomeNodeType.SLICE,
  ];
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.table.table);
  const onAddHandler = (nodeType: CustomeNodeType) => {
    dispatch(addNode(nodeType));
  };
  const exportHandler = () => {
    exportData(tableData);
  };
  return (
    <div className="col-span-1 flex flex-col justify-between h-full">
      <ul className="list-none p-2">
        {React.Children.toArray(
          customNodes.map((customNodeItem) => {
            return (
              <li
                className=" text-center py-2 my-2 cursor-pointer uppercase	hover:bg-slate-500 hover:text-white  px-4 rounded font-bold border-2 m-0 border-slate-500"
                onClick={() => onAddHandler(customNodeItem)}
              >
                {customNodeItem}
              </li>
            );
          })
        )}
      </ul>
      <Button onClick={exportHandler}>EXPORT</Button>
    </div>
  );
}

export default NodeSelector;
