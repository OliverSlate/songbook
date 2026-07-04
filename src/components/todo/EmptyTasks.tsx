type EmptyTasksProps = {
  onAddTask: () => void;
};

export default function EmptyTasks({ onAddTask }: EmptyTasksProps) {
  return (
    <div className="no-task">
      <h3>You have no tasks!</h3>
      <button id="add-task" onClick={onAddTask}>
        Add Task
      </button>
    </div>
  );
}
