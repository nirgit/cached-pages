import React, { lazy, Suspense, useState } from "react";
import "./styles.css";

const MENU_ITEM_IDS = {
  NONE: 0,
  POSTS: 1,
  MESSAGES: 2
};

const renderMainContent = selectedMenuItem => {
  if (selectedMenuItem === MENU_ITEM_IDS.NONE) {
    return null;
  }

  let PageComponent = null;
  switch(selectedMenuItem) {
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
      <PageComponent />
    </Suspense>
  );
};

export default function App() {
  const [selected, setSelected] = useState(MENU_ITEM_IDS.NONE);

  return (
    <div className="App">
      <nav>
        <ul>
          <li
            onClick={() => setSelected(MENU_ITEM_IDS.POSTS)}
            className={
              "menu-item" +
              (selected === MENU_ITEM_IDS.POSTS ? " menu-item-active" : "")
            }
          >
            Posts
          </li>
          <li
            onClick={() => setSelected(MENU_ITEM_IDS.MESSAGES)}
            className={
              "menu-item" +
              (selected === MENU_ITEM_IDS.MESSAGES ? " menu-item-active" : "")
            }
          >
            Messages
          </li>
        </ul>
      </nav>

      <main>{renderMainContent(selected)}</main>
    </div>
  );
}
