namespace Backend.Models
{
    public class CodeCheckResult
    {
        public bool isCorrect { get; set; }
        public string ActualOutput { get; set; }
        public string ExpectedOutput { get; set; }
        public string ErrorMessage { get; set; }
    }
}
