import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import {
    AlertDialogHeader,
    AlertDialogFooter,
} from "../../components/ui/alert-dialog";
import BackButton from "../../templates/BackButton";
//import { useAuth, User } from "../../context/AuthContext";

interface TestCase {
    id: number;
    input: string;
    expected: string;
    result?: boolean;
    actual?: string;
    isHidden?: boolean;
}

interface ProblemData {
    id: number;
    title: string;
    description: string;
    testCases: TestCase[];
}

interface SubmissionResult {
    problemId: number;
    allTestsPassed: boolean;
    testCaseResults: Array<{
        testCaseId: number;
        input: string;
        expectedOutput: string;
        actualOutput: string;
        passed: boolean;
        isHidden: boolean;
    }>;
}

export default function CodingPage() {
    const [code, setCode] = useState(
        `var dragonLair = function(n, matrix) {\n    // Your code here\n};`
    );
    const [problemData] = useState<ProblemData>({
        id: 0,
        title: "Dragon's Lair: Square Grid Treasure Hunt",
        description: `In the heart of the Firepeak Mountains lies the lair of an ancient dragon, guardian of a legendary treasure. To claim the hoard, adventurers must first solve the dragon’s riddle:\r\n\r\n\"A grid of magic seals, square and bright,\r\nGuards the path to treasures of light.\r\nSum the seals where row and column align,\r\nAnd the vault shall open—prove your mind!\"\r\n\r\nThe dragon conjures an n x n grid of glowing magical seals. Each seal holds an integer value. Your task is to compute the sum of the seals along the main diagonal (from the top-left to the bottom-right corner). Only then will the dragon’s barrier fall!",`,
        testCases: [],
    });
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [output, setOutput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [youWin, setYouWin] = useState(false);
    const [bossHealth, setBossHealth] = useState(50);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // Fetch problem data when component mounts
    axios.defaults.baseURL = "https://localhost:7092";

    useEffect(() => {
        if (bossHealth === 0) {
            setYouWin(true);
            setIsDialogOpen(true); // Open dialog when boss health is 0
        }
    }, [bossHealth]);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<SubmissionResult>(
                `/api/problems/submit/1`,
                { code: code }
            );
            console.log("Submission Response:", response.data);

            const transformedTestCases = response.data.testCaseResults.map(
                (tc, index) => ({
                    id: tc.testCaseId ?? index, // Use index if ID is missing
                    input: tc.isHidden ? "*****" : tc.input,
                    expected: tc.isHidden ? "*****" : tc.expectedOutput,
                    actual: tc.actualOutput.trim(),
                    result: tc.passed,
                    isHidden: tc.isHidden,
                })
            );
            console.log("Submitting code:", code);

            setTestCases(transformedTestCases);
            setOutput(
                response.data.allTestsPassed
                    ? "All tests passed!"
                    : "Some tests failed"
            );
            setBossHealth(
                50 - transformedTestCases.filter((tc) => tc.result).length * 10
            );
        } catch (error) {
            console.error("Submission failed:", error);
            setOutput("Error submitting solution");
        } finally {
            setIsSubmitting(false);
        }
    };

    const userHp = 100;

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
            {/* 🏆 WIN DIALOG */}
            {youWin && (
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <button style={{ display: "none" }}>Open</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent
                        className="top-1/3 absolute z-50 text-white w-1/3 h-1/3 left-1/3 animate-fade-in flex flex-col justify-between p-14"
                        style={{ backgroundColor: "rgba(30, 30, 30)" }}
                    >
                        <AlertDialogHeader>
                            <AlertDialogTitle>🎉 You Win!</AlertDialogTitle>
                            <AlertDialogDescription>
                                Congratulations! You have defeated the final
                                boss.
                            </AlertDialogDescription>
                            <AlertDialogDescription>
                                <div>
                                    Xp earned:{" "}
                                    <span className="text-blue-400">500</span>
                                </div>
                                <div>
                                    Coins earned:{" "}
                                    <span className="text-yellow-300">125</span>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={() => {
                                    setIsDialogOpen(false);
                                }}
                            >
                                Close
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => window.location.reload()}
                            >
                                Play Again
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
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
                    border: "1px solid #ccc",
                }}
                className="bg-black flex justify-center items-start h-full p-10 overflow-hidden relative"
            >
                <BackButton />
                {/* responzivnost je sjebana zbog slike (slika je prevelika) */}
                <div className="flex flex-row justify-between items-center w-full p-5">
                    <div className="text-4xl text-white absolute bottom-20 bg-black justify-left items-left">
                        BOSS HP: {bossHealth}
                    </div>
                    <div className="text-4xl text-white absolute bottom-5 bg-black justify-right items-right">
                        USER HP: {userHp}
                    </div>
                </div>

                <img
                    draggable={false}
                    src="src/assets/images/final-boss.png"
                    className="scale-150 translate-x-40 drop-shadow-[5px_0px_20px_rgba(0,0,0,1)]"
                />
                {/* <div className="absolute bottom-0 bg-red-500 justify-left items-left">
                    <img
                        className="w-20 h-20 mb-10 ml-5"
                        src="src/assets/images/heart-full.png"
                    />
                </div> */}
            </div>

            {/* Bottom-Left: Problem Description */}
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
                    }}
                >
                    <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
                        {problemData.description}
                    </p>
                </div>
            </div>

            {/* Bottom-Right: Test Cases & Controls */}
            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    overflowY: "auto",
                    backgroundColor: "rgba(100, 100, 100, 0.3)",
                    color: "white",
                    padding: "16px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: isSubmitting ? "#666" : "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            transition: "background-color 0.3s ease",
                            fontSize: "16px",
                        }}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Solution"}
                    </button>

                    {output && (
                        <div
                            style={{
                                padding: "12px 16px",
                                borderRadius: "4px",
                                backgroundColor: output.includes("passed")
                                    ? "#e8f5e9"
                                    : "#ffebee",
                                color: output.includes("passed")
                                    ? "#2e7d32"
                                    : "#c62828",
                                fontWeight: "bold",
                            }}
                        >
                            {output}
                        </div>
                    )}
                </div>

                <h3 style={{ marginBottom: "16px" }}>Test Cases</h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {testCases.map(
                        (
                            tc,
                            _index //_index da se makne warning jer pise da je unused
                        ) => (
                            <div
                                key={"${tc.id}-${index}"}
                                style={{
                                    border: "1px solid #444",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    backgroundColor:
                                        tc.result === undefined
                                            ? "rgba(50, 50, 50, 0.5)"
                                            : tc.result
                                            ? "rgba(46, 125, 50, 0.3)"
                                            : "rgba(211, 47, 47, 0.3)",
                                    transition: "background-color 0.3s ease",
                                    opacity: tc.isHidden ? 0.8 : 1,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "12px",
                                    }}
                                >
                                    <strong>
                                        {tc.isHidden
                                            ? "Hidden Test Case"
                                            : `Test Case #${tc.id}`}
                                    </strong>
                                    {tc.result !== undefined && (
                                        <span
                                            style={{
                                                color: tc.result
                                                    ? "#81c784"
                                                    : "#e57373",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {tc.result ? "PASSED" : "FAILED"}
                                        </span>
                                    )}
                                </div>
                                {!tc.isHidden && (
                                    <>
                                        <div style={{ marginBottom: "8px" }}>
                                            <div
                                                style={{
                                                    fontWeight: 500,
                                                    marginBottom: "4px",
                                                }}
                                            >
                                                Input:
                                            </div>
                                            <pre
                                                style={{
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.3)",
                                                    padding: "8px",
                                                    borderRadius: "4px",
                                                    overflowX: "auto",
                                                }}
                                            >
                                                {tc.input}
                                            </pre>
                                        </div>
                                        <div style={{ marginBottom: "8px" }}>
                                            <strong>Expected:</strong>{" "}
                                            {tc.expected}
                                        </div>
                                    </>
                                )}

                                {!tc.isHidden && (
                                    <div>
                                        <strong>Actual:</strong> {tc.actual}
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
