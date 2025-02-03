namespace Backend.Models
{
    public class ProblemSolutionResult
    {
        public int ProblemId { get; set; }
        public bool AllTestsPassed { get; set; }
        public double DifficultyMultiplier { get; set; }
        public List<TestCaseResult> TestCaseResults { get; set; } = new List<TestCaseResult>();
        public int CoinsEarned { get; set; } = 0;
        public int XpEarned { get; set; } = 0;
    }
}
