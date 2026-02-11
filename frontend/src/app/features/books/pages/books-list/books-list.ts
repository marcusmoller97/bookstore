import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookStoreService, Book } from '../../services/book-store.service';
import { ConfirmChoice } from '../../../utils/confirm-choice/confirm-choice';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmChoice],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  books: Book[] = [];
  error = '';

  constructor(private store: BookStoreService) {
    this.refresh();
  }

  refresh() {
    this.error = '';
    this.store.getAll().subscribe({
      next: (books) => (this.books = books),
      error: () => {
        this.error = 'Kunde inte hämta böcker. Kontrollera att du är inloggad.';
      },
    });
  }

  @ViewChild(ConfirmChoice) confirmChoice!: ConfirmChoice;
  
  deleteBook(id: number) {
    this.confirmChoice.show('Är du säker på att du vill radera boken?', () => {
      this.store.remove(id).subscribe({
        next: () => this.refresh(),
        error: () => {
          this.error = 'Kunde inte radera boken.';
        },
      });
    });
  }
}
