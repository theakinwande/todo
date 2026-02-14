import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <h1 className="text-9xl font-extrabold text-slate-200">404</h1>
      <div className="absolute">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Item Not Found
        </h2>
        <p className="text-slate-600 mb-8 max-w-sm">
          We couldn't find the task details you were looking for. It might have
          been deleted.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
