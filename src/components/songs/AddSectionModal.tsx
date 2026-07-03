type AddSectionModalProps = {
  newSecName: string;
  newSecContent: string;
  err: string;
  onClose: () => void;
  onSectionNameChange: (value: string) => void;
  onSectionContentChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AddSectionModal({
  newSecName,
  newSecContent,
  err,
  onClose,
  onSectionNameChange,
  onSectionContentChange,
  onSubmit,
}: AddSectionModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Add Section</h3>
        <input
          type="text"
          placeholder="Section Name"
          value={newSecName}
          onChange={(e) => onSectionNameChange(e.target.value)}
        />
        <textarea
          rows={10}
          placeholder="Content"
          value={newSecContent}
          onChange={(e) => onSectionContentChange(e.target.value)}
        ></textarea>
        <button className="submit" onClick={onSubmit}>
          Add Section
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
