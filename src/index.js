import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';
import createStore from './store';

import App from "./App";

const rootElement = document.getElementById("root");

const store = createStore({
  routeId: 0
})

function smartRenderApp(isInitialRender) {
  ReactDOM.unmountComponentAtNode(rootElement)
  const renderedApp = ReactDOMServer.renderToString(<App store={store} data={store.get()} routeId={store.get().routeId} />)
  rootElement.innerHTML = renderedApp;
  ReactDOM.hydrate(<App store={store} data={store.get()} routeId={store.get().routeId} />, rootElement, () => {
    console.log("Hydration done!")
  })
}

store.addListener(smartRenderApp)

smartRenderApp(true)
