namespace BookApi.Dtos;

public record QuoteRequest(string Text, string Author);
public record QuoteResponse(int Id, string Text, string Author);
