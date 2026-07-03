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
  tempo: string;
  albumId: string | null;
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
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newRelDate, setNewRelDate] = useState("");

  const [showAddSong, setShowAddSong] = useState(false);
  const [newSongName, setNewSongName] = useState("");
  const [newSongKey, setNewSongKey] = useState("");
  const [newSongTempo, setNewSongTempo] = useState<string>("");
  const [newAlbumId, setNewAlbumId] = useState<string | null>(null);

  const [showAddSec, setShowAddSec] = useState(false);
  const [newSecName, setNewSecName] = useState("");
  const [newSecContent, setNewSecContent] = useState("");

  const [err, setErr] = useState("");

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
    if (newSongName === "") {
      setErr("Song name can't be empty.");
      return;
    }
    const newSong: Song = {
      id: crypto.randomUUID(),
      name: newSongName,
      key: newSongKey,
      tempo: newSongTempo,
      albumId: newAlbumId,
      sections: [],
    };
    setSongs((prev: any) => {
      const updated = { ...prev, songs: [...prev.songs, newSong] };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });
    setNewSongName("");
    setNewSongKey("");
    setNewSongTempo("");
    setErr("");
    setShowAddSong(false);
  }
  function addSection({
    selected,
    songs,
  }: {
    selected: Selection;
    songs: Song[];
  }) {
    if (newSecName === "") {
      setErr("Name can't be empty.");
      return;
    }
    setSongs((prev: { songs: Song[] }) => {
      const updatedSongs = prev.songs.map((s: Song) => {
        if (s.id !== selected?.id) return s;
        const newSection: Section = {
          order: s.sections.length,
          name: newSecName,
          content: newSecContent,
        };
        return { ...s, sections: [...s.sections, newSection] };
      });

      const updated = { songs: updatedSongs };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });

    setNewSecName("");
    setNewSecContent("");
    setErr("");
    setShowAddSec(false);
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
              <p className="sec-name">{sec.name.toUpperCase()}</p>
              <p className="sec-content">{sec.content}</p>
            </div>
          ))}
          {song.sections.length === 0 ? (
            <>
              <h4>This song has no sections yet.</h4>
              <button className="add-sec" onClick={() => setShowAddSec(true)}>
                Add a section
              </button>
            </>
          ) : (
            <button
              className="add-sec non-empty"
              onClick={() => setShowAddSec(true)}
            >
              +
            </button>
          )}
        </div>
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
          <button id="add-song" onClick={() => setShowAddSong(true)}>
            Add Song
          </button>
        </div>
        {showAddSong && (
          <div className="vignette">
            <div className="view">
              <button
                className="exit"
                onClick={() => {
                  setShowAddSong(false);
                }}
              >
                X
              </button>
              <h3>Add Song</h3>
              <input
                type="text"
                placeholder="Song Name"
                value={newSongName}
                onChange={(e) => setNewSongName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Key"
                value={newSongKey}
                onChange={(e) => setNewSongKey(e.target.value)}
              />
              <input
                type="number"
                placeholder="Tempo"
                value={newSongTempo}
                onChange={(e) => setNewSongTempo(e.target.value)}
              />
              <select
                name="newAlbumId"
                id="newAlbumId"
                onChange={(e) => setNewAlbumId(e.target.value)}
              >
                <option value="">Single</option>
                {albums.albums.map((album: Album) => (
                  <option key={album.id} value={album.id}>
                    {album.name}
                  </option>
                ))}
              </select>
              <button className="submit" onClick={() => addSong()}>
                Add Song
              </button>
              <p>{err}</p>
            </div>
          </div>
        )}
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
                    {song.name}
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
                  className={`release-item song-item ${selected?.type === "song" && selected.id === song.id ? "selected" : ""}`}
                  onClick={() => {
                    if (song.id === selected?.id && selected?.type === "song") {
                      setSelected(null);
                    } else setSelected({ type: "song", id: song.id });
                  }}
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
            <p>{err}</p>
          </div>
        </div>
      )}
    </>
  );
}
