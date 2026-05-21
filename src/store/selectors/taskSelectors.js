import { createSelector } from "reselect";

// ─── Base Selectors ───────────────────────────────────────────

const selectTasksById = (state) => state.entities.tasks.byId;
const selectTaskAllIds = (state) => state.entities.tasks.allIds;
const selectUsersById = (state) => state.entities.users.byId;
const selectProjectsById = (state) => state.entities.projects.byId;
const selectFilters = (state) => state.ui.filters;

// ─── Memoized Selectors ───────────────────────────────────────

export const selectAllTasks = createSelector(
  [selectTasksById, selectTaskAllIds],
  (byId, allIds) => allIds.map((id) => byId[id]),
);

export const selectAllUsers = createSelector([selectUsersById], (byId) =>
  Object.values(byId),
);

export const selectAllProjects = createSelector([selectProjectsById], (byId) =>
  Object.values(byId),
);

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) => {
    return tasks.filter((task) => {
      if (filters.project && task.projectId !== filters.project) return false;
      if (filters.assignee && task.assigneeId !== filters.assignee)
        return false;
      if (filters.status !== "all" && task.status !== filters.status)
        return false;
      if (filters.taskType !== "all" && task.taskType !== filters.taskType)
        return false;
      return true;
    });
  },
);

// ─── UI Selectors ─────────────────────────────────────────────

export const selectTaskFormState = (state) => state.ui.taskForm;
export const selectIsFormOpen = (state) => state.ui.taskForm.isOpen;
export const selectFiltersState = (state) => state.ui.filters;
export const selectLoadingTasks = (state) => state.ui.loading.tasks;
export const selectLoadingUsers = (state) => state.ui.loading.users;
export const selectLoadingProjects = (state) => state.ui.loading.projects;
export const selectTasksError = (state) => state.ui.errors.tasks;
export const selectFormError = (state) => state.ui.errors.form;

// ─── Optimistic Selectors ─────────────────────────────────────

export const selectPendingCreates = (state) => state.optimistic.pendingCreates;
export const selectPendingDeletes = (state) => state.optimistic.pendingDeletes;
