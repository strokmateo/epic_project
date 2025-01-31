namespace Backend.Models.Leaderboard
{
    public class LeaderboardDTO
    {
        public List<LeaderboardEntryDTO> Entries { get; set; } = new List<LeaderboardEntryDTO>();
    }
}
