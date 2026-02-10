using BookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Quote> Quotes => Set<Quote>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<Book>()
            .HasOne(b => b.Owner)
            .WithMany(u => u.Books)
            .HasForeignKey(b => b.OwnerId);

        modelBuilder.Entity<Quote>()
            .HasOne(q => q.Owner)
            .WithMany(u => u.Quotes)
            .HasForeignKey(q => q.OwnerId);
    }
}
