import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: string;
  title: string;
  price?: number;
  onSale?: boolean;
  pageCount?: number;
  lastUpdated?: string;
  lastUpdatedBy?: string;
}

export interface BookCreate {
  title: string;
  onSale?: boolean;
  pageCount: number;
  price: number;
}

export interface BookUpdate {
  title: string;
  lastUpdated: number;
  onSale: boolean;
  pageCount: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookstoreNestjsService {
  private baseUrl = 'http://localhost:3001/v1/books';
  private http = inject(HttpClient);

  // Get books with optional filter
  getBooks(onSale?: boolean): Observable<Book[]> {
    let url = this.baseUrl;
    if (onSale !== undefined) {
      url += `?onSale=${onSale}`;
    }
    return this.http.get<Book[]>(url);
  }

  // Get a single book by ID
  getBook(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }

  // Create a new book
  createBook(bookCreate: BookCreate): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, bookCreate);
  }

  // Update an existing book
  updateBook(bookId: string, bookUpdate: BookUpdate): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${bookId}`, bookUpdate);
  }

  // Delete a book
  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${bookId}`);
  }
}
