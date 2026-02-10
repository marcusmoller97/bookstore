using System.Security.Claims;
using BookApi.Data;
using BookApi.Dtos;
using BookApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookApi.Controllers;

[ApiController]
[Authorize]
[Route("api/books")]
public class BooksController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<BookResponse>>> GetAll()
    {
        var userId = GetUserId();
        var books = await db.Books
            .Where(b => b.OwnerId == userId)
            .OrderByDescending(b => b.Id)
            .Select(b => new BookResponse(b.Id, b.Title, b.Author, b.PublishedDate))
            .ToListAsync();
        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BookResponse>> GetById(int id)
    {
        var userId = GetUserId();
        var book = await db.Books
            .Where(b => b.OwnerId == userId && b.Id == id)
            .Select(b => new BookResponse(b.Id, b.Title, b.Author, b.PublishedDate))
            .FirstOrDefaultAsync();
        return book is null ? NotFound() : Ok(book);
    }

    [HttpPost]
    public async Task<ActionResult<BookResponse>> Create(BookRequest request)
    {
        var userId = GetUserId();
        var book = new Book
        {
            Title = request.Title,
            Author = request.Author,
            PublishedDate = request.PublishedDate,
            OwnerId = userId
        };

        db.Books.Add(book);
        await db.SaveChangesAsync();

        var response = new BookResponse(book.Id, book.Title, book.Author, book.PublishedDate);
        return CreatedAtAction(nameof(GetById), new { id = book.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BookResponse>> Update(int id, BookRequest request)
    {
        var userId = GetUserId();
        var book = await db.Books.FirstOrDefaultAsync(b => b.OwnerId == userId && b.Id == id);
        if (book is null) return NotFound();

        book.Title = request.Title;
        book.Author = request.Author;
        book.PublishedDate = request.PublishedDate;
        await db.SaveChangesAsync();

        return Ok(new BookResponse(book.Id, book.Title, book.Author, book.PublishedDate));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetUserId();
        var book = await db.Books.FirstOrDefaultAsync(b => b.OwnerId == userId && b.Id == id);
        if (book is null) return NotFound();

        db.Books.Remove(book);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private int GetUserId()
    {
        var raw = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.Parse(raw ?? "0");
    }
}
