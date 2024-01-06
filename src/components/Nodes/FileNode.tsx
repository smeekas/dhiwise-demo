import { CustomNodeProps } from "../../types/customNode.type";
import { ChangeEventHandler } from "react";
import papa from "papaparse";
import { useAppDispatch } from "../../store";
import { addFileNodeData } from "../../store/reducers/editorReducer";
import { addTableData } from "../../store/reducers/tableReducer";
export default function FileNode(props: CustomNodeProps) {
  const dispatch = useAppDispatch();
  const onUploadHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event?.target?.files?.[0];

    if (file) {
      papa.parse(file, {
        complete(results) {
          const resultObj: { [key: string]: string }[] = [];
          const columns = results.data[0] as string[];
          results.data.shift();
          results.data.forEach((rowData) => {
            const createdRow: { [key: string]: string } = {};
            (rowData as string[]).forEach((row, index) => {
              createdRow[columns[index]] = row;
            });
            resultObj.push(createdRow);
          });
          dispatch(
            addFileNodeData({ fileData: resultObj, id: props.id, columns })
          );
          dispatch(addTableData(resultObj));
        },
      });
    }
  };
  return (
    <div>
      <input type="file" onChange={onUploadHandler} />
    </div>
  );
}
