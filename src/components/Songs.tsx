import { useState, useMemo } from "react";

type Selection = { type: "album" | "song"; id: string } | null;
type Album = {
  id: string;
  name: string;
  releaseDate: string;
};
type Song = {
  id: string;
  name: string;
  key: string;
  tempo: number;
  albumId: string;
  sections: Section[];
};
type Section = {
  order: number | undefined;
  name: string;
  content: string;
};

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
      albums.albums.map((album: Album) => ({
        album,
        songs: songs.songs.filter((s: Song) => s.albumId === album.id),
      })),
    [albums, songs],
  );

  const singles = useMemo(
    () => songs.songs.filter((s: Song) => s.albumId === null),
    [songs],
  );

  const [showAddSec, setShowAddSec] = useState(false);
  const [newSecName, setNewSecName] = useState("");
  const [newSecContent, setNewSecContent] = useState("");

  function addAlbum() {
    /* 
      THIS FUNCTION IS TEMPORARY FOR DEVELOPMENT PURPOSES AND TESTING
    */
    const newAlbum: Album = {
      id: "0",
      name: "test album",
      releaseDate: "2026",
    };
    setAlbums((prev: any) => {
      const updated = { ...prev, albums: [...prev.albums, newAlbum] };
      localStorage.setItem("albums", JSON.stringify(updated));
      return updated;
    });
  }
  function addSong() {
    const newSong: Song = {
      id: crypto.randomUUID(),
      name: "test song",
      key: "C minor",
      tempo: 174,
      albumId: "0",
      sections: [],
    };
    setSongs((prev: any) => {
      const updated = { ...prev, songs: [...prev.songs, newSong] };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });
  }
  function addSection({
    selected,
    songs,
  }: {
    selected: Selection;
    songs: Song[];
  }) {
    const song = songs.find((s: Song) => s.id === selected?.id);
    const newSection: Section = {
      order: song?.sections.length,
      name: newSecName,
      content: newSecContent,
    };
    console.log(newSection);
  }
  function CurrentPanel({
    selected,
    albums,
    songs,
  }: {
    selected: Selection;
    albums: Album[];
    songs: Song[];
  }) {
    if (!selected)
      return (
        <p className="muted">Select an album or song to see its information</p>
      );

    if (selected.type === "album") {
      const album = albums.find((a) => a.id === selected.id);
      if (!album) return null;
      const albumSongs = songs.filter((s) => s.albumId === album.id);
      return (
        <div>
          <h2 className="view-title">{album.name}</h2>
          <div className="view-info">
            <p className="info">{album.releaseDate}</p>
          </div>
          <h3>Tracklist:</h3>
          <ul>
            {albumSongs.map((s) => (
              <li
                key={s.id}
                onClick={() => setSelected({ type: "song", id: s.id })}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    const song = songs.find((s) => s.id === selected.id);
    if (!song) return null;
    return (
      <div>
        <h2 className="view-title">{song.name}</h2>
        <div className="view-info">
          <p className="info">Key: {song.key}</p>
          <p className="info">{song.tempo} BPM</p>
        </div>
        <div className="sections">
          {song.sections.map((sec) => (
            <div className="section" key={sec.order}>
              {sec.name}
            </div>
          ))}
          {song.sections.length === 0 ? (
            <>
              <h4>This song has no sections yet.</h4>
              <button className="add-sec" onClick={() => setShowAddSec(true)}>
                Add a section
              </button>
            </>
          ) : null}
        </div>
        {showAddSec && (
          <div className="vignette">
            <div className="view">
              <button
                className="exit"
                onClick={() => {
                  setShowAddSec(false);
                }}
              >
                X
              </button>
              <h3>Add Section</h3>
              <input
                type="text"
                placeholder="Section Name"
                value={newSecName}
                onChange={(e) => setNewSecName(e.target.value)}
              />
              <textarea
                rows={10}
                placeholder="Content"
                value={newSecContent}
                onChange={(e) => setNewSecContent(e.target.value)}
              ></textarea>
              <button
                className="submit"
                onClick={() => addSection({ selected, songs })}
              >
                Add Section
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      <div className="header">
        <p>Songs</p>
        <div className="controls">
          <button id="add-album" onClick={addAlbum}>
            Add Album
          </button>
          <button id="add-song" onClick={addSong}>
            Add Song
          </button>
        </div>
      </div>
      <div className="songs">
        <div className="releases">
          {isEmpty && <p>You have no releases!</p>}
          {albumTree.map(
            ({ album, songs }: { album: Album; songs: Song[] }) => (
              <div key={album.id} className="release-group">
                <div
                  className={`release-item ${selected?.type === "album" && selected.id === album.id ? "selected" : ""}`}
                  onClick={() => {
                    if (
                      album.id === selected?.id &&
                      selected?.type === "album"
                    ) {
                      setSelected(null);
                    } else setSelected({ type: "album", id: album.id });
                  }}
                >
                  {album.name}
                </div>
                {songs.map((song: Song) => (
                  <div
                    key={song.id}
                    className={`release-item song-item ${selected?.type === "song" && selected.id === song.id ? "selected" : ""}`}
                    onClick={() => {
                      if (
                        song.id === selected?.id &&
                        selected?.type === "song"
                      ) {
                        setSelected(null);
                      } else setSelected({ type: "song", id: song.id });
                    }}
                  >
                    {song.name}-{song.id}
                  </div>
                ))}
              </div>
            ),
          )}

          {singles.length > 0 && (
            <div className="release-group">
              <div className="release-item singles-label">Singles</div>
              {singles.map((song: Song) => (
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
          <CurrentPanel
            selected={selected}
            albums={albums.albums}
            songs={songs.songs}
          ></CurrentPanel>
        </div>
      </div>
    </>
  );
}
