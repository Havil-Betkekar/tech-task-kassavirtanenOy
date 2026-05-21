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
      </div>
    </>
  );
};

export default TaskDashboard;
