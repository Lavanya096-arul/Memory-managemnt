import React, { createContext, useState } from "react";

export const MemoryContext = createContext();

export const MemoryProvider = ({ children }) => {
    const [blocks, setBlocks] = useState([
        { id: 1, size: 100, used: 0 },
        { id: 2, size: 500, used: 0 },
        { id: 3, size: 200, used: 0 },
        { id: 4, size: 300, used: 0 },
        { id: 5, size: 600, used: 0 },
    ]);

    // allocate memory
    const allocateMemory = (id, amount) => {
        setBlocks((prev) =>
            prev.map((b) =>
                b.id === id && b.used + amount <= b.size
                    ? { ...b, used: b.used + amount }
                    : b
            )
        );
    };

    // deallocate memory
    const deallocateMemory = (id, amount) => {
        setBlocks((prev) =>
            prev.map((b) =>
                b.id === id && b.used - amount >= 0
                    ? { ...b, used: b.used - amount }
                    : b
            )
        );
    };

    return (
        <MemoryContext.Provider value={{ blocks, allocateMemory, deallocateMemory }}>
            {children}
        </MemoryContext.Provider>
    );
};
