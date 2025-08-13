import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import type { Book, CreateBookInput, UpdateBookInput, GetBooksInput } from '../types/bookstore.types';

@Injectable({
  providedIn: 'root',
})
export class TrpcService {
  private baseUrl = 'http://localhost:3001/trpc';
  private http = inject(HttpClient);

  // Get books with optional filter
  getBooks(input: GetBooksInput): Observable<Book[]> {
    const params = new URLSearchParams();
    params.set('input', JSON.stringify(input));
    
    return this.http.get<{ result: { data: Book[] } }>(`${this.baseUrl}/bookstore.getBooks?${params.toString()}`)
      .pipe(
        map(response => response.result.data)
      );
  }

  // Get a single book by ID
  getBook(bookId: string): Observable<Book> {
    const params = new URLSearchParams();
    params.set('input', JSON.stringify({ bookId }));
    
    return this.http.get<{ result: { data: Book } }>(`${this.baseUrl}/bookstore.getBook?${params.toString()}`)
      .pipe(
        map(response => response.result.data)
      );
  }

  // Create a new book
  createBook(input: CreateBookInput): Observable<Book> {
    return this.http.post<{ result: { data: Book } }>(`${this.baseUrl}/bookstore.createBook`, input)
      .pipe(
        map(response => response.result.data)
      );
  }

  // Update an existing book
  updateBook(input: UpdateBookInput): Observable<Book> {
    return this.http.post<{ result: { data: Book } }>(`${this.baseUrl}/bookstore.updateBook`, input)
      .pipe(
        map(response => response.result.data)
      );
  }

  // Delete a book
  deleteBook(bookId: string): Observable<{ success: boolean }> {
    return this.http.post<{ result: { data: { success: boolean } } }>(`${this.baseUrl}/bookstore.deleteBook`, { bookId })
      .pipe(
        map(response => response.result.data)
      );
  }
}
