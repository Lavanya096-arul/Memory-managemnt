import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            <h1 className="text-4xl font-bold mb-6">Memory Management Simulator</h1>
            <div className="space-x-4">
                <Link to="/allocation" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                    Memory Allocation
                </Link>
                <Link to="/replacement" className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                    Page Replacement
                </Link>
                <Link to="/dashboard" className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600">
                    Dashboard
                </Link>
            </div>
        </div>
    );
}
