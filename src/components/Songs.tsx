import { useState } from "react";

export default function Songs() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("songs");
    return stored ? JSON.parse(stored) : { releases: [] };
  });

  const isEmpty = data.releases.length === 0;

  function addAlbum() {
    console.log(data);
    localStorage.setItem("songs", JSON.stringify(data));
  }

  return (
    <>
      <div className="header">
        <p>Songs</p>
        <div className="controls">
          <button id="add-album" onClick={addAlbum}>
            Add Album
          </button>
          <button id="add-song">Add Song</button>
        </div>
      </div>
      <div className="songs">
        <div className="releases">
          {isEmpty ? <h3>You have no releases!</h3> : <p>TODO: releases</p>}
        </div>
        <div className="current">
          Also imagine this shows the currently selected song &#40;lyrics and
          shit&#41;
        </div>
      </div>
    </>
  );
}
