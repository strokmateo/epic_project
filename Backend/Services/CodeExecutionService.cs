using Backend.Models;
using System.Diagnostics;
using System.IO;    
using System.Threading.Tasks;
using Backend.CodeChecking;
using Backend.Services.Interfaces;

public class CodeExecutionService : ICodeExecutionService
{
    public async Task<CodeCheckResult> ExecuteCode(CodeSubmission submission)
    {
        //saving code to tmp file
        var tempFilePath = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.js");
        await File.WriteAllTextAsync(tempFilePath, submission.Code);

        try
        {   //try executeing code with Node.js
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "node",
                    Arguments = tempFilePath,
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            //if there is no input
            if (!string.IsNullOrWhiteSpace(submission.Input))
            {
                await process.StandardInput.WriteAsync(submission.Input);
                await process.StandardInput.FlushAsync();
                process.StandardInput.Close();
            }

            //capturing outputs and errors
            var output = await process.StandardOutput.ReadToEndAsync();
            var errors = await process.StandardError.ReadToEndAsync();

            process.WaitForExit();

            var isCorrect = output.Trim() == submission.ExpectedOutput.Trim();

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
            if (File.Exists(tempFilePath))
            {
                File.Delete(tempFilePath);
            }
        }
    }
}