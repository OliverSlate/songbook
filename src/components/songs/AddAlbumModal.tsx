type AddAlbumModalProps = {
  newAlbumName: string;
  newRelDate: string;
  err: string;
  onClose: () => void;
  onAlbumNameChange: (value: string) => void;
  onReleaseDateChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AddAlbumModal({
  newAlbumName,
  newRelDate,
  err,
  onClose,
  onAlbumNameChange,
  onReleaseDateChange,
  onSubmit,
}: AddAlbumModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Add Album</h3>
        <input
          type="text"
          placeholder="Album Name"
          value={newAlbumName}
          onChange={(e) => onAlbumNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Release Date"
          value={newRelDate}
          onChange={(e) => onReleaseDateChange(e.target.value)}
        />

        <button className="submit" onClick={onSubmit}>
          Add Album
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
