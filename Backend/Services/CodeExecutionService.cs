using Backend.Models;
using System.Diagnostics;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;

public class CodeExecutionService(ICodingProblemRepository codingProblemRepository) : ICodeExecutionService
{
    private readonly ICodingProblemRepository _codingProblemRepository = codingProblemRepository;

    public async Task<CodeCheckResult> ExecuteCode(string userCode, TestCase problemTestCase)
    {
        if (userCode == null)
        {
            throw new ArgumentNullException(nameof(userCode), "User code error.");
        }

        if (string.IsNullOrWhiteSpace(userCode))
        {
            return new CodeCheckResult
            {
                isCorrect = false,
                ActualOutput = "if submission code isn't found",
                ExpectedOutput = problemTestCase.ExpectedOutput,
                ErrorMessage = "Submitted code is empty."
            };
        }

        Console.WriteLine("this is the submission's problem id:" + problemTestCase.CodingProblemId + "\n" + "this is the submitions code: " + userCode);
        var currentProblem = await _codingProblemRepository.GetProblemByIdAsync(problemTestCase.CodingProblemId);
        if (currentProblem == null)
        {
            return new CodeCheckResult
            {
                isCorrect = false,
                ActualOutput = "if problem isnt found",
                ExpectedOutput = problemTestCase.ExpectedOutput,
                ErrorMessage = "Problem not found in the database."
            };
        }

        if (problemTestCase == null)
        {
            return new CodeCheckResult
            {
                isCorrect = false,
                ActualOutput = "if test cases is null",
                ExpectedOutput = problemTestCase.ExpectedOutput,
                ErrorMessage = "No test cases provided for execution."
            };
        }

        // Wrap the submitted code with the input and execution logic
        // Ensure `submission.Code` does not cause syntax errors
        string wrappedCode = $@"
            {userCode}
            const input =  `{problemTestCase.InputArguments}`.trim().split('\n');
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
                    ExpectedOutput = problemTestCase.ExpectedOutput,
                    ErrorMessage = errors.Trim()
                };
            }

            var actualOutput = output.Trim();
            var isCorrect = actualOutput == problemTestCase.ExpectedOutput.Trim();

            return new CodeCheckResult
            {
                isCorrect = isCorrect,
                ActualOutput = actualOutput,
                ExpectedOutput = problemTestCase.ExpectedOutput,
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
}