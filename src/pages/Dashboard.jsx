import React, { useContext } from "react";
import { MemoryContext } from "../context/MemoryContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Dashboard() {
    const { blocks } = useContext(MemoryContext);

    // Prepare data for the chart
    const data = blocks.map(b => ({
        name: `Block ${b.id}`,
        used: b.used,
        free: b.size - b.used,
    }));

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Memory Dashboard</h2>

            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
                <BarChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="used" fill="#34d399" />
                    <Bar dataKey="free" fill="#f87171" />
                </BarChart>
            </div>
        </div>
    );
}
