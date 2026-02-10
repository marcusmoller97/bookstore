import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookStoreService, Book } from '../../services/book-store.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  books: Book[] = [];

  constructor(private store: BookStoreService) {
    this.refresh();
  }

  refresh() {
    this.books = this.store.getAll();
  }

  deleteBook(id: number) {
    if (!confirm('Är du säker på att du vill radera boken?')) return;
    this.store.remove(id);
    this.refresh();
  }

}
