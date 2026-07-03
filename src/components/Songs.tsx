import { useMemo, useState } from "react";
import AddAlbumModal from "./songs/AddAlbumModal";
import AddSectionModal from "./songs/AddSectionModal";
import AddSongModal from "./songs/AddSongModal";
import CurrentPanel from "./songs/CurrentPanel";
import ReleasesList from "./songs/ReleasesList";
import SongsHeader from "./songs/SongsHeader";
import type { Album, Selection, Section, Song } from "./songs/types";

export default function Songs() {
  const [albums, setAlbums] = useState<{ albums: Album[] }>(() => {
    const stored = localStorage.getItem("albums");
    return stored ? JSON.parse(stored) : { albums: [] };
  });
  const [songs, setSongs] = useState<{ songs: Song[] }>(() => {
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
    //temporary my ass
    if (newAlbumName === "" || newRelDate === "") {
      setErr("All fields must be non-empty.");
      return;
    }
    const newAlbum: Album = {
      id: crypto.randomUUID(),
      name: newAlbumName,
      releaseDate: newRelDate,
    };
    setAlbums((prev: { albums: Album[] }) => {
      const updated = { ...prev, albums: [...prev.albums, newAlbum] };
      localStorage.setItem("albums", JSON.stringify(updated));
      return updated;
    });
    setNewAlbumName("");
    setNewRelDate("");
    setErr("");
    setShowAddAlbum(false);
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
    setSongs((prev: { songs: Song[] }) => {
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

  function addSection({ selected }: { selected: Selection }) {
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

  function selectAlbum(albumId: string) {
    if (albumId === selected?.id && selected?.type === "album") {
      setSelected(null);
    } else setSelected({ type: "album", id: albumId });
  }

  function selectSong(songId: string) {
    if (songId === selected?.id && selected?.type === "song") {
      setSelected(null);
    } else setSelected({ type: "song", id: songId });
  }

  return (
    <>
      <SongsHeader
        onAddAlbum={() => setShowAddAlbum(true)}
        onAddSong={() => setShowAddSong(true)}
      >
        {showAddSong && (
          <AddSongModal
            albums={albums.albums}
            newSongName={newSongName}
            newSongKey={newSongKey}
            newSongTempo={newSongTempo}
            err={err}
            onClose={() => {
              setShowAddSong(false);
            }}
            onSongNameChange={setNewSongName}
            onSongKeyChange={setNewSongKey}
            onSongTempoChange={setNewSongTempo}
            onAlbumChange={setNewAlbumId}
            onSubmit={() => addSong()}
          />
        )}
        {showAddAlbum && (
          <AddAlbumModal
            newAlbumName={newAlbumName}
            newRelDate={newRelDate}
            err={err}
            onClose={() => {
              setShowAddAlbum(false);
            }}
            onAlbumNameChange={setNewAlbumName}
            onReleaseDateChange={setNewRelDate}
            onSubmit={() => addAlbum()}
          />
        )}
      </SongsHeader>
      <div className="songs">
        <ReleasesList
          isEmpty={isEmpty}
          albumTree={albumTree}
          singles={singles}
          selected={selected}
          onAlbumSelect={selectAlbum}
          onSongSelect={selectSong}
        />
        <div className="current">
          <CurrentPanel
            selected={selected}
            albums={albums.albums}
            songs={songs.songs}
            onSongSelect={(songId) => setSelected({ type: "song", id: songId })}
            onAddSection={() => setShowAddSec(true)}
          />
        </div>
      </div>
      {showAddSec && (
        <AddSectionModal
          newSecName={newSecName}
          newSecContent={newSecContent}
          err={err}
          onClose={() => {
            setShowAddSec(false);
          }}
          onSectionNameChange={setNewSecName}
          onSectionContentChange={setNewSecContent}
          onSubmit={() => addSection({ selected })}
        />
      )}
    </>
  );
}
