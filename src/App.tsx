import { useState } from "react";
import Songs from "./components/Songs";
import Todo from "./components/Todo";

type AppState = "Songs" | "Todo" | "Notes" | "Data";

function App() {
  const [appState, setAppState] = useState<AppState>("Songs");
  const views = {
    Songs: <Songs></Songs>,
    Todo: <Todo></Todo>,
    Notes: <p>Notes view in the future</p>,
    Data: <p>Data view in the future</p>,
  };
  return (
    <>
      <div className="main">
        <div className="left">
          <div className="header">
            <span className="accent">·</span>&nbsp;SONGBOOK
          </div>
          <p>VIEWS</p>
          <button
            className={appState === "Songs" ? "active" : ""}
            onClick={() => setAppState("Songs")}
          >
            Songs
          </button>
          <button
            className={appState === "Todo" ? "active" : ""}
            onClick={() => setAppState("Todo")}
          >
            To Do
          </button>
          <button
            className={appState === "Notes" ? "active" : ""}
            onClick={() => setAppState("Notes")}
          >
            Notes
          </button>
          <button
            className={appState === "Data" ? "active" : ""}
            onClick={() => setAppState("Data")}
          >
            Data
          </button>
        </div>
        <div className="right">{views[appState]}</div>
      </div>
    </>
  );
}

export default App;
