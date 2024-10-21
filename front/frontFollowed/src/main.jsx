import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { TodoStoreProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoStoreProvider>
    <Router>
      <App />
    </Router>
  </TodoStoreProvider>
);
