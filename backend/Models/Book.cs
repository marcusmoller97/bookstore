namespace BookApi.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public DateOnly PublishedDate { get; set; }

    public int OwnerId { get; set; }
    public User? Owner { get; set; }
}
