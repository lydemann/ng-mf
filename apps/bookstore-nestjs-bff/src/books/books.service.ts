import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { BookCreateDto } from './dto/book-create.dto';
import { BookUpdateDto } from './dto/book-update.dto';
import { Book } from '../../../../libs/bookstore/data-access/src/generated/angular/model/book.model';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: '1',
      title: 'Lord of the Flies',
      price: 60.55,
      onSale: true,
      pageCount: 224,
      lastUpdated: '1601901810913',
      lastUpdatedBy: 'xxx-user',
    },
    {
      id: '2',
      title: 'The Great Gatsby',
      price: 45.99,
      onSale: false,
      pageCount: 180,
      lastUpdated: '1601901810914',
      lastUpdatedBy: 'xxx-user',
    },
    {
      id: '3',
      title: 'To Kill a Mockingbird',
      price: 35.50,
      onSale: true,
      pageCount: 281,
      lastUpdated: '1601901810915',
      lastUpdatedBy: 'xxx-user',
    },
  ];

  async findAll(onSale?: boolean): Promise<Book[]> {
    if (onSale !== undefined) {
      return this.books.filter(book => book.onSale === onSale);
    }
    return this.books;
  }

  async findOne(id: string): Promise<Book> {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(bookCreate: BookCreateDto): Promise<Book> {
    const newBook: Book = {
      id: (this.books.length + 1).toString(),
      title: bookCreate.title,
      price: bookCreate.price,
      onSale: bookCreate.onSale || false,
      pageCount: bookCreate.pageCount,
      lastUpdated: Date.now().toString(),
      lastUpdatedBy: 'xxx-user',
    };

    this.books.push(newBook);
    return newBook;
  }

  async update(id: string, bookUpdate: BookUpdateDto): Promise<Book> {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const existingBook = this.books[bookIndex];
    
    // Check concurrency
    if (parseInt(existingBook.lastUpdated || '0') !== bookUpdate.lastUpdated) {
      throw new BadRequestException('Book has been modified since last read');
    }

    const updatedBook: Book = {
      ...existingBook,
      title: bookUpdate.title,
      price: bookUpdate.price,
      onSale: bookUpdate.onSale,
      pageCount: bookUpdate.pageCount,
      lastUpdated: Date.now().toString(),
      lastUpdatedBy: 'xxx-user',
    };

    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.books.splice(bookIndex, 1);
  }
}
