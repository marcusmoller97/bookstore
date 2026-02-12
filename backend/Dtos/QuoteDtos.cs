using System.ComponentModel.DataAnnotations;

namespace BookApi.Dtos;

public record QuoteRequest(
    [Required, MinLength(2)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Text,
    [Required, MinLength(2)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Author
    );
public record QuoteResponse(int Id, string Text, string Author);
