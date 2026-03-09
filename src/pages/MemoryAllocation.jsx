import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MemoryAllocation() {
    const [blocks] = useState([100, 500, 200, 300, 600]); // memory blocks
    const [processes] = useState([212, 417, 112, 426]);   // process sizes
    const [algorithm, setAlgorithm] = useState("First Fit");
    const [allocation, setAllocation] = useState([]);

    // ---------- Algorithms ----------
    const firstFit = () => {
        let alloc = Array(processes.length).fill(-1);
        let tempBlocks = [...blocks];

        processes.forEach((p, i) => {
            for (let j = 0; j < tempBlocks.length; j++) {
                if (tempBlocks[j] >= p) {
                    alloc[i] = j;
                    tempBlocks[j] -= p;
                    break;
                }
            }
        });
        setAllocation(alloc);
    };

    const bestFit = () => {
        let alloc = Array(processes.length).fill(-1);
        let tempBlocks = [...blocks];

        processes.forEach((p, i) => {
            let bestIdx = -1;
            for (let j = 0; j < tempBlocks.length; j++) {
                if (tempBlocks[j] >= p) {
                    if (bestIdx === -1 || tempBlocks[j] < tempBlocks[bestIdx]) {
                        bestIdx = j;
                    }
                }
            }
            if (bestIdx !== -1) {
                alloc[i] = bestIdx;
                tempBlocks[bestIdx] -= p;
            }
        });
        setAllocation(alloc);
    };

    const worstFit = () => {
        let alloc = Array(processes.length).fill(-1);
        let tempBlocks = [...blocks];

        processes.forEach((p, i) => {
            let worstIdx = -1;
            for (let j = 0; j < tempBlocks.length; j++) {
                if (tempBlocks[j] >= p) {
                    if (worstIdx === -1 || tempBlocks[j] > tempBlocks[worstIdx]) {
                        worstIdx = j;
                    }
                }
            }
            if (worstIdx !== -1) {
                alloc[i] = worstIdx;
                tempBlocks[worstIdx] -= p;
            }
        });
        setAllocation(alloc);
    };

    // Run selected algo
    const runSimulation = () => {
        if (algorithm === "First Fit") firstFit();
        else if (algorithm === "Best Fit") bestFit();
        else if (algorithm === "Worst Fit") worstFit();
    };

    // ---------- UI ----------
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Memory Allocation Simulation</h2>

            {/* Controls */}
            <div className="mb-6 flex items-center gap-4">
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option>First Fit</option>
                    <option>Best Fit</option>
                    <option>Worst Fit</option>
                </select>
                <button
                    onClick={runSimulation}
                    className="px-5 py-2 bg-blue-600 text-white rounded shadow"
                >
                    Run Simulation
                </button>
            </div>

            {/* Blocks Visualization */}
            <h3 className="text-lg font-semibold mb-3">Memory Blocks</h3>
            <div className="flex gap-4 flex-wrap">
                {blocks.map((block, j) => (
                    <div
                        key={j}
                        className="relative border border-gray-400 w-32 h-40 flex flex-col"
                    >
                        <div className="bg-gray-200 text-center py-1 font-medium border-b">
                            Block {j + 1} ({block})
                        </div>

                        {/* show processes inside */}
                        <div className="flex-1 flex flex-col items-center justify-center gap-1 p-2">
                            <AnimatePresence>
                                {processes.map((p, i) =>
                                    allocation[i] === j ? (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: -40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 40 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="bg-green-500 w-full text-center rounded text-sm text-white shadow-md"
                                        >
                                            P{i + 1} ({p})
                                        </motion.div>
                                    ) : null
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>

            {/* Processes Table */}
            <h3 className="text-lg font-semibold mt-6 mb-2">Process Allocation</h3>
            <table className="table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Process</th>
                        <th className="border px-4 py-2">Size</th>
                        <th className="border px-4 py-2">Allocated Block</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((p, i) => (
                        <tr key={i}>
                            <td className="border px-4 py-2">P{i + 1}</td>
                            <td className="border px-4 py-2">{p}</td>
                            <td className="border px-4 py-2">
                                {allocation[i] !== -1
                                    ? `Block ${allocation[i] + 1}`
                                    : "Not Allocated"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
