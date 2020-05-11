import React from "react";
import ReactDOM from "react-dom";
import Store from './store';

import App from "./App";

function renderApp() {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <App store={Store} data={Store.get()} />
    </React.StrictMode>,
    rootElement
  );
}

Store.addListener(renderApp)

renderApp()
