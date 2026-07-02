import { useState } from "react";
import Songs from "./components/Songs";
import Todo from "./components/Todo";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <div className="main">
        <div className="left">
          <div className="header">
            <span className="accent">·</span>&nbsp;SONGBOOK
          </div>
          <p>VIEWS</p>
          <button
            className={currentPage === 0 ? "active" : ""}
            onClick={() => setCurrentPage(0)}
          >
            Songs
          </button>
          <button
            className={currentPage === 1 ? "active" : ""}
            onClick={() => setCurrentPage(1)}
          >
            To Do
          </button>
        </div>
        <div className="right">
          {currentPage === 0 ? <Songs></Songs> : <Todo></Todo>}
        </div>
      </div>
    </>
  );
}

export default App;
