import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

export type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
};

export type BookPayload = Omit<Book, 'id'>;

@Injectable({ providedIn: 'root' })
export class BookStoreService {
  private readonly baseUrl = 'http://localhost:5017/api/books';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  private authHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl, { headers: this.authHeaders() });
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }

  create(input: BookPayload): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, input, { headers: this.authHeaders() });
  }

  update(id: number, input: BookPayload): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, input, { headers: this.authHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }
}
