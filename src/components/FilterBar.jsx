import React from "react";

function FilterBar({ statusFilter, setStatusFilter }) {
  return (
    <div className="filter-container">
      <label htmlFor="status-filter"> Status:</label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        aria-label="Filter todos by completion status"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not_completed">Incomplete</option>
      </select>
    </div>
  );
}

export default FilterBar;
