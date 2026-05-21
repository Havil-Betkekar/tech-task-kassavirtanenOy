import { useEffect, useState } from "react";
import {
  MOCK_PROJECTS,
  MOCK_USERS,
  STATUSES,
  TASK_TYPES,
} from "../api/mockApi";
// import TaskCard from "./TaskCard";
import "./TaskDashboard.css";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksRequest,
  fetchUsersRequest,
  fetchProjectsRequest,
  deleteTaskRequest,
  openTaskForm,
  closeTaskForm,
  setFilters,
  clearFilters,
} from "../store/actions/actions";

import {
  selectFilteredTasks,
  selectLoadingTasks,
  selectTasksError,
  selectIsFormOpen,
  selectFiltersState,
} from "../store/selectors/taskSelectors";

const TaskDashboard = () => {
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // hardcoded for now, will come from Redux later
  // const tasks = [
  //   {
  //     id: "1",
  //     title: "Fix login bug",
  //     description: "Users cannot login with special characters in password",
  //     taskType: "Bug",
  //     priority: "High",
  //     status: "In Progress",
  //     assigneeId: "1",
  //     dueDate: "2024-02-15",
  //     severity: "Medium",
  //     subtasks: [
  //       { id: "sub1", completed: true },
  //       { id: "sub2", completed: false },
  //     ],
  //   },
  // ];

  const dispatch = useDispatch();

  // ─── Selectors ────────────────────────────────────────────
  const tasks = useSelector(selectFilteredTasks);
  const loading = useSelector(selectLoadingTasks);
  const error = useSelector(selectTasksError);
  const isFormOpen = useSelector(selectIsFormOpen);
  const filters = useSelector(selectFiltersState);
  const projects = useSelector((state) =>
    Object.values(state.entities.projects.byId),
  );
  const users = useSelector((state) =>
    Object.values(state.entities.users.byId),
  );

  // ─── Fetch data on mount ──────────────────────────────────
  useEffect(() => {
    dispatch(fetchTasksRequest());
    dispatch(fetchUsersRequest());
    dispatch(fetchProjectsRequest());
  }, [dispatch]);

  // ─── Handlers ─────────────────────────────────────────────
  const handleFilterChange = (filterKey, value) => {
    dispatch(setFilters({ [filterKey]: value || null }));
  };

  const handleStatusChange = (value) => {
    dispatch(setFilters({ status: value || "all" }));
  };

  const handleTaskTypeChange = (value) => {
    dispatch(setFilters({ taskType: value || "all" }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTaskRequest(taskId));
  };

  const isFiltersActive =
    filters.project ||
    filters.assignee ||
    filters.status !== "all" ||
    filters.taskType !== "all";
  return (
    <>
      <div className="dashboard-wrapper">
        {/* Header code*/}
        <div className="dashboard-header card">
          <h1 className="dashboard-title">Task Management Dashboard</h1>
          <button
            className="btn-create"
            onClick={() => dispatch(openTaskForm())}
          >
            + Create Task
          </button>
        </div>
        {/* Header code*/}

        {/* Filter code */}
        <div className="filter-bar card">
          <input
            type="text"
            className="filter-search"
            placeholder="Search tasks..."
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          <select
            className="filter-select"
            value={filters.project || ""}
            onChange={(e) => handleFilterChange("project", e.target.value)}
          >
            <option value="">All Projects</option>
            {MOCK_PROJECTS.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.assignee || ""}
            onChange={(e) => handleFilterChange("assignee", e.target.value)}
          >
            <option value="">All Assignees</option>
            {MOCK_USERS.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.status === "all" ? "" : filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="">All Statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.taskType === "all" ? "" : filters.taskType}
            onChange={(e) => handleTaskTypeChange(e.target.value)}
          >
            <option value="">All Types</option>
            {TASK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            c
            className={`btn-clear-filters ${isFiltersActive ? "active" : ""}`}
            onClick={handleClearFilters}
            disabled={!isFiltersActive}
          >
            Clear Filters
          </button>
        </div>
        {/* Error state */}
        {error && <div className="error-banner">{error}</div>}
        {/* Filter code */}
        {/* card  */}

        <TaskList
          tasks={tasks}
          loading={loading}
          onEditTask={(id) => console.log("edit", id)}
          onDeleteTask={handleDeleteTask}
        />
        {/* card  */}
        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={() => dispatch(closeTaskForm())}
        />
      </div>
    </>
  );
};

export default TaskDashboard;
