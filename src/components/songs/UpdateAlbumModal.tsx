type UpdateAlbumModalProps = {
  albumName: string;
  releaseDate: string;
  err: string;
  onClose: () => void;
  onAlbumNameChange: (value: string) => void;
  onReleaseDateChange: (value: string) => void;
  onSubmit: () => void;
};

export default function UpdateAlbumModal({
  albumName,
  releaseDate,
  err,
  onClose,
  onAlbumNameChange,
  onReleaseDateChange,
  onSubmit,
}: UpdateAlbumModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Edit Album</h3>
        <input
          type="text"
          placeholder="Album Name"
          value={albumName}
          onChange={(e) => onAlbumNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Release Date"
          value={releaseDate}
          onChange={(e) => onReleaseDateChange(e.target.value)}
        />
        <button className="submit" onClick={onSubmit}>
          Save Album
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
