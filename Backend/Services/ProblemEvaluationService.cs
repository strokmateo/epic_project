using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;

namespace Backend.Services
{
    public class ProblemEvaluationService : IProblemEvaluationService
    {
        private readonly ICodingProblemRepository _problemRepository;
        private readonly ICodeExecutionService _executionService;

        public ProblemEvaluationService(
            ICodingProblemRepository problemRepository,
            ICodeExecutionService executionService,
            IUserService userService)
        {
            _problemRepository = problemRepository;
            _executionService = executionService;
        }
        public async Task<Result<ProblemSolutionResult>> EvaluateProblemSolution(int problemId, string userCode, Guid userId)
        {
            var problem = await _problemRepository.GetProblemByIdAsync(problemId);
            if (problem == null)
            {
                return Result<ProblemSolutionResult>.Failure("Coding problem not found.");
            }
            var userSolutionResult = new ProblemSolutionResult
            {
                ProblemId = problemId,
                DifficultyMultiplier = problem.DifficultyMultiplier,
                TestCaseResults = new List<TestCaseResult>()
            };

            foreach (var problemTestCase in problem.TestCases)
            {
                var checkResult = await _executionService.ExecuteCode(userCode, problemTestCase);

                var testResult = new TestCaseResult
                {
                    testCaseId = problemTestCase.Id,
                    Input = problemTestCase.isHidden ? "*****" : problemTestCase.InputArguments,
                    ExpectedOutput = problemTestCase.isHidden ? "*****" : problemTestCase.ExpectedOutput,
                    ActualOutput = checkResult.ActualOutput,
                    Passed = checkResult.isCorrect,
                    IsHidden = problemTestCase.isHidden

                };
                userSolutionResult.TestCaseResults.Add(testResult);
            }
            userSolutionResult.AllTestsPassed = userSolutionResult.TestCaseResults.All(result => result.Passed);

            return Result<ProblemSolutionResult>.Success(userSolutionResult);
        }
    }
}
