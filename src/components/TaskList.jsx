import TaskCard from "./TaskCard";
import "./TaskList.css";

const TaskList = ({
  tasks = [],
  loading = false,
  onEditTask,
  onDeleteTask,
}) => {
  if (loading) {
    return (
      <div className="card task-list-loading">
        <div className="loading-spinner">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card task-list-empty">
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }
  return (
    <>
      <div className="card">
        <h2 className="task-list-title">Tasks ({tasks.length})</h2>
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;
