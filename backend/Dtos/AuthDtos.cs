using System.ComponentModel.DataAnnotations;

namespace BookApi.Dtos;

public record RegisterRequest(
    [Required, MinLength(3), MaxLength(50)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Username,

    [Required, MinLength(6), MaxLength(100)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Password
);

public record LoginRequest(
    [Required, MinLength(3), MaxLength(50)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Username,
    [Required, MinLength(6), MaxLength(100)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Password
);
public record AuthResponse(string Token, string Username);
