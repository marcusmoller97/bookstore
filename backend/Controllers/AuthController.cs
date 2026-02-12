using BookApi.Data;
using BookApi.Dtos;
using BookApi.Models;
using BookApi.Services;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(AppDbContext db, TokenService tokenService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        var exists = await db.Users.AnyAsync(u => u.Username == request.Username);
        if (exists)
        {
            return BadRequest("Användarnamnet är redan taget.");
        }

        var user = new User
        {
            Username = request.Username,
            PasswordHash = HashPassword(request.Password),
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        var token = tokenService.CreateToken(user);
        return Ok(new AuthResponse(token, user.Username));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        if (user == null) return Unauthorized("Fel användarnamn eller lösenord.");

        if (!VerifyPasswordHash(request.Password, user.PasswordHash))
        {
            return Unauthorized("Fel användarnamn eller lösenord.");
        }

        var token = tokenService.CreateToken(user);
        return Ok(new AuthResponse(token, user.Username));
    }

    private static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    private static bool VerifyPasswordHash(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}
