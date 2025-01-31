using Backend.Models;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Backend.CodeChecking;
using Backend.Services.Interfaces;
using Backend.Repositories.Interfaces;

public class CodeExecutionService(IUserService userService, ICodingProblemRepository codingProblemRepository) : ICodeExecutionService
{
    private readonly IUserService _userService = userService;
    private readonly ICodingProblemRepository _codingProblemRepository = codingProblemRepository;

    public async Task<CodeCheckResult> ExecuteCode(CodeSubmission submission)
    {
        if (submission == null)
        {
            throw new ArgumentNullException(nameof(submission), "Submission cannot be null.");
        }

        if (string.IsNullOrWhiteSpace(submission.Code))
        {
            return new CodeCheckResult
            {
                isCorrect = false,
                ActualOutput = "if submission code isn't found",
                ExpectedOutput = submission.ExpectedOutput,
                ErrorMessage = "Submitted code is empty."
            };
        }

        Console.WriteLine("this is the submission's problem id:" + submission.CodingProblemId + "\n" + "this is the submitions code: " + submission.Code);
        var currentProblem = await _codingProblemRepository.GetByIdAsync(submission.CodingProblemId);
        if (currentProblem == null)
        {
            return new CodeCheckResult
            {
                isCorrect = false,
                ActualOutput = "if problem isnt found",
                ExpectedOutput = submission.ExpectedOutput,
                ErrorMessage = "Problem not found in the database."
            };
        }

        if (submission.TestCases == null || !submission.TestCases.Any())
        {
            return new CodeCheckResult
            {
                isCorrect = false,
                ActualOutput = "if test cases is null",
                ExpectedOutput = submission.ExpectedOutput,
                ErrorMessage = "No test cases provided for execution."
            };
        }

        // Wrap the submitted code with the input and execution logic
        // Ensure `submission.Code` does not cause syntax errors
        string wrappedCode = $@"
            {submission.Code}
            const input =  `{submission.Input}`.trim().split('\n');
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

            Console.WriteLine($"Executing Node.js script: {tempFilePath}");

            process.Start();

            // Capture output and errors
            var output = await process.StandardOutput.ReadToEndAsync();
            var errors = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            Console.WriteLine($"Node.js Output: {output}");
            Console.WriteLine($"Node.js Errors: {errors}");

            if (!string.IsNullOrWhiteSpace(errors))
            {
                return new CodeCheckResult
                {
                    isCorrect = false,
                    ActualOutput = errors.Trim(),
                    ExpectedOutput = submission.ExpectedOutput,
                    ErrorMessage = errors.Trim()
                };
            }

            var actualOutput = output.Trim();
            var isCorrect = actualOutput == submission.ExpectedOutput.Trim();

            return new CodeCheckResult
            {
                isCorrect = isCorrect,
                ActualOutput = actualOutput,
                ExpectedOutput = submission.ExpectedOutput,
                ErrorMessage = process.ExitCode != 0 ? errors.Trim() : null
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