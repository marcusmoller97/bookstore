using System.ComponentModel.DataAnnotations;

namespace BookApi.Dtos;

public record RegisterRequest(
    [Required]
    [MinLength(3)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Username,

    [Required]
    [MinLength(6)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Password
);
public record LoginRequest(string Username, string Password);
public record AuthResponse(string Token, string Username);
