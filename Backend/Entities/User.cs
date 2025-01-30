using Microsoft.AspNetCore.Identity;

namespace Backend.Entities;

public class User : IdentityUser<Guid>
{
    public int XP { get; set; } = 0;
    // Todo -> .ignore all unused
    // props from this class in
    // OnModelCreating().
}