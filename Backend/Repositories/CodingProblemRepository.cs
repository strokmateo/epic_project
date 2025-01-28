using Backend.Models;
using Backend.Repositories.Interfaces;



namespace Backend.Repositories
{
    public class CodingProblemRepository : ICodingProblemRepository
    {
        public CodingProblem GetProblemById(int problemId)
        {
            if (problemId == 1)
            {
                return new CodingProblem
                {
                    Id = 1,
                    Title = "Dragon's Lair: Square Grid Treasure Hunt",
                    Description = "In the heart of the Firepeak Mountains lies the lair of an ancient dragon, guardian of a legendary treasure. To claim the hoard, adventurers must first solve the dragon’s riddle:\r\n\r\n\"A grid of magic seals, square and bright,\r\nGuards the path to treasures of light.\r\nSum the seals where row and column align,\r\nAnd the vault shall open—prove your mind!\"\r\n\r\nThe dragon conjures an n x n grid of glowing magical seals. Each seal holds an integer value. Your task is to compute the sum of the seals along the main diagonal (from the top-left to the bottom-right corner). Only then will the dragon’s barrier fall!",


                    TestCases = new List<TestCase>
                    {
                        new TestCase
                        {
                            Input = "2\n1 2\n3 4",
                            ExpectedOutput = "5",
                            isHidden = false
                        },
                        new TestCase
                        {
                            Input = "3\n10 20 30\n40 50 60\n70 80 90",
                            ExpectedOutput = "150",
                            isHidden = false
                        },
                        new TestCase
                        {
                            Input = "2\n5 6\n8 9",
                            ExpectedOutput = "14",
                            isHidden = true
                        },
                        new TestCase
                        {
                            Input = "1\n100",
                            ExpectedOutput = "100",
                            isHidden = true
                        },
                        new TestCase
                        {
                            Input = "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
                            ExpectedOutput = "34",
                            isHidden = true
                        }
                    }
                };
            }
            return null;
        }
    }
}
