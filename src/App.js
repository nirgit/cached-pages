import React, { lazy, Suspense } from "react";
import "./styles.css";

const MENU_ITEM_IDS = {
  NONE: 0,
  POSTS: 1,
  MESSAGES: 2
};

const getPageData = (routeId, data) => {
  switch(routeId) {
    case MENU_ITEM_IDS.POSTS: {
      return data.posts
    }
    case MENU_ITEM_IDS.MESSAGES: {
      return data.messages
    }
    default: return null
  }
  return null
}

const renderMainContent = (routeId, store, data) => {
  if (routeId === MENU_ITEM_IDS.NONE) {
    return null;
  }

  let PageComponent = null;
  switch(routeId) {
    case MENU_ITEM_IDS.POSTS: {
      PageComponent = lazy(() => import("./pages/Posts"))
      break;
    }
    case MENU_ITEM_IDS.MESSAGES: {
      PageComponent = lazy(() => import("./pages/Messages"))
      break;
    }
    default: break;
  }

  return (
    <Suspense fallback={"Loading page..."}>
      <PageComponent store={store} data={getPageData(routeId, data)} />
    </Suspense>
  );
};

export default function App({store, data, routeId = MENU_ITEM_IDS.NONE}) {
  return (
    <div className="App">
      <nav>
        <ul>
          <li
            onClick={() => store.set({type: "set_route", routeId: MENU_ITEM_IDS.POSTS})}
            className={
              "menu-item" +
              (routeId === MENU_ITEM_IDS.POSTS ? " menu-item-active" : "")
            }
          >
            Posts
          </li>
          <li
            onClick={() => store.set({type: "set_route", routeId: MENU_ITEM_IDS.MESSAGES})}
            className={
              "menu-item" +
              (routeId === MENU_ITEM_IDS.MESSAGES ? " menu-item-active" : "")
            }
          >
            Messages
          </li>
        </ul>
      </nav>

      <main>{renderMainContent(routeId, store, data)}</main>
    </div>
  );
}
