using System.Text;
using Backend.Data;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// JWT bearer config vars

var secret = builder.Configuration["Jwt:Secret"];
if(string.IsNullOrEmpty(secret))
{
    throw new ArgumentNullException("Secret key cannot be null.");
}

var issuer = builder.Configuration["Jwt:Issuer"];
if (string.IsNullOrEmpty(issuer))
{
    throw new ArgumentNullException("Issuer cannot be null.");
}

var audience = builder.Configuration["Jwt:Audience"];
if(string.IsNullOrEmpty(audience))
{
    throw new ArgumentNullException("Audience cannot be null.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<ITokenProviderService, TokenProviderService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    // todo on FE: if 401 unauthorized is returned to the FE, redirect the user to the login page
    options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();

app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();