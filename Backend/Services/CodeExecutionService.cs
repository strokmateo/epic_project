using Backend.Models;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Backend.CodeChecking;
using Backend.Services.Interfaces;

public class CodeExecutionService : ICodeExecutionService
{
    private readonly IUserService _userService;

    public CodeExecutionService(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<CodeCheckResult> ExecuteCode(CodeSubmission submission)
    {
        // Wrap the submitted code with the input and execution logic
        string wrappedCode = $@"
            var dragonLair = function(n, matrix){{
                {submission.Code}
            }};
            const input = `{submission.Input}`.trim().split('\n');
            const n = parseInt(input[0].trim());
            const matrix = [];
            for (let i = 1; i <= n; i++) {{
                matrix.push(input[i].trim().split(' ').map(Number));
            }}

            try {{
                const result = dragonLair(n, matrix);
                console.log(result.toString());
            }} catch (error) {{
                console.error(error.message);
            }}
        ";

        // Save the wrapped code to a temporary file
        var tempFilePath = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.js");
        await File.WriteAllTextAsync(tempFilePath, wrappedCode);

        try
        {
            // Execute the code using Node.js
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "node",
                    Arguments = tempFilePath,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();

            // Capture the output and errors
            var output = await process.StandardOutput.ReadToEndAsync();
            var errors = await process.StandardError.ReadToEndAsync();
            process.WaitForExit();

            // Check if the output matches the expected output
            var isCorrect = output.Trim() == submission.ExpectedOutput.Trim();

            // Calculate XP based on passed test cases
            int testCasesPassed = isCorrect ? submission.TestCases.Count : CountPassedTestCases(submission);
            int xpEarned = (testCasesPassed == submission.TestCases.Count) ? 1000 : testCasesPassed * 200;

            if (xpEarned > 0)
            {
                await _userService.AddXP(submission.UserId, xpEarned);
            }

            // Return the result
            return new CodeCheckResult
            {
                isCorrect = isCorrect,
                ActualOutput = output,
                ExpectedOutput = submission.ExpectedOutput,
                ErrorMessage = process.ExitCode != 0 ? errors : null
            };
        }
        finally
        {
            // Clean up the temporary file
            if (File.Exists(tempFilePath))
            {
                File.Delete(tempFilePath);
            }
        }
    }

    private int CountPassedTestCases(CodeSubmission submission)
    {
        int count = 0;
        foreach (var testCase in submission.TestCases)
        {
            string actualOutput = RunTestCase(submission.Code, testCase);
            if (actualOutput == testCase.ExpectedOutput)
            {
                count++;
            }
        }
        return count;
    }

    private string RunTestCase(string code, TestCase testCase)
    {
        // Wrap the code with the test case input
        string wrappedCode = $@"
            var dragonLair = function(n, matrix){{
                {code}
            }};
            const input = `{testCase.Input}`.trim().split('\n');
            const n = parseInt(input[0].trim());
            const matrix = [];
            for (let i = 1; i <= n; i++) {{
                matrix.push(input[i].trim().split(' ').map(Number));
            }}

            try {{
                const result = dragonLair(n, matrix);
                console.log(result.toString());
            }} catch (error) {{
                console.error(error.message);
            }}
        ";

        // Save the wrapped code to a temporary file
        var tempFilePath = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.js");
        File.WriteAllText(tempFilePath, wrappedCode);

        try
        {
            // Execute the code using Node.js
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "node",
                    Arguments = tempFilePath,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            var output = process.StandardOutput.ReadToEnd();
            var errors = process.StandardError.ReadToEnd();
            process.WaitForExit();

            // Return the output or error message
            return process.ExitCode == 0 ? output.Trim() : errors.Trim();
        }
        finally
        {
            // Clean up the temporary file
            if (File.Exists(tempFilePath))
            {
                File.Delete(tempFilePath);
            }
        }
    }
}