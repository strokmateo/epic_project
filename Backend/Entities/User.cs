using Microsoft.AspNetCore.Identity;

namespace Backend.Entities;

public class User : IdentityUser<Guid>
{
    // Todo -> .ignore all unused
    // props from this class in
    // OnModelCreating().
}