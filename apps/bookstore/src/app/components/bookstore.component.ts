import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import type { Book, CreateBookInput } from '../types/bookstore.types';
import { TrpcService } from '../services/trpc.service';

@Component({
  selector: 'ng-mf-bookstore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.scss'],
})
export class BookstoreComponent implements OnInit {
  private trpc = inject(TrpcService);

  books: Book[] = [];
  loading = false;
  error: string | null = null;
  showOnSaleOnly = false;
  showCreateForm = false;

  // Form data for creating new books
  newBook: CreateBookInput = {
    title: '',
    price: 0,
    pageCount: 0,
    onSale: false,
  };

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {
    this.loading = true;
    this.error = null;

    try {
      this.books = await firstValueFrom(this.trpc.getBooks({
        onSale: this.showOnSaleOnly,
      }));
    } catch (err) {
      this.error = 'Failed to load books';
      console.error('Error loading books:', err);
    } finally {
      this.loading = false;
    }
  }

  async createBook() {
    if (!this.newBook.title || this.newBook.price <= 0 || this.newBook.pageCount <= 0) {
      this.error = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const createdBook = await firstValueFrom(this.trpc.createBook(this.newBook));
      this.books.push(createdBook);
      this.resetForm();
      this.showCreateForm = false;
    } catch (err) {
      this.error = 'Failed to create book';
      console.error('Error creating book:', err);
    } finally {
      this.loading = false;
    }
  }

  async deleteBook(bookId: string) {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await firstValueFrom(this.trpc.deleteBook(bookId));
      this.books = this.books.filter(book => book.id !== bookId);
    } catch (err) {
      this.error = 'Failed to delete book';
      console.error('Error deleting book:', err);
    } finally {
      this.loading = false;
    }
  }

  toggleOnSaleFilter() {
    this.showOnSaleOnly = !this.showOnSaleOnly;
    this.loadBooks();
  }

  resetForm() {
    this.newBook = {
      title: '',
      price: 0,
      pageCount: 0,
      onSale: false,
    };
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  formatDate(dateString: string): string {
    return new Date(parseInt(dateString)).toLocaleDateString();
  }
}
