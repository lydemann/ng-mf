import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookstoreBffService, Book, BookCreate, BookUpdate } from '@ng-mf/bookstore-data-access';

// Re-export types so components can import from service
export type { Book, BookCreate, BookUpdate } from '@ng-mf/bookstore-data-access';

@Injectable({
  providedIn: 'root',
})
export class BookstoreNestjsService {
  private bookstoreService = inject(BookstoreBffService);

  // Get books with optional filter
  getBooks(onSale?: boolean): Observable<Book[]> {
    return this.bookstoreService.getBooks(onSale);
  }

  // Get a single book by ID
  getBook(bookId: string): Observable<Book> {
    return this.bookstoreService.getBook(bookId);
  }

  // Create a new book
  createBook(bookCreate: BookCreate): Observable<Book> {
    return this.bookstoreService.createBook(bookCreate);
  }

  // Update an existing book
  updateBook(bookId: string, bookUpdate: BookUpdate): Observable<Book> {
    return this.bookstoreService.updateBook(bookId, bookUpdate);
  }

  // Delete a book
  deleteBook(bookId: string): Observable<void> {
    return this.bookstoreService.deleteBook(bookId);
  }
}
