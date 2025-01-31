namespace Backend.Models
{
    public class ProblemSolutionResult
    {
        public int ProblemId { get; set; }
        public bool AllTestsPassed { get; set; }    
        public List<TestCaseResult> TestCaseResults { get; set; }
        public int XpAwarded { get; set; }
        public int CoinsAwarded { get; set; }
    }
}
