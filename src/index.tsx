import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import { GameContext } from "./store/hooks";

import "./index.scss";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store} context={GameContext}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
