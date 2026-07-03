type TodoHeaderProps = {
  onAddTask: () => void;
};

export default function TodoHeader({ onAddTask }: TodoHeaderProps) {
  return (
    <div className="header">
      <p>To-do</p>
      <div className="controls">
        <button id="add-task" onClick={onAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
}
