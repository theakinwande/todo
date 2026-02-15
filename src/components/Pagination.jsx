import { getPageRange } from "../utils/pagination";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = getPageRange(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-10 mb-6"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-slate-400"
              >
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 flex items-center justify-center border rounded-lg font-medium transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-lg bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
