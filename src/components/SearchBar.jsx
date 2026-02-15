import React, { useState, useEffect } from "react";

function SearchBar({ searchQuery, setSearchQuery, className }) {
  // Internal state for immediate input feedback
  const [internalSearch, setInternalSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(internalSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [internalSearch, setSearchQuery]);

  return (
    <div className={`relative w-full ${className || ""}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for a task..."
        value={internalSearch}
        onChange={(e) => setInternalSearch(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />
    </div>
  );
}

export default SearchBar;
