import {
  MOCK_PROJECTS,
  MOCK_USERS,
  STATUSES,
  TASK_TYPES,
} from "../api/mockApi";
import "./TaskDashoard.css";

const TaskDashboard = () => {
  return (
    <>
      <div className="dashboard-wrapper">
        {/* Header code*/}
        <div className="dashboard-header card">
          <h1 className="dashboard-title">Task Management Dashboard</h1>
          <button className="btn-create">+ Create Task</button>
        </div>
        {/* Header code*/}

        <div className="filter-bar card">
          <input
            type="text"
            className="filter-search"
            placeholder="Search tasks..."
          />

          <select className="filter-select">
            <option value="">All Projects</option>
            {MOCK_PROJECTS.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <select className="filter-select">
            <option value="">All Assignees</option>
            {MOCK_USERS.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <select className="filter-select">
            <option value="">All Statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select className="filter-select">
            <option value="">All Types</option>
            {TASK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button className="btn-clear-filters" disabled>
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskDashboard;
