using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Services.Interfaces
{
    public interface IProblemEvaluationService
    {
        Task<Result<ProblemSolutionResult>> EvaluateProblemSolution(int problemId, string userCode, Guid userId);
    }
}
