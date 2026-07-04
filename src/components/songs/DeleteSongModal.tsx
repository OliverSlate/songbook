type DeleteSongModalProps = {
  songName: string;
  err: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function DeleteSongModal({
  songName,
  err,
  onClose,
  onSubmit,
}: DeleteSongModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Delete Song</h3>
        <p>Delete {songName}?</p>
        <button className="submit" onClick={onSubmit}>
          Delete Song
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
