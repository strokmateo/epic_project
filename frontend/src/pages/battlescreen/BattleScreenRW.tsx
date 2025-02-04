import React, { useState } from "react";
import CodeEditor from "./CodeEditor";

import MonsterDisplay from "./MonsterDisplay";
import ProblemDescription from "./ProblemDescription";
import TestCases from "./TestCases";
//import WinDialog from "./WinDialog";

const BattleScreenRW: React.FC = () => {
    const [code, setCode] = useState("//test template koda");

    return (
        <div className="min-h-screen flex flex-col bg-gray-800 text-white">
            {/* gornji red */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* code editor */}
                <div className="flex-1 border rounded p-2">
                    <CodeEditor code={code} setCode={setCode} />
                </div>
                <div className="flex-1 border rounded p-2 relative">
                    <MonsterDisplay />
                </div>
            </div>
            {/* donji red */}
            <div className="flex flex-col md:flex-row gap-4 mt-4 flex-1">
                <div className="flex-1 border rounded p-2 overflow-auto">
                    <ProblemDescription />
                </div>
                <div className="flex-1 border rounded p-2 overflow-auto">
                    <TestCases />
                </div>
            </div>
            {/* <WinDialog /> */}
        </div>
    );
};

export default BattleScreenRW;
