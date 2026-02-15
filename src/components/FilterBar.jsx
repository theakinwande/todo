import React from "react";

function FilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  className,
}) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className || ""}`}>
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="status-filter"
          className="font-medium text-slate-700 whitespace-nowrap text-sm"
        >
          Status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Pending</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="priority-filter"
          className="font-medium text-slate-700 whitespace-nowrap text-sm"
        >
          Priority:
        </label>
        <select
          id="priority-filter"
          value={priorityFilter || "all"}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
        >
          <option value="all">All</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
