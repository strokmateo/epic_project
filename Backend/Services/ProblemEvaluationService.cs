using Backend.Entities;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Backend.Services
{
    public class ProblemEvaluationService : IProblemEvaluationService
    {
        private readonly ICodingProblemRepository _problemRepository;
        private readonly ICodeExecutionService _executionService;
        private readonly IUserService _userService;

        public ProblemEvaluationService(
            ICodingProblemRepository problemRepository,
            ICodeExecutionService executionService,
            IUserService userService)
        {
            _problemRepository = problemRepository;
            _executionService = executionService;
            _userService = userService;
        }
        public async Task<ProblemSolutionResult> EvaluateProblemSolution(int problemId, string userCode, Guid userId)
        {
            var problem = await _problemRepository.GetByIdAsync(problemId);
            if (problem == null)
            {
                Console.WriteLine("Problem not found");
                return null;
            }
            var result = new ProblemSolutionResult
            {
                ProblemId = problemId,
                TestCaseResults = new List<TestCaseResult>()
            };

            int passedTestCases = 0;
            int xpPerTestCase = 100;
            int coinsPerTestCase = 25;
            foreach (var testCase in problem.TestCases)
            {
                var submission = new CodeSubmission
                {
                    Code = userCode,
                    Input = testCase.Input,
                    ExpectedOutput = testCase.ExpectedOutput,
                    Id = new Guid(),
                    CodingProblemId = problemId,
                    TestCases = new List<TestCase> { testCase },

                };

                var checkResult = await _executionService.ExecuteCode(submission);

                var testResult = new TestCaseResult
                {
                    Input = testCase.isHidden ? "*****" : testCase.Input,
                    ExpectedOutput = testCase.isHidden ? "*****" : testCase.ExpectedOutput,
                    ActualOutput = checkResult.ActualOutput,
                    Passed = checkResult.isCorrect,
                    IsHidden = testCase.isHidden

                };
                result.TestCaseResults.Add(testResult);
                if(checkResult.isCorrect)
                {
                    passedTestCases++;
                }
            }
            result.AllTestsPassed = result.TestCaseResults.All(result => result.Passed);
            int totalXp = passedTestCases * xpPerTestCase;
            int totalCoins = passedTestCases * coinsPerTestCase;
            if (totalXp > 0)
            {
                Console.WriteLine($"Adding {totalXp} XP to user {userId}");
                var xpResult = await _userService.AddXP(userId, totalXp);
                if (!xpResult.Succeeded)
                {
                    Console.WriteLine($"Failed to add XP: {xpResult.Message}");
                }
                else
                {
                    Console.WriteLine($"XP successfully added. User now has {totalXp} more XP.");
                }
            }
            if(totalCoins > 0)
            {
                Console.WriteLine($"Adding {totalCoins} coins to user {userId}");
                var coinResult = await _userService.AddCoins(userId, totalCoins);
                if (!coinResult.Succeeded)
                {
                    Console.WriteLine($"Failed to add coins: {coinResult.Message}");
                }
                else
                {
                    Console.WriteLine($"Coins successfully added. User now has {totalCoins} more coins.");
                }
            }

            return result;
        }
    }
}
