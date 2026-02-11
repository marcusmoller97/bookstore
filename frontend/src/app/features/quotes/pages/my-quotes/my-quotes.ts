import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuotesService, Quote } from '../../service/quotes.service';

@Component({
  selector: 'app-my-quotes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-quotes.html',
  styleUrl: './my-quotes.scss',
})
export class MyQuotes {
  quotes: Quote[] = [];
  error = '';

  constructor(private store: QuotesService) {
    this.refresh();
  }

  refresh() {
    this.error = '';
    this.store.getAll().subscribe({
      next: (quotes) => (this.quotes = quotes),
      error: () => {
        this.error = 'Kunde inte hämta citat. Kontrollera att du är inloggad.';
      }
    });
  }

  deleteQuote(id: number) {
    if (!confirm('Är du säker på att du vill radera citatet?')) return;
    this.store.remove(id).subscribe({
      next: () => this.refresh(),
      error: () => {
        this.error = 'Kunde inte radera citatet.';
      }
    });
  }

  isMaxedReached(): boolean {
    return this.quotes.length >= 5;
  }

  isEmpty(): boolean {
    return this.quotes.length === 0;
  }
}
