using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/problems")]
    public class ProblemController : ControllerBase
    {
        private readonly IProblemEvaluationService _evaluationService;
        public ProblemController(IProblemEvaluationService evaluationService)
        {
            _evaluationService = evaluationService;
        }

        [HttpPost("submit/{problemId}")]
        public async Task<IActionResult> SubmitSolution(int problemId, [FromBody] ProblemSubmission submission)
        {
            if (string.IsNullOrWhiteSpace(submission?.Code))
            {
                return BadRequest("Code is required");
            }
            var result = await _evaluationService.EvaluateProblemSolution(problemId, submission.Code);

            if(result == null)
            {
                return NotFound("Problem not found");
            }

            return Ok(result);
        }
    }
    public class ProblemSubmission
    {
        public string Code { get; set; }
    }
}
