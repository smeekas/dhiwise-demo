import React from "react";
import { addNode } from "../../store/reducers/editorReducer";
import { useAppDispatch } from "../../store";
import { CustomeNodeType } from "../../types/customNode.type";

function NodeSelector() {
  const customNodes: CustomeNodeType[] = [
    CustomeNodeType.FILTER,
    CustomeNodeType.SORT,
    CustomeNodeType.FILE,
  ];
  const dispatch = useAppDispatch();
  const onAddHandler = (nodeType: CustomeNodeType) => {
    dispatch(addNode(nodeType));
  };
  return (
    <div className="col-span-1">
      <ul className="list-none p-2">
        {React.Children.toArray(
          customNodes.map((customNodeItem) => {
            return (
              <li className=" text-center py-2 my-2 cursor-pointer uppercase	hover:bg-slate-500 hover:text-white  px-4 rounded font-bold border-2 m-0 border-slate-500" onClick={() => onAddHandler(customNodeItem)}>
                {customNodeItem}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default NodeSelector;
