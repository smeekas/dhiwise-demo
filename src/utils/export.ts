import { TableData } from "../store/reducers/tableReducer";
import papa from "papaparse";

function exportData(tableData: TableData) {
  const csvData = papa.unparse(tableData);
  const anchor = document.createElement("a");
  anchor.download = "converted.csv";
  const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  anchor.href = window.URL.createObjectURL(csvBlob);
  anchor.click();
  anchor.remove();
}

export default exportData;
