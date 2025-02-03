namespace Backend.Models
{
    public class TestCaseResult
    {
        public int testCaseId { get; set; }
        public string Input { get; set; }
        public string ExpectedOutput { get; set; }
        public string ActualOutput { get; set; }    
        public bool Passed { get; set; }    
        public bool IsHidden { get; set; }

    }
}
