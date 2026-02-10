namespace BookApi.Dtos;

public record BookRequest(string Title, string Author, DateOnly PublishedDate);
public record BookResponse(int Id, string Title, string Author, DateOnly PublishedDate);
