//using Backend.Services.Interfaces;
//using Microsoft.AspNetCore.Mvc;


//namespace Backend.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class ProblemController(ICodingProblemService problemService) : ControllerBase
//    {
//        private readonly ICodingProblemService _problemService = problemService;

//        [HttpGet("id")]
//        public async Task<IActionResult> GetCodingProblem(int problemId)
//        {
//            var result = await _problemService.GetCodingProblemByIdAsync(problemId);

//            if(!result.Succeeded)
//            {
//                return NotFound(result.Message);
//            }

//            return Ok(result.Data);
//        }

//        //    private readonly IProblemEvaluationService _evaluationService;
//        //    public ProblemController(IProblemEvaluationService evaluationService)
//        //    {
//        //        _evaluationService = evaluationService;
//        //    }

//        //    [HttpPost("submit/{problemId}")]
//        //    public async Task<IActionResult> SubmitSolution(int problemId, [FromBody] ProblemSubmission submission)
//        //    {
//        //        if (string.IsNullOrWhiteSpace(submission?.Code))
//        //        {
//        //            return BadRequest("Code is required");
//        //        }
//        //        var result = await _evaluationService.EvaluateProblemSolution(problemId, submission.Code);

//        //        if(result == null)
//        //        {
//        //            return NotFound("Problem not found");
//        //        }

//        //        return Ok(result);
//        //    }
//    }
//}


using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/problems")]
    public class ProblemController : ControllerBase
    {
        private readonly IProblemEvaluationService _evaluationService;
        private readonly ICodingProblemService _problemService;
        private readonly IRewardService _rewardService;
        public ProblemController(IProblemEvaluationService evaluationService,
            ICodingProblemService problemService,
            IRewardService rewardService)
        {
            _evaluationService = evaluationService;
            _problemService = problemService;
            _rewardService = rewardService;
        }

        [HttpPost("submit/{problemId}")]
        public async Task<IActionResult> SubmitSolution(int problemId, [FromBody] ProblemSubmission submission)
        {
            var evalResult = await _evaluationService.EvaluateProblemSolution(problemId,
                submission.Code,
                submission.UserId);

            if (evalResult == null)
            {
                return NotFound("Problem not found");
            }

            if (evalResult?.Data == null)
            {
                return NotFound("Problem not found or evaluation failed.");
            }

            if (evalResult.Data.AllTestsPassed)
            {
                var xpResult = await _rewardService.AddXP(submission.UserId,
                    evalResult.Data.DifficultyMultiplier,
                    evalResult.Data.TestCaseResults.Count());

                if (!xpResult.Succeeded)
                {
                    return BadRequest(new { message = xpResult.Message });
                }

                var coinResult = await _rewardService.AddCoins(submission.UserId,
                    evalResult.Data.DifficultyMultiplier,
                    evalResult.Data.TestCaseResults.Count());

                if (!xpResult.Succeeded)
                {
                    return BadRequest(new { message = coinResult.Message });
                }

                evalResult.Data.XpEarned = xpResult.Data;
                evalResult.Data.CoinsEarned = coinResult.Data;
            }

            return Ok(evalResult.Data);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetCodingProblem(int problemId)
        {
            var result = await _problemService.GetCodingProblemByIdAsync(problemId);

            if (!result.Succeeded)
            {
                return NotFound(result.Message);
            }

            return Ok(result.Data);
        }
    }
    
}

