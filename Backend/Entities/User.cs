namespace Backend.Entities;

public class User
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string PasswordHash { get; set; }
    public string Email { get; set; }
    public bool EmailVerified { get; set; }

    public string IsEmailVerified()
    {
        if (EmailVerified)
        {
            return "true";
        }
        else
        {
            return "false";
        }   
    }