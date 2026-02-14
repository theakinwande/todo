import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPages from "./pages/TodoPages";
import TodoDetails from "./pages/TodoDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import "./App.css";
import "./index.css";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 p-4">
          <Routes>
            <Route path="/" element={<TodoPages />} />
            <Route path="/todo/:id" element={<TodoDetails />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
