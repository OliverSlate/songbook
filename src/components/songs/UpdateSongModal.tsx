import type { Album } from "./types";

type UpdateSongModalProps = {
  albums: Album[];
  songName: string;
  songKey: string;
  songTempo: string;
  albumId: string | null;
  err: string;
  onClose: () => void;
  onSongNameChange: (value: string) => void;
  onSongKeyChange: (value: string) => void;
  onSongTempoChange: (value: string) => void;
  onAlbumChange: (value: string | null) => void;
  onSubmit: () => void;
};

export default function UpdateSongModal({
  albums,
  songName,
  songKey,
  songTempo,
  albumId,
  err,
  onClose,
  onSongNameChange,
  onSongKeyChange,
  onSongTempoChange,
  onAlbumChange,
  onSubmit,
}: UpdateSongModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Edit Song</h3>
        <input
          type="text"
          placeholder="Song Name"
          value={songName}
          onChange={(e) => onSongNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Key"
          value={songKey}
          onChange={(e) => onSongKeyChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tempo"
          value={songTempo}
          onChange={(e) => onSongTempoChange(e.target.value)}
        />
        <select
          name="editAlbumId"
          id="editAlbumId"
          value={albumId ?? ""}
          onChange={(e) => onAlbumChange(e.target.value || null)}
        >
          <option value="">Single</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>
        <button className="submit" onClick={onSubmit}>
          Save Song
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
