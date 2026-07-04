import type { Album, Section, Selection, Song } from "./types";

type CurrentPanelProps = {
  selected: Selection;
  albums: Album[];
  songs: Song[];
  onSongSelect: (songId: string) => void;
  onAddSection: () => void;
  onEditAlbum: (album: Album) => void;
  onDeleteAlbum: (album: Album) => void;
  onEditSong: (song: Song) => void;
  onDeleteSong: (song: Song) => void;
  onEditSection: (sectionIndex: number, section: Section) => void;
  onDeleteSection: (sectionIndex: number, section: Section) => void;
};

export default function CurrentPanel({
  selected,
  albums,
  songs,
  onSongSelect,
  onAddSection,
  onEditAlbum,
  onDeleteAlbum,
  onEditSong,
  onDeleteSong,
  onEditSection,
  onDeleteSection,
}: CurrentPanelProps) {
  if (!selected)
    return (
      <p className="muted">Select an album or song to see its information</p>
    );

  if (selected.type === "album") {
    const album = albums.find((a) => a.id === selected.id);
    if (!album) return null;
    const albumSongs = songs.filter((s) => s.albumId === album.id);
    return (
      <div className="cur-view">
        <div className="crud">
          <button className="crud-btn" onClick={() => onEditAlbum(album)}>
            Edit
          </button>
          <button className="crud-btn" onClick={() => onDeleteAlbum(album)}>
            Delete
          </button>
        </div>
        <h2 className="view-title">{album.name}</h2>
        <div className="view-info">
          <p className="info">{album.releaseDate}</p>
        </div>
        <h3>Tracklist:</h3>
        <ul>
          {albumSongs.map((s) => (
            <li key={s.id} onClick={() => onSongSelect(s.id)}>
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
    <div className="cur-view">
      <div className="crud">
        <button className="crud-btn" onClick={() => onEditSong(song)}>
          Edit
        </button>
        <button className="crud-btn" onClick={() => onDeleteSong(song)}>
          Delete
        </button>
      </div>
      <h2 className="view-title">{song.name}</h2>
      <div className="view-info">
        <p className="info">Key: {song.key}</p>
        <p className="info">{song.tempo} BPM</p>
      </div>
      <div className="sections">
        {song.sections.map((sec, index) => (
          <div className="section" key={sec.order}>
            <div className="crud">
              <button
                className="crud-btn"
                onClick={() => onEditSection(index, sec)}
              >
                Edit
              </button>
              <button
                className="crud-btn"
                onClick={() => onDeleteSection(index, sec)}
              >
                Delete
              </button>
            </div>
            <p className="sec-name">{sec.name.toUpperCase()}</p>
            <p className="sec-content">{sec.content}</p>
          </div>
        ))}
        {song.sections.length === 0 ? (
          <>
            <h4>This song has no sections yet.</h4>
            <button className="add-sec" onClick={onAddSection}>
              Add a section
            </button>
          </>
        ) : (
          <button className="add-sec non-empty" onClick={onAddSection}>
            +
          </button>
        )}
      </div>
    </div>
  );
}
