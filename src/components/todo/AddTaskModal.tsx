type AddTaskModalProps = {
  taskTitle: string;
  taskContent: string;
  err: string;
  onClose: () => void;
  onTaskTitleChange: (value: string) => void;
  onTaskContentChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AddTaskModal({
  taskTitle,
  taskContent,
  err,
  onClose,
  onTaskTitleChange,
  onTaskContentChange,
  onSubmit,
}: AddTaskModalProps) {
  return (
    <div className="vignette">
      <div className="view">
        <button className="exit" onClick={onClose}>
          X
        </button>
        <h3>Add Task</h3>
        <input
          type="text"
          placeholder="Song name / Title"
          value={taskTitle}
          onChange={(e) => onTaskTitleChange(e.target.value)}
        />
        <textarea
          rows={10}
          placeholder="Content"
          value={taskContent}
          onChange={(e) => onTaskContentChange(e.target.value)}
        ></textarea>
        <button className="submit" onClick={onSubmit}>
          Add Task
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
}
