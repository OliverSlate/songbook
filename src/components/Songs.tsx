import { useState, useMemo } from "react";

type Selection = { type: "album" | "song"; id: string } | null;

export default function Songs() {
  //@ts-ignore
  const [albums, setAlbums] = useState(() => {
    const stored = localStorage.getItem("albums");
    return stored ? JSON.parse(stored) : { albums: [] };
  });
  const [songs, setSongs] = useState(() => {
    const stored = localStorage.getItem("songs");
    return stored ? JSON.parse(stored) : { songs: [] };
  });
  const [selected, setSelected] = useState<Selection>(null);

  const isEmpty = albums.albums.length === 0 && songs.songs.length === 0;

  const albumTree = useMemo(
    () =>
      albums.albums.map((album: any) => ({
        album,
        songs: songs.songs.filter((s: any) => s.albumId === album.id),
      })),
    [albums, songs],
  );

  const singles = useMemo(
    () => songs.songs.filter((s: any) => s.albumId === null),
    [songs],
  );

  function addAlbum() {
    /* 
      THIS FUNCTION IS TEMPORARY FOR DEVELOPMENT PURPOSES AND TESTING
    */
    const testAlbumData = albums;
    testAlbumData.albums.push({ id: 0, name: "test album" });
    const testSongData = songs;
    testSongData.songs.push({ id: 0, name: "test song", albumId: 1 });
    localStorage.setItem("albums", JSON.stringify(testAlbumData));
    localStorage.setItem("songs", JSON.stringify(testSongData));
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
          {isEmpty && <p>You have no releases!</p>}
          {albumTree.map(({ album, songs }: any) => (
            <div key={album.id} className="release-group">
              <div
                className={`release-item ${selected?.type === "album" && selected.id === album.id ? "selected" : ""}`}
                onClick={() => setSelected({ type: "album", id: album.id })}
              >
                {album.name}
              </div>
              {songs.map((song: any) => (
                <div
                  key={song.id}
                  className={`release-item song-item ${selected?.type === "song" && selected.id === song.id ? "selected" : ""}`}
                  onClick={() => setSelected({ type: "song", id: song.id })}
                >
                  {song.name}
                </div>
              ))}
            </div>
          ))}

          {singles.length > 0 && (
            <div className="release-group">
              <div className="release-item singles-label">Singles</div>
              {singles.map((song: any) => (
                <div
                  key={song.id}
                  className="release-item song-item"
                  onClick={() => setSelected({ type: "song", id: song.id })}
                >
                  {song.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="current">
          Also imagine this shows the currently selected song &#40;lyrics and
          shit&#41;
        </div>
      </div>
    </>
  );
}
