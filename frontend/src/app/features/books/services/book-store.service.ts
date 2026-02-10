import { Injectable } from '@angular/core';

export type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
};

const STORAGE_KEY = 'demo_books';

@Injectable({ providedIn: 'root' })
export class BookStoreService {
  private seedIfEmpty() {
    const existing = this.read();
    if (existing.length > 0) return;
    const seed: Book[] = [
      { id: 1, title: 'Mörk materia', author: 'Blake Crouch', publishedDate: '2016-07-26' },
      { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', publishedDate: '2021-05-04' },
      { id: 3, title: 'Hundraåringen', author: 'Jonas Jonasson', publishedDate: '2009-08-17' },
    ];
    this.write(seed);
  }

  private read(): Book[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Book[]) : [];
    } catch {
      return [];
    }
  }

  private write(books: Book[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }

  getAll(): Book[] {
    this.seedIfEmpty();
    return this.read();
  }

  getById(id: number): Book | undefined {
    return this.getAll().find((book) => book.id === id);
  }

  create(input: Omit<Book, 'id'>): Book {
    const books = this.getAll();
    const nextId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    const book: Book = { id: nextId, ...input };
    this.write([...books, book]);
    return book;
  }

  update(id: number, input: Omit<Book, 'id'>): Book | undefined {
    const books = this.getAll();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    const updated: Book = { id, ...input };
    const next = [...books];
    next[index] = updated;
    this.write(next);
    return updated;
  }

  remove(id: number) {
    const books = this.getAll();
    this.write(books.filter((b) => b.id !== id));
  }
}
