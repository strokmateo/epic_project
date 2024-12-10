using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Backend.Entities;
using Backend.Services.Interfaces;
using System.IdentityModel.Tokens;

namespace Backend.Services
{
    internal sealed class TokenProviderService(IConfiguration configuration) : ITokenProviderService
    {
        public string GenerateToken(User user)
        {
            string secretKey = configuration["Jwt:Secret"]!;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor 
            {
                Subject = new ClaimsIdentity(
                    [
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString(),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
                        new Claim("email_verified", user.EmailVerified.Tostring())
                    ])
            }
        }
    }
}
