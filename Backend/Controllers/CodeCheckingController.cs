using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Backend.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class CodeCheckingController: ControllerBase
{
    private readonly ICodeExecutionService _codeExecutionService;

    public CodeCheckingController(ICodeExecutionService codeExecutionService)
    {
        _codeExecutionService = codeExecutionService;
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitCode([FromBody] CodeSubmission submission)
    {
        if(submission == null || string.IsNullOrWhiteSpace(submission.Code) || string.IsNullOrWhiteSpace(submission.ExpectedOutput))
        {
            return BadRequest();
        }

        try
        {
            var result = await _codeExecutionService.ExecuteCode(submission);
            return Ok(result);
        }
        catch
        {
            return StatusCode(500);
        }
    }
}