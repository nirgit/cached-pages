import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';
import createStore from './store';

import App from "./App";

const rootElement = document.getElementById("root");

const store = createStore({
  routeId: 0
})

let lastScreenId = store.get().routeId
const screenCache = {} // Map screenID + Screen Data -> HTML

function getCachedScreen(routeId, currentData) {
  const cachedRoute = screenCache[routeId] || {}
  let cachedResult;
  switch (routeId) {
    case 1: {
      let postsId = currentData.posts && currentData.posts.id
      if (!postsId) return null
      cachedResult = cachedRoute[postsId]
      break;
    }
    case 2: {
      let messagesId = currentData.messages && currentData.messages.id
      if (!messagesId) return null
      cachedResult = cachedRoute[messagesId]
      break;
    }
    default: return null;
  }
  if (!cachedResult) {
    screenCache[routeId] = null
  }
  return cachedResult
}

function setScreenToCache(routeId, prevData, html) {
  if (!prevData) return
  screenCache[routeId] = {}
  switch(routeId) {
    case 1: {
      let postsId = prevData.posts && prevData.posts.id
      if (!postsId) return
      screenCache[routeId][prevData.posts.id] = html
      break;
    }
    case 2: {
      let messagesId = prevData.messages && prevData.messages.id
      if (!messagesId) return
      screenCache[routeId][prevData.messages.id] = html
      break;
    }
    default: break;
  }
}

function startApp() {
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
}

function startAppWithCache() {
  function smartRenderApp(isInitialRender, prevData) {
    // store into the cache the latest screen
    setScreenToCache(lastScreenId, prevData, rootElement.innerHTML)
    lastScreenId = store.get().routeId
    // React cleanup
    ReactDOM.unmountComponentAtNode(rootElement)

    // pull out from the cache!
    const cachedScreenHTML = getCachedScreen(store.get().routeId, store.get())
    let renderedApp = null
    if (cachedScreenHTML) {
      // console.log("---> skipping react render")
      renderedApp = cachedScreenHTML
    } else {
      // console.log("*** React render HTML ***")
      renderedApp = ReactDOMServer.renderToString(<App store={store} data={store.get()} routeId={store.get().routeId} />)
    }
    // set the new screen on the DOM!
    rootElement.innerHTML = renderedApp;
    // Hydrate
    window.requestAnimationFrame(() => {
    ReactDOM.hydrate(<App store={store} data={store.get()} routeId={store.get().routeId} />, rootElement, () => {
      // console.log("Hydration done!")
      })
    })
  }

  store.addListener(smartRenderApp.bind(null, false))

  smartRenderApp(true)
}

const SHOULD_CACHE_SCREENS = window.location.search.replace("?", "").split("&").indexOf("cache=1") >= 0
if (SHOULD_CACHE_SCREENS) {
  console.log('-------- app with cache -------')
  startAppWithCache()
} else {
  console.log('-------- normal app -------')
  startApp()
}
