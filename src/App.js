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
  const moduleToLoad =
    selectedMenuItem === MENU_ITEM_IDS.POSTS
      ? "/src/pages/posts"
      : "/src/pages/messages";

  const PageComponent = lazy(
    () =>
      new Promise(res => {
        setTimeout(() => {
          import(moduleToLoad).then(component => {
            res(component);
          });
        }, 500);
      })
  );

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
