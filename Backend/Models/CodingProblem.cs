namespace Backend.Models
{
    public class CodingProblem
    {
        public int Id { get; set; }
        public string Title { get; set; }   
        public string Description { get; set; }
        public List<TestCase> TestCases { get; set; }

    }
}
