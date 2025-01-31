using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProblemController(ICodingProblemService problemService) : ControllerBase
    {
        private readonly ICodingProblemService _problemService = problemService;

        [HttpGet("id")]
        public async Task<IActionResult> GetCodingProblem(int problemId)
        {
            var result = await _problemService.GetCodingProblemByIdAsync(problemId);
            
            if(!result.Succeeded)
            {
                return NotFound(result.Message);
            }

            return Ok(result.Data);
        }

        //    private readonly IProblemEvaluationService _evaluationService;
        //    public ProblemController(IProblemEvaluationService evaluationService)
        //    {
        //        _evaluationService = evaluationService;
        //    }

        //    [HttpPost("submit/{problemId}")]
        //    public async Task<IActionResult> SubmitSolution(int problemId, [FromBody] ProblemSubmission submission)
        //    {
        //        if (string.IsNullOrWhiteSpace(submission?.Code))
        //        {
        //            return BadRequest("Code is required");
        //        }
        //        var result = await _evaluationService.EvaluateProblemSolution(problemId, submission.Code);

        //        if(result == null)
        //        {
        //            return NotFound("Problem not found");
        //        }

        //        return Ok(result);
        //    }
    }
}
