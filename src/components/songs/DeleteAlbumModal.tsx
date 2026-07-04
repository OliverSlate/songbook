type DeleteAlbumModalProps = {
  albumName: string;
  err: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function DeleteAlbumModal({
  albumName,
  err,
  onClose,
  onSubmit,
}: DeleteAlbumModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Delete Album</h3>
        <p>Delete {albumName}?</p>
        <button className="submit" onClick={onSubmit}>
          Delete Album
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
