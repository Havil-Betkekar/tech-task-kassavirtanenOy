import { useState } from "react";
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

const TaskDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // hardcoded for now, will come from Redux later
  const tasks = [
    {
      id: "1",
      title: "Fix login bug",
      description: "Users cannot login with special characters in password",
      taskType: "Bug",
      priority: "High",
      status: "In Progress",
      assigneeId: "1",
      dueDate: "2024-02-15",
      severity: "Medium",
      subtasks: [
        { id: "sub1", completed: true },
        { id: "sub2", completed: false },
      ],
    },
  ];
  const handleCreateTask = async (data) => {
    console.log("New task data:", data); // will replace with Redux dispatch later
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Header code*/}
        <div className="dashboard-header card">
          <h1 className="dashboard-title">Task Management Dashboard</h1>
          <button className="btn-create" onClick={() => setIsFormOpen(true)}>
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
        {/* Filter code */}
        {/* card  */}

        <TaskList
          tasks={tasks}
          onEditTask={(id) => console.log("edit", id)}
          onDeleteTask={(id) => console.log("delete", id)}
        />
        {/* card  */}
        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateTask}
        />
      </div>
    </>
  );
};

export default TaskDashboard;
