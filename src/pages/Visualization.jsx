import React, { useContext } from "react";
import { MemoryContext } from "../context/MemoryContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Visualization = () => {
  const { blocks } = useContext(MemoryContext);

  const data = blocks.map((block) => ({
    name: `Block ${block.id}`,
    Used: block.used,
    Free: block.size - block.used,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Memory Visualization</h1>
      <div style={{ width: "100%", height: "400px", backgroundColor: "white", padding: "10px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Used" stackId="a" fill="#ef4444" />
            <Bar dataKey="Free" stackId="a" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Visualization;
