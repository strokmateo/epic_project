using Backend.Models;
using Backend.Services;

namespace Backend.Services.Interfaces
{
    public interface ICodeExecutionService
    {
        Task<CodeCheckResult> ExecuteCode(string userCode, TestCase problemTestCase);
    }
}
