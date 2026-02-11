import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type Quote = {
  id: number;
  text: string;
  author: string;
}

export type QuotePayload = Omit<Quote, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/quotes`;
  
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
  }

  private authHeaders() {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  getAll(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.baseUrl, { headers: this.authHeaders() });
  }

  create(input: QuotePayload): Observable<Quote> {
    return this.http.post<Quote>(this.baseUrl, input, { headers: this.authHeaders() });
  }

  update(id: number, input: QuotePayload): Observable<Quote> {
    return this.http.put<Quote>(`${this.baseUrl}/${id}`, input, { headers: this.authHeaders() });
  }
  
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }

  getById(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() });
  }
}
