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
[Route("api/quotes")]
public class QuotesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<QuoteResponse>>> GetAll()
    {
        var userId = GetUserId();
        var quotes = await db.Quotes
            .Where(q => q.OwnerId == userId)
            .OrderByDescending(q => q.Id)
            .Select(q => new QuoteResponse(q.Id, q.Text, q.Author))
            .ToListAsync();
        return Ok(quotes);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<QuoteResponse>> GetById(int id)
    {
        var userId = GetUserId();
        var quote = await db.Quotes
            .Where(q => q.OwnerId == userId && q.Id == id)
            .Select(q => new QuoteResponse(q.Id, q.Text, q.Author))
            .FirstOrDefaultAsync();
        return quote is null ? NotFound() : Ok(quote);
    }

    [HttpPost]
    public async Task<ActionResult<QuoteResponse>> Create(QuoteRequest request)
    {
        var userId = GetUserId();
        var quote = new Quote
        {
            Text = request.Text,
            Author = request.Author,
            OwnerId = userId
        };

        db.Quotes.Add(quote);
        await db.SaveChangesAsync();

        var response = new QuoteResponse(quote.Id, quote.Text, quote.Author);
        return CreatedAtAction(nameof(GetById), new { id = quote.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<QuoteResponse>> Update(int id, QuoteRequest request)
    {
        var userId = GetUserId();
        var quote = await db.Quotes.FirstOrDefaultAsync(q => q.OwnerId == userId && q.Id == id);
        if (quote is null) return NotFound();

        quote.Text = request.Text;
        quote.Author = request.Author;
        await db.SaveChangesAsync();

        return Ok(new QuoteResponse(quote.Id, quote.Text, quote.Author));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetUserId();
        var quote = await db.Quotes.FirstOrDefaultAsync(q => q.OwnerId == userId && q.Id == id);
        if (quote is null) return NotFound();

        db.Quotes.Remove(quote);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private int GetUserId()
    {
        var raw = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.Parse(raw ?? "0");
    }
}
