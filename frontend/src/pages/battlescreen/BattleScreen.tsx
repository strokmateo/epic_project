import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface TestCase {
    id: number;
    input: string;
    expected: string;
    result?: boolean;
    actual?: string;
}

interface ProblemData {
    title: string;
    description: string;
    testCases: TestCase[];
}

export default function CodingPage() {
    const [code, setCode] = useState(
        `/***\n| * @param {number[][]} matrix\n| * @param {number} n\n| * @return {number}\n */\nvar dragonLair = function(matrix, n) {\n    // Your code here\n};`
    );
    const [problemData, setProblemData] = useState<ProblemData>({
        title: "Dragon's Lair: Square Grid Treasure Hunt",
        description: `In the heart of the Firepeak Mountains lies the lair of an ancient dragon, guardian of a legendary treasure. To claim the hoard, adventurers must first solve the dragon’s riddle:\r\n\r\n\"A grid of magic seals, square and bright,\r\nGuards the path to treasures of light.\r\nSum the seals where row and column align,\r\nAnd the vault shall open—prove your mind!\"\r\n\r\nThe dragon conjures an n x n grid of glowing magical seals. Each seal holds an integer value. Your task is to compute the sum of the seals along the main diagonal (from the top-left to the bottom-right corner). Only then will the dragon’s barrier fall!",`, // Paste full description here
        testCases: [],
    });
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [output, setOutput] = useState("");

    // Fetch test cases from backend
    useEffect(() => {
        // Simulated API call
        const mockData: ProblemData = {
            title: "Dragon's Lair: Square Grid Treasure Hunt",
            description:
                'In the heart of the Firepeak Mountains lies the lair of an ancient dragon, guardian of a legendary treasure. To claim the hoard, adventurers must first solve the dragon’s riddle:\r\n\r\n"A grid of magic seals, square and bright,\r\nGuards the path to treasures of light.\r\nSum the seals where row and column align,\r\nAnd the vault shall open—prove your mind!"\r\n\r\nThe dragon conjures an n x n grid of glowing magical seals. Each seal holds an integer value. Your task is to compute the sum of the seals along the main diagonal (from the top-left to the bottom-right corner). Only then will the dragon’s barrier fall!',
            testCases: [
                {
                    id: 1,
                    input: JSON.stringify([
                        [1, 2],
                        [3, 4],
                    ]),
                    expected: "5",
                },
                {
                    id: 2,
                    input: JSON.stringify([
                        [5, 6, 7],
                        [8, 9, 10],
                        [11, 12, 13],
                    ]),
                    expected: "27",
                },
            ],
        };
        setProblemData(mockData);
        setTestCases(mockData.testCases);
    }, []);

    const runCode = () => {
        try {
            const func = new Function("matrix", "n", code);
            const updatedCases = testCases.map((tc) => {
                try {
                    const inputMatrix = JSON.parse(tc.input);
                    const n = inputMatrix.length;
                    const actual = func(inputMatrix, n);
                    return {
                        ...tc,
                        actual: String(actual),
                        result: actual === parseInt(tc.expected),
                    };
                } catch (error) {
                    console.error(`Test case ${tc.id} error:`, error);
                    return { ...tc, result: false, actual: "Error" };
                }
            });

            setTestCases(updatedCases);
            setOutput(
                updatedCases.every((tc) => tc.result)
                    ? "All tests passed!"
                    : "Some tests failed"
            );
        } catch (error) {
            console.error("Execution error:", error);
            setOutput("Error in code execution");
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url(src/assets/images/fight-background.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "60vh 35vh",
                gap: "16px",
                padding: "10px",
                height: "100vh",
                overflow: "hidden",
            }}
            className="font-pixel"
        >
            {/* Top-Left: Code Editor */}
            <div style={{ border: "1px solid #ccc", borderRadius: "4px" }}>
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                    options={{ minimap: { enabled: false } }}
                />
            </div>

            {/* Top-Right: Monster */}
            <div
                style={{
                    backgroundImage:
                        "url(src/assets/images/final-boss-background.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    border: "1px solid #ccc",
                }}
                className="bg-black flex justify-center items-start h-full p-10 overflow-hidden relative"
            >
                <img
                    src="src/assets/images/final-boss.png"
                    className="scale-150 translate-x-40 drop-shadow-[5px_0px_20px_rgba(0,0,0,1)]"
                />
                <div className="absolute bottom-0 bg-red-500 justify-left items-left">
                    <img
                        className="w-20 h-20 mb-10 ml-5"
                        src="src/assets/images/heart-full.png"
                    />
                </div>
            </div>

            {/* Bottom-Left: Coding Problem */}
            <div
                style={{
                    gridColumn: "1 / 2",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "16px",
                    overflowY: "auto",
                    backgroundColor: "rgba(100, 100, 100, 0.3)",
                    color: "white",
                }}
            >
                <h2 style={{ marginBottom: "16px" }}>{problemData.title}</h2>
                <div
                    style={{
                        backgroundColor: "rgba(30, 30, 30, 0.75)",
                        padding: "16px",
                        borderRadius: "4px",
                        marginBottom: "20px",
                        color: "white",
                    }}
                >
                    <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
                        {problemData.description}
                    </p>
                </div>
            </div>
            {/* Bottom-Right: Problem & Test Cases */}
            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.5",
                    overflowY: "auto",
                }}
            >
                <button
                    onClick={runCode}
                    style={{
                        padding: "12px 24px",
                        height: "50px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease",
                        display: "inline",
                        marginBottom: "20px",
                        marginTop: "10px",
                        marginLeft: "10px",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#45a049")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#4CAF50")
                    }
                >
                    Run Tests
                </button>

                {output && (
                    <div
                        style={{
                            display: "inline-block",
                            marginBottom: "20px",
                            marginTop: "10px",
                            padding: "12px 24px",
                            marginLeft: "410px",
                            borderRadius: "4px",
                            fontSize: "16px",
                            height: "50px",
                            backgroundColor: output.includes("passed")
                                ? "#e8f5e9"
                                : "rgba(244, 67, 54, 0.1)",
                            color: output.includes("passed")
                                ? "#2e7d32"
                                : "#c62828",
                            fontWeight: "bold",
                        }}
                    >
                        {output}
                    </div>
                )}
                <h3
                    style={{
                        marginBottom: "20px",
                        color: "white",
                        padding: "16px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(100, 100, 100, 0.3)",
                    }}
                >
                    Test Cases
                </h3>
                <div
                    style={{
                        //backgroundColor: "rgba(50, 50, 50, 0.75)",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "20px",
                        color: "white",
                    }}
                >
                    {testCases.map((tc) => (
                        <div
                            key={tc.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "16px",
                                backgroundColor:
                                    tc.result === undefined
                                        ? "rgba(50, 50, 50, 0.5)"
                                        : tc.result
                                        ? "rgba(30, 130, 76, 0.3)"
                                        : "rgba(120, 0, 0, 0.3)",
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "12px",
                                }}
                            >
                                <strong>Test Case #{tc.id}</strong>
                                {tc.result !== undefined && (
                                    <span
                                        style={{
                                            color: tc.result
                                                ? "#2e7d32"
                                                : "#c62828",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {tc.result ? "PASSED" : "FAILED"}
                                    </span>
                                )}
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                                <div
                                    style={{
                                        fontWeight: "500",
                                        marginBottom: "4px",
                                    }}
                                >
                                    Input Matrix:
                                </div>
                                <pre
                                    style={{
                                        backgroundColor:
                                            "rgba(30, 30, 30, 0.7)",
                                        color: "white",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        overflowX: "auto",
                                        fontSize: "14px",
                                    }}
                                >
                                    {tc.input}
                                </pre>
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                                <strong>Expected:</strong> {tc.expected}
                            </div>
                            {tc.actual !== undefined && (
                                <div>
                                    <strong>Actual:</strong> {tc.actual}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                ></div>
            </div>
        </div>
    );
}

// test zadatak kod
// var dragonLair = function(n, matrix) {
//   let sum = 0;
//   for (let i = 0; i < n; i++) {
//       sum += matrix[i][i];
//   }
//   return sum;
// };
