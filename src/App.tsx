import { Provider } from "react-redux";
import "./App.css";
import NodeSelector from "./components/NodeSelector/NodeSelector";
import store from "./store";
import Editor from "./components/Editor/Editor";
import Table from "./components/Table/Table";

function App() {
  return (
    <Provider store={store}>
      <div className="grid grid-rows-3 h-full">
        <div className="App grid grid-cols-10 row-span-2 max-h-full">
          <NodeSelector />
          <Editor />
        </div>
        <div className="col-span-1">
          <Table />
        </div>
      </div>
    </Provider>
  );
}

export default App;
