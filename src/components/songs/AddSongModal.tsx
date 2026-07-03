import type { Album } from "./types";

type AddSongModalProps = {
  albums: Album[];
  newSongName: string;
  newSongKey: string;
  newSongTempo: string;
  err: string;
  onClose: () => void;
  onSongNameChange: (value: string) => void;
  onSongKeyChange: (value: string) => void;
  onSongTempoChange: (value: string) => void;
  onAlbumChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AddSongModal({
  albums,
  newSongName,
  newSongKey,
  newSongTempo,
  err,
  onClose,
  onSongNameChange,
  onSongKeyChange,
  onSongTempoChange,
  onAlbumChange,
  onSubmit,
}: AddSongModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Add Song</h3>
        <input
          type="text"
          placeholder="Song Name"
          value={newSongName}
          onChange={(e) => onSongNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Key"
          value={newSongKey}
          onChange={(e) => onSongKeyChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tempo"
          value={newSongTempo}
          onChange={(e) => onSongTempoChange(e.target.value)}
        />
        <select
          name="newAlbumId"
          id="newAlbumId"
          onChange={(e) => onAlbumChange(e.target.value)}
        >
          <option value="">Single</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>
        <button className="submit" onClick={onSubmit}>
          Add Song
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
