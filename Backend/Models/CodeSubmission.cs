namespace Backend.Models;

public class CodeSubmission
{
    public string Code { get; set; } //User s js code
    public string Input { get; set; } // input for the code
    public string ExpectedOutput { get; set; }  //the expected output for the set input
}
