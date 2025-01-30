import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

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
  const [code, setCode] = useState(`/***\n| * @param {number[][]} matrix\n| * @param {number} n\n| * @return {number}\n */\nvar dragonLair = function(matrix, n) {\n    // Your code here\n};`);
  const [problemData, setProblemData] = useState<ProblemData>({
    title: "Dragon's Lair: Square Grid Treasure Hunt",
    description: `In the heart of the Firepeak Mountains lies the lair of an ancient dragon, guardian of a legendary treasure. To claim the hoard, adventurers must first solve the dragon’s riddle:\r\n\r\n\"A grid of magic seals, square and bright,\r\nGuards the path to treasures of light.\r\nSum the seals where row and column align,\r\nAnd the vault shall open—prove your mind!\"\r\n\r\nThe dragon conjures an n x n grid of glowing magical seals. Each seal holds an integer value. Your task is to compute the sum of the seals along the main diagonal (from the top-left to the bottom-right corner). Only then will the dragon’s barrier fall!",`, // Paste full description here
    testCases: []
  });
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [output, setOutput] = useState('');

  // Fetch test cases from backend
  useEffect(() => {
    // Simulated API call
    const mockData: ProblemData = {
      title: "Dragon's Lair: Square Grid Treasure Hunt",
      description: "In the heart of the Firepeak Mountains lies the lair of an ancient dragon, guardian of a legendary treasure. To claim the hoard, adventurers must first solve the dragon’s riddle:\r\n\r\n\"A grid of magic seals, square and bright,\r\nGuards the path to treasures of light.\r\nSum the seals where row and column align,\r\nAnd the vault shall open—prove your mind!\"\r\n\r\nThe dragon conjures an n x n grid of glowing magical seals. Each seal holds an integer value. Your task is to compute the sum of the seals along the main diagonal (from the top-left to the bottom-right corner). Only then will the dragon’s barrier fall!",
      testCases: [
        {
          id: 1,
          input: JSON.stringify([[1,2],[3,4]]),
          expected: "5"
        },
        {
          id: 2,
          input: JSON.stringify([[5,6,7],[8,9,10],[11,12,13]]),
          expected: "27"
        }
      ]
    };
    setProblemData(mockData);
    setTestCases(mockData.testCases);
  }, []);

  const runCode = () => {
    try {
      const func = new Function('matrix', 'n', code);
      const updatedCases = testCases.map(tc => {
        try {
          const inputMatrix = JSON.parse(tc.input);
          const n = inputMatrix.length;
          const actual = func(inputMatrix, n);
          return {
            ...tc,
            actual: String(actual),
            result: actual === parseInt(tc.expected)
          };
        } catch (error) {
          console.error(`Test case ${tc.id} error:`, error);
          return { ...tc, result: false, actual: 'Error' };
        }
      });
      
      setTestCases(updatedCases);
      setOutput(updatedCases.every(tc => tc.result) 
        ? 'All tests passed!' 
        : 'Some tests failed');
    } catch (error) {
      console.error('Execution error:', error);
      setOutput('Error in code execution');
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '60vh 40vh',
      gap: '16px',
      padding: '16px',
      height: '100vh'
    }}>
      {/* Top-Left: Code Editor */}
      <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
        />
      </div>

      {/* Top-Right: Empty slot for future use */}
      <div></div>

      {/* Bottom-Left: Problem & Test Cases */}
      <div style={{ 
        gridColumn: '1 / 2',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '16px',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '16px' }}>{problemData.title}</h2>
        <div style={{ 
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{problemData.description}</p>
        </div>

        <h3 style={{ marginBottom: '16px' }}>Test Cases</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '20px'
        }}>
          {testCases.map(tc => (
            <div 
              key={tc.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: tc.result === undefined 
                  ? '#fff' 
                  : tc.result ? '#e8f5e9' : '#ffebee',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <strong>Test Case #{tc.id}</strong>
                {tc.result !== undefined && (
                  <span style={{ 
                    color: tc.result ? '#2e7d32' : '#c62828',
                    fontWeight: 'bold'
                  }}>
                    {tc.result ? 'PASSED' : 'FAILED'}
                  </span>
                )}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Input Matrix:</div>
                <pre style={{ 
                  backgroundColor: '#fff', 
                  padding: '8px',
                  borderRadius: '4px',
                  overflowX: 'auto',
                  fontSize: '14px'
                }}>
                  {tc.input}
                </pre>
              </div>
              <div style={{ marginBottom: '8px' }}>
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={runCode}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            Run Tests
          </button>
          
          {output && (
            <div style={{ 
              padding: '12px 16px',
              borderRadius: '4px',
              backgroundColor: output.includes('passed') ? '#e8f5e9' : '#ffebee',
              color: output.includes('passed') ? '#2e7d32' : '#c62828',
              fontWeight: 'bold'
            }}>
              {output}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}