import { useMemo, useState } from "react";
import AddAlbumModal from "./songs/AddAlbumModal";
import AddSectionModal from "./songs/AddSectionModal";
import AddSongModal from "./songs/AddSongModal";
import CurrentPanel from "./songs/CurrentPanel";
import DeleteAlbumModal from "./songs/DeleteAlbumModal";
import DeleteSectionModal from "./songs/DeleteSectionModal";
import DeleteSongModal from "./songs/DeleteSongModal";
import ReleasesList from "./songs/ReleasesList";
import SongsHeader from "./songs/SongsHeader";
import UpdateAlbumModal from "./songs/UpdateAlbumModal";
import UpdateSectionModal from "./songs/UpdateSectionModal";
import UpdateSongModal from "./songs/UpdateSongModal";
import type { Album, Selection, Section, Song } from "./songs/types";

/*
  July 3, 2026 @ 10:56 PM
  Dear developers or otherwise curious people looking into my code
  This file once was over twice as long and containted 80% of the app in a gigantic hierarchical mess
  This is my message - don't be like me, write good code from the start, so you dont have to restructure the entire app
  because you're unable to read the code anymore. Cheers
*/

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
  const [showUpdateAlbum, setShowUpdateAlbum] = useState(false);
  const [showDeleteAlbum, setShowDeleteAlbum] = useState(false);
  const [editAlbumName, setEditAlbumName] = useState("");
  const [editRelDate, setEditRelDate] = useState("");

  const [showAddSong, setShowAddSong] = useState(false);
  const [newSongName, setNewSongName] = useState("");
  const [newSongKey, setNewSongKey] = useState("");
  const [newSongTempo, setNewSongTempo] = useState<string>("");
  const [newAlbumId, setNewAlbumId] = useState<string | null>(null);
  const [showUpdateSong, setShowUpdateSong] = useState(false);
  const [showDeleteSong, setShowDeleteSong] = useState(false);
  const [editSongName, setEditSongName] = useState("");
  const [editSongKey, setEditSongKey] = useState("");
  const [editSongTempo, setEditSongTempo] = useState("");
  const [editAlbumId, setEditAlbumId] = useState<string | null>(null);

  const [showAddSec, setShowAddSec] = useState(false);
  const [newSecName, setNewSecName] = useState("");
  const [newSecContent, setNewSecContent] = useState("");
  const [showUpdateSec, setShowUpdateSec] = useState(false);
  const [showDeleteSec, setShowDeleteSec] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(
    null,
  );
  const [editSecName, setEditSecName] = useState("");
  const [editSecContent, setEditSecContent] = useState("");

  const [err, setErr] = useState("");
  function deleteAlbum() {
    if (selected?.type !== "album") return;
    const albumId = selected.id;
    setAlbums((prev: { albums: Album[] }) => {
      const updated = {
        ...prev,
        albums: prev.albums.filter((album) => album.id !== albumId),
      };
      localStorage.setItem("albums", JSON.stringify(updated));
      return updated;
    });
    setSongs((prev: { songs: Song[] }) => {
      const updated = {
        songs: prev.songs.map((song) =>
          song.albumId === albumId ? { ...song, albumId: null } : song,
        ),
      };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });
    setSelected(null);
    setErr("");
    setShowDeleteAlbum(false);
  }

  function updateAlbum() {
    if (selected?.type !== "album") return;
    if (editAlbumName === "" || editRelDate === "") {
      setErr("All fields must be non-empty.");
      return;
    }
    setAlbums((prev: { albums: Album[] }) => {
      const updated = {
        ...prev,
        albums: prev.albums.map((album) =>
          album.id === selected.id
            ? { ...album, name: editAlbumName, releaseDate: editRelDate }
            : album,
        ),
      };
      localStorage.setItem("albums", JSON.stringify(updated));
      return updated;
    });
    setEditAlbumName("");
    setEditRelDate("");
    setErr("");
    setShowUpdateAlbum(false);
  }

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
  function deleteSong() {
    if (selected?.type !== "song") return;
    const songId = selected.id;
    setSongs((prev: { songs: Song[] }) => {
      const updated = {
        songs: prev.songs.filter((song) => song.id !== songId),
      };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });
    setSelected(null);
    setErr("");
    setShowDeleteSong(false);
  }

  function updateSong() {
    if (selected?.type !== "song") return;
    if (editSongName === "") {
      setErr("Song name can't be empty.");
      return;
    }
    setSongs((prev: { songs: Song[] }) => {
      const updated = {
        songs: prev.songs.map((song) =>
          song.id === selected.id
            ? {
                ...song,
                name: editSongName,
                key: editSongKey,
                tempo: editSongTempo,
                albumId: editAlbumId,
              }
            : song,
        ),
      };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });
    setEditSongName("");
    setEditSongKey("");
    setEditSongTempo("");
    setEditAlbumId(null);
    setErr("");
    setShowUpdateSong(false);
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
  function deleteSection() {
    if (selected?.type !== "song" || activeSectionIndex === null) return;
    setSongs((prev: { songs: Song[] }) => {
      const updatedSongs = prev.songs.map((song) => {
        if (song.id !== selected.id) return song;
        const sections = song.sections
          .filter((_, index) => index !== activeSectionIndex)
          .map((section, index) => ({ ...section, order: index }));
        return {
          ...song,
          sections,
        };
      });

      const updated = { songs: updatedSongs };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });
    setActiveSectionIndex(null);
    setEditSecName("");
    setEditSecContent("");
    setErr("");
    setShowDeleteSec(false);
  }

  function updateSection() {
    if (selected?.type !== "song" || activeSectionIndex === null) return;
    if (editSecName === "") {
      setErr("Name can't be empty.");
      return;
    }
    setSongs((prev: { songs: Song[] }) => {
      const updatedSongs = prev.songs.map((song) => {
        if (song.id !== selected.id) return song;
        return {
          ...song,
          sections: song.sections.map((section, index) =>
            index === activeSectionIndex
              ? { ...section, name: editSecName, content: editSecContent }
              : section,
          ),
        };
      });

      const updated = { songs: updatedSongs };
      localStorage.setItem("songs", JSON.stringify(updated));
      return updated;
    });
    setActiveSectionIndex(null);
    setEditSecName("");
    setEditSecContent("");
    setErr("");
    setShowUpdateSec(false);
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

  function openUpdateAlbum(album: Album) {
    setSelected({ type: "album", id: album.id });
    setEditAlbumName(album.name);
    setEditRelDate(album.releaseDate);
    setErr("");
    setShowUpdateAlbum(true);
  }

  function openDeleteAlbum(album: Album) {
    setSelected({ type: "album", id: album.id });
    setErr("");
    setShowDeleteAlbum(true);
  }

  function openUpdateSong(song: Song) {
    setSelected({ type: "song", id: song.id });
    setEditSongName(song.name);
    setEditSongKey(song.key);
    setEditSongTempo(song.tempo);
    setEditAlbumId(song.albumId);
    setErr("");
    setShowUpdateSong(true);
  }

  function openDeleteSong(song: Song) {
    setSelected({ type: "song", id: song.id });
    setErr("");
    setShowDeleteSong(true);
  }

  function openUpdateSection(sectionIndex: number, section: Section) {
    setActiveSectionIndex(sectionIndex);
    setEditSecName(section.name);
    setEditSecContent(section.content);
    setErr("");
    setShowUpdateSec(true);
  }

  function openDeleteSection(sectionIndex: number, section: Section) {
    setActiveSectionIndex(sectionIndex);
    setEditSecName(section.name);
    setErr("");
    setShowDeleteSec(true);
  }

  const selectedAlbum =
    selected?.type === "album"
      ? albums.albums.find((album) => album.id === selected.id)
      : undefined;
  const selectedSong =
    selected?.type === "song"
      ? songs.songs.find((song) => song.id === selected.id)
      : undefined;
  const activeSection =
    activeSectionIndex !== null
      ? selectedSong?.sections[activeSectionIndex]
      : undefined;

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
            onEditAlbum={openUpdateAlbum}
            onDeleteAlbum={openDeleteAlbum}
            onEditSong={openUpdateSong}
            onDeleteSong={openDeleteSong}
            onEditSection={openUpdateSection}
            onDeleteSection={openDeleteSection}
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
      {showUpdateAlbum && (
        <UpdateAlbumModal
          albumName={editAlbumName}
          releaseDate={editRelDate}
          err={err}
          onClose={() => {
            setShowUpdateAlbum(false);
            setErr("");
          }}
          onAlbumNameChange={setEditAlbumName}
          onReleaseDateChange={setEditRelDate}
          onSubmit={() => updateAlbum()}
        />
      )}
      {showDeleteAlbum && selectedAlbum && (
        <DeleteAlbumModal
          albumName={selectedAlbum.name}
          err={err}
          onClose={() => {
            setShowDeleteAlbum(false);
            setErr("");
          }}
          onSubmit={() => deleteAlbum()}
        />
      )}
      {showUpdateSong && (
        <UpdateSongModal
          albums={albums.albums}
          songName={editSongName}
          songKey={editSongKey}
          songTempo={editSongTempo}
          albumId={editAlbumId}
          err={err}
          onClose={() => {
            setShowUpdateSong(false);
            setErr("");
          }}
          onSongNameChange={setEditSongName}
          onSongKeyChange={setEditSongKey}
          onSongTempoChange={setEditSongTempo}
          onAlbumChange={setEditAlbumId}
          onSubmit={() => updateSong()}
        />
      )}
      {showDeleteSong && selectedSong && (
        <DeleteSongModal
          songName={selectedSong.name}
          err={err}
          onClose={() => {
            setShowDeleteSong(false);
            setErr("");
          }}
          onSubmit={() => deleteSong()}
        />
      )}
      {showUpdateSec && (
        <UpdateSectionModal
          sectionName={editSecName}
          sectionContent={editSecContent}
          err={err}
          onClose={() => {
            setShowUpdateSec(false);
            setErr("");
          }}
          onSectionNameChange={setEditSecName}
          onSectionContentChange={setEditSecContent}
          onSubmit={() => updateSection()}
        />
      )}
      {showDeleteSec && activeSection && (
        <DeleteSectionModal
          sectionName={activeSection.name}
          err={err}
          onClose={() => {
            setShowDeleteSec(false);
            setErr("");
          }}
          onSubmit={() => deleteSection()}
        />
      )}
    </>
  );
}
