import { useForm, useFieldArray } from "react-hook-form";
import {
  TASK_TYPES,
  PRIORITIES,
  BUG_SEVERITIES,
  MOCK_USERS,
  MOCK_PROJECTS,
} from "../api/mockApi";
import "./TaskForm.css";

const TaskForm = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      taskType: "Bug",
      priority: "Medium",
      projectId: "",
      assigneeId: "",
      description: "",
      dueDate: "",
      // Bug
      severity: "Medium",
      stepsToReproduce: "",
      // Feature
      businessValue: "",
      acceptanceCriteria: [{ value: "" }],
      // Enhancement
      currentBehavior: "",
      proposedBehavior: "",
      // Research
      researchQuestions: [{ value: "" }],
      expectedOutcomes: "",
      // Subtasks
      subtasks: [],
    },
  });

  const taskType = watch("taskType");
  const projectId = watch("projectId");

  const {
    fields: criteriaFields,
    append: appendCriteria,
    remove: removeCriteria,
  } = useFieldArray({ control, name: "acceptanceCriteria" });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({ control, name: "researchQuestions" });

  const {
    fields: subtaskFields,
    append: appendSubtask,
    remove: removeSubtask,
  } = useFieldArray({ control, name: "subtasks" });

  // Filter assignees based on selected project
  const filteredUsers = projectId
    ? MOCK_USERS.filter((u) => u.projectIds.includes(projectId))
    : MOCK_USERS;

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Create New Task</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                className={`form-input ${errors.title ? "input-error" : ""}`}
                placeholder="Enter task title..."
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
              />
              {errors.title && (
                <span className="error-msg">{errors.title.message}</span>
              )}
            </div>

            {/* Task Type */}
            <div className="form-group">
              <label className="form-label">Task Type *</label>
              <select
                className="form-input form-select"
                {...register("taskType", { required: "Task type is required" })}
              >
                {TASK_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label className="form-label">Priority *</label>
              <select
                className="form-input form-select"
                {...register("priority", { required: "Priority is required" })}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Project */}
            <div className="form-group">
              <label className="form-label">Project</label>
              <select
                className="form-input form-select"
                {...register("projectId")}
              >
                <option value="">Select a project...</option>
                {MOCK_PROJECTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignee */}
            <div className="form-group">
              <label className="form-label">Assignee</label>
              <select
                className="form-input form-select"
                {...register("assigneeId")}
              >
                <option value="">Unassigned</option>
                {filteredUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Enter task description..."
                {...register("description", {
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                })}
              />
              {errors.description && (
                <span className="error-msg">{errors.description.message}</span>
              )}
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-input"
                {...register("dueDate")}
              />
            </div>

            {/* ---- Dynamic Fields ---- */}

            {/* Bug Fields */}
            {taskType === "Bug" && (
              <>
                <div className="form-group">
                  <label className="form-label">Severity *</label>
                  <select
                    className="form-input form-select"
                    {...register("severity", {
                      required:
                        taskType === "Bug" ? "Severity is required" : false,
                    })}
                  >
                    {BUG_SEVERITIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.severity && (
                    <span className="error-msg">{errors.severity.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Steps to Reproduce</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="1. Step one&#10;2. Step two&#10;3. Expected vs actual result"
                    {...register("stepsToReproduce")}
                  />
                </div>
              </>
            )}

            {/* Feature Fields */}
            {taskType === "Feature" && (
              <>
                <div className="form-group">
                  <label className="form-label">Business Value</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe the business value..."
                    {...register("businessValue")}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Acceptance Criteria</label>
                  {criteriaFields.map((field, index) => (
                    <div key={field.id} className="field-array-row">
                      <input
                        className="form-input"
                        placeholder={`Criteria ${index + 1}`}
                        {...register(`acceptanceCriteria.${index}.value`)}
                      />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeCriteria(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-field"
                    onClick={() => appendCriteria({ value: "" })}
                  >
                    + Add Criteria
                  </button>
                </div>
              </>
            )}

            {/* Enhancement Fields */}
            {taskType === "Enhancement" && (
              <>
                <div className="form-group">
                  <label className="form-label">Current Behavior</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe current behavior..."
                    {...register("currentBehavior")}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Proposed Behavior</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe proposed behavior..."
                    {...register("proposedBehavior")}
                  />
                </div>
              </>
            )}

            {/* Research Fields */}
            {taskType === "Research" && (
              <>
                <div className="form-group">
                  <label className="form-label">Research Questions</label>
                  {questionFields.map((field, index) => (
                    <div key={field.id} className="field-array-row">
                      <input
                        className="form-input"
                        placeholder={`Question ${index + 1}`}
                        {...register(`researchQuestions.${index}.value`)}
                      />
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeQuestion(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-field"
                    onClick={() => appendQuestion({ value: "" })}
                  >
                    + Add Question
                  </button>
                </div>
                <div className="form-group">
                  <label className="form-label">Expected Outcomes</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe expected outcomes..."
                    {...register("expectedOutcomes")}
                  />
                </div>
              </>
            )}

            {/* Subtasks */}
            <div className="form-group">
              <label className="form-label">Subtasks</label>
              {subtaskFields.map((field, index) => (
                <div key={field.id} className="field-array-row">
                  <input
                    className="form-input"
                    placeholder={`Subtask ${index + 1}`}
                    {...register(`subtasks.${index}.title`)}
                  />
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeSubtask(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-add-subtask"
                onClick={() => appendSubtask({ title: "", completed: false })}
              >
                Add Subtask
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
