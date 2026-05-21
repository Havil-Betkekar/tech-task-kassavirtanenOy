import "./TaskCard.css";
const BADGE_COLORS = {
  Bug: "#ef4444",
  Feature: "#3b82f6",
  Enhancement: "#8b5cf6",
  Research: "#f59e0b",
};

const PRIORITY_COLORS = {
  Low: "#22c55e",
  Medium: "#f59e0b",
  High: "#ef4444",
  Critical: "#7f1d1d",
};
const TaskCard = ({ task, onEdit, onDelete }) => {
  const badgeColor = BADGE_COLORS[task.taskType] || "#6b7280";
  const priorityColor = PRIORITY_COLORS[task.priority] || "#6b7280";

  const isDueDateOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <>
      <div className="task-card" style={{ borderLeftColor: badgeColor }}>
        {/* Top Row */}
        <div className="task-card-top">
          <div className="task-card-badges">
            <span
              className="task-badge"
              style={{ backgroundColor: badgeColor }}
            >
              {task.taskType}
            </span>
            <span className="task-status">{task.status}</span>
          </div>
          <div className="task-card-actions">
            <button className="btn-icon" onClick={onEdit}>
              ✏️
            </button>
            <button className="btn-icon" onClick={onDelete}>
              🗑️
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="task-title">{task.title}</h3>

        {/* Description */}
        <p className="task-description">{task.description}</p>

        {/* Type specific fields */}
        {task.taskType === "Bug" && task.severity && (
          <p className="task-meta">
            Severity: <span style={{ color: "#f59e0b" }}>{task.severity}</span>
          </p>
        )}

        {task.taskType === "Feature" && task.acceptanceCriteria && (
          <p className="task-meta">
            Acceptance Criteria: {task.acceptanceCriteria.length} items
          </p>
        )}

        {/* Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && (
          <p className="task-meta">
            Subtasks: {task.subtasks.filter((s) => s.completed).length}/
            {task.subtasks.length}
          </p>
        )}

        {/* Bottom Row */}
        <div className="task-card-bottom">
          <span className="task-assignee">
            Assigned to:{" "}
            {task.assigneeId ? `User ${task.assigneeId}` : "Unassigned"}
          </span>
          {task.dueDate && (
            <span
              className="task-due-date"
              style={{ color: isDueDateOverdue ? "#ef4444" : "#6b7280" }}
            >
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          <span className="task-priority" style={{ color: priorityColor }}>
            Priority: {task.priority}
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
