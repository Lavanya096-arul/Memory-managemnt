/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function PageReplacement() {
    const [pagesInput, setPagesInput] = useState('');
    const [frameSize, setFrameSize] = useState(3);
    const [algorithm, setAlgorithm] = useState('FIFO');
    const [frames, setFrames] = useState([]);
    const [pageSequence, setPageSequence] = useState([]);
    const [log, setLog] = useState([]);

    const handleStart = () => {
        if (!pagesInput) return;

        const sequence = pagesInput.split(',').map((p) => parseInt(p.trim()));
        setPageSequence(sequence);
        setFrames([]);
        setLog([]);
        simulate(sequence);
    };

    const simulate = (sequence) => {
        const fSize = frameSize;
        let currentFrames = [];
        let refBits = []; // for Second-Chance
        let logArr = [];

        sequence.forEach((page, step) => {
            let hit = currentFrames.includes(page);

            if (algorithm === 'FIFO') {
                if (!hit) {
                    if (currentFrames.length >= fSize) currentFrames.shift();
                    currentFrames.push(page);
                }
            }

            if (algorithm === 'LRU') {
                if (hit) {
                    currentFrames = currentFrames.filter((p) => p !== page);
                } else if (currentFrames.length >= fSize) {
                    currentFrames.shift();
                }
                currentFrames.push(page);
            }

            if (algorithm === 'Optimal') {
                if (!hit) {
                    if (currentFrames.length < fSize) {
                        currentFrames.push(page);
                    } else {
                        // Find page with farthest next use
                        let indexToReplace = 0;
                        let farthest = -1;
                        currentFrames.forEach((p, i) => {
                            const nextUse = sequence.slice(step + 1).indexOf(p);
                            if (nextUse === -1) {
                                indexToReplace = i;
                                farthest = Infinity;
                                return;
                            }
                            if (nextUse > farthest) {
                                farthest = nextUse;
                                indexToReplace = i;
                            }
                        });
                        currentFrames[indexToReplace] = page;
                    }
                }
            }

            if (algorithm === 'SecondChance') {
                if (!hit) {
                    if (currentFrames.length < fSize) {
                        currentFrames.push(page);
                        refBits.push(1);
                    } else {
                        // Second-chance replacement
                        while (true) {
                            if (refBits[0] === 0) {
                                currentFrames.shift();
                                refBits.shift();
                                currentFrames.push(page);
                                refBits.push(1);
                                break;
                            } else {
                                refBits.push(refBits.shift()); // give second chance
                                currentFrames.push(currentFrames.shift());
                            }
                        }
                    }
                } else {
                    // page hit sets reference bit
                    const idx = currentFrames.indexOf(page);
                    refBits[idx] = 1;
                }
            }

            logArr.push({
                step: step + 1,
                page,
                frames: [...currentFrames],
                hit,
            });
        });

        setFrames(currentFrames);
        setLog(logArr);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded mt-8">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
                Page Replacement Simulator
            </h1>

            <div className="mb-4">
                <label className="block mb-1">Algorithm:</label>
                <select
                    className="border px-2 py-1 w-full rounded"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                >
                    <option>FIFO</option>
                    <option>LRU</option>
                    <option>Optimal</option>
                    <option>SecondChance</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1">Frame Size:</label>
                <input
                    type="number"
                    className="border px-2 py-1 w-full rounded"
                    value={frameSize}
                    onChange={(e) => setFrameSize(parseInt(e.target.value))}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Page Sequence (comma separated):</label>
                <input
                    type="text"
                    className="border px-2 py-1 w-full rounded"
                    value={pagesInput}
                    onChange={(e) => setPagesInput(e.target.value)}
                />
                <button
                    onClick={handleStart}
                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Start Simulation
                </button>
            </div>

            {log.length > 0 && (
                <div className="mt-6">
                    <h2 className="font-semibold mb-2 text-lg">Simulation Log:</h2>
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-2 py-1">Step</th>
                                <th className="border px-2 py-1">Page</th>
                                <th className="border px-2 py-1">Frames</th>
                                <th className="border px-2 py-1">Hit/Miss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {log.map((entry, idx) => (
                                <tr key={idx}>
                                    <td className="border px-2 py-1 text-center">{entry.step}</td>
                                    <td className="border px-2 py-1 text-center">{entry.page}</td>
                                    <td className="border px-2 py-1 text-center">
                                        {entry.frames.join(', ')}
                                    </td>
                                    <td className="border px-2 py-1 text-center">
                                        {entry.hit ? 'Hit' : 'Miss'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PageReplacement;
