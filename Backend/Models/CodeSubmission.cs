using System;
using System.Collections.Generic;



namespace Backend.Models;

public class CodeSubmission
{
    public Guid Id { get; set; }
    public string Code { get; set; } //User s js code
    public string Input { get; set; } // input for the code
    public string ExpectedOutput { get; set; }  //the expected output for the set input
    public List<TestCase> TestCases { get; set; }
    public Guid UserId { get; set; }
}
