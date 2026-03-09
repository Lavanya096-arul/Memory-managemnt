import React, { useContext, useState } from "react";
import { MemoryContext } from "../context/MemoryContext";

const Allocation = () => {
    const { blocks, allocateMemory } = useContext(MemoryContext);
    const [amount, setAmount] = useState(0);
    const [blockId, setBlockId] = useState(1);

    // handle allocation with validation
    const handleAllocate = () => {
        const block = blocks.find((b) => b.id === blockId);

        if (amount <= 0) {
            alert("Enter a valid allocation size!");
            return;
        }
        if (amount > block.size - block.used) {
            alert("Not enough free memory in this block!");
            return;
        }

        allocateMemory(blockId, amount);
        setAmount(0);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Memory Allocation</h1>

            {/* Block Selection */}
            <div className="flex items-center gap-2">
                <select
                    className="border p-2 rounded"
                    value={blockId}
                    onChange={(e) => setBlockId(Number(e.target.value))}
                >
                    {blocks.map((b) => (
                        <option key={b.id} value={b.id}>
                            Block {b.id} (Free: {b.size - b.used} KB)
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Enter KB to allocate"
                    className="border p-2 rounded"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                <button
                    onClick={handleAllocate}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Allocate
                </button>
            </div>

            {/* Memory Usage Display */}
            <div className="mt-6">
                {blocks.map((b) => (
                    <div key={b.id} className="mb-4">
                        <p className="font-medium">
                            Block {b.id}: {b.used}/{b.size} KB used
                        </p>
                        <div className="w-full h-4 bg-gray-300 rounded">
                            <div
                                className="h-4 bg-green-500 rounded transition-all duration-500"
                                style={{ width: `${(b.used / b.size) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allocation;
