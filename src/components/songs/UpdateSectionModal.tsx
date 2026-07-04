type UpdateSectionModalProps = {
  sectionName: string;
  sectionContent: string;
  err: string;
  onClose: () => void;
  onSectionNameChange: (value: string) => void;
  onSectionContentChange: (value: string) => void;
  onSubmit: () => void;
};

export default function UpdateSectionModal({
  sectionName,
  sectionContent,
  err,
  onClose,
  onSectionNameChange,
  onSectionContentChange,
  onSubmit,
}: UpdateSectionModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Edit Section</h3>
        <input
          type="text"
          placeholder="Section Name"
          value={sectionName}
          onChange={(e) => onSectionNameChange(e.target.value)}
        />
        <textarea
          rows={10}
          placeholder="Content"
          value={sectionContent}
          onChange={(e) => onSectionContentChange(e.target.value)}
        ></textarea>
        <button className="submit" onClick={onSubmit}>
          Save Section
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
