export default function Songs() {
  const data = JSON.parse(localStorage.getItem("songbook") ?? "{}");

  function addAlbum() {
    localStorage.setItem("songbook", JSON.stringify(data));
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
        <div className="releases">Imagine my songs are here</div>
        <div className="current">
          Also imagine this shows the currently selected song &#40;lyrics and
          shit&#41;
        </div>
      </div>
    </>
  );
}
