namespace Backend.Models
{
    public class TestCase
    {
        public int Id{ get; set; }
        public int CodingProblemId { get; set; }
        public string InputArguments { get; set; }
        public string ExpectedOutput { get; set; }  
        public bool isHidden { get; set; }  
    }
}
