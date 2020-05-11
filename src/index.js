import React from "react";
import ReactDOM from "react-dom";
import createStore from './store';

import App from "./App";

const store = createStore({
  route_id: 0
})

function renderApp() {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} data={store.get()} routeId={store.get().routeId} />
    </React.StrictMode>,
    rootElement
  );
}

store.addListener(renderApp)

renderApp()
