type DeleteSectionModalProps = {
  sectionName: string;
  err: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function DeleteSectionModal({
  sectionName,
  err,
  onClose,
  onSubmit,
}: DeleteSectionModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Delete Section</h3>
        <p>Delete {sectionName}?</p>
        <button className="submit" onClick={onSubmit}>
          Delete Section
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
