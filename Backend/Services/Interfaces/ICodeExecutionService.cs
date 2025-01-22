using Backend.Models;
using Backend.Services;

using Backend.CodeChecking;

namespace Backend.Services.Interfaces
{
    public interface ICodeExecutionService
    {
        Task<CodeCheckResult> ExecuteCode(CodeSubmission submission);
    }
}
