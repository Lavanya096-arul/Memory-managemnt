import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Allocation from "./pages/Allocation";
import PageReplacement from "./pages/PageReplacement";
import Dashboard from "./pages/Dashboard";
import Deallocation from "./pages/Deallocation";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
          <h1 className="text-xl font-bold">Memory Simulator</h1>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/allocation" className="hover:underline">Allocation</Link>
            <Link to="/replacement" className="hover:underline">Page Replacement</Link>
            <Link to="/deallocation" className="hover:underline">Deallocation</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/replacement" element={<PageReplacement />} />
          <Route path="/deallocation" element={<Deallocation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
