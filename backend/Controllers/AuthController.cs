using System.Security.Cryptography;
using System.Text;
using BookApi.Data;
using BookApi.Dtos;
using BookApi.Models;
using BookApi.Services;
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

        CreatePasswordHash(request.Password, out var hash, out var salt);
        var user = new User
        {
            Username = request.Username,
            PasswordHash = hash,
            PasswordSalt = salt
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

        if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
        {
            return Unauthorized("Fel användarnamn eller lösenord.");
        }

        var token = tokenService.CreateToken(user);
        return Ok(new AuthResponse(token, user.Username));
    }

    private static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA256();
        salt = hmac.Key;
        hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    private static bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
    {
        using var hmac = new HMACSHA256(salt);
        var computed = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computed.SequenceEqual(hash);
    }
}
