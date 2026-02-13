using System.ComponentModel.DataAnnotations;

namespace BookApi.Dtos;

public record BookRequest(
    [Required, MinLength(2), MaxLength(100)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Title,
    [Required, MinLength(2), MaxLength(100)]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "HTML är inte tillåtet.")]
    string Author,
    [Required]
    DateOnly PublishedDate
);

public record BookResponse(int Id, string Title, string Author, DateOnly PublishedDate);
