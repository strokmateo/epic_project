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

        public ProblemEvaluationService(
            ICodingProblemRepository problemRepository,
            ICodeExecutionService executionService)
        {
            _problemRepository = problemRepository;
            _executionService = executionService;
        }
        public async Task<ProblemSolutionResult> EvaluateProblemSolution(int problemId, string userCode)
        {
            var problem = await _problemRepository.GetByIdAsync(problemId);
            if (problem == null)
            {
                Console.WriteLine("Problem not found");
            }
            var result = new ProblemSolutionResult
            {
                ProblemId = problemId,
                TestCaseResults = new List<TestCaseResult>()
            };
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
            }
            result.AllTestsPassed = result.TestCaseResults.All(result => result.Passed);
            return result;
        }
    }
}
