namespace Backend.Models.Leaderboard
{
    public class LeaderboardEntryDTO
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public int Xp { get; set; }
        public int Coins { get; set; }
    }
}
