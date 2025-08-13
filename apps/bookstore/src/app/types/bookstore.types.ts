// Bookstore API Types based on OpenAPI specification
export interface Book {
  id: string;
  title: string;
  price: number;
  onSale: boolean;
  pageCount: number;
  lastUpdated: string;
  lastUpdatedBy: string;
}

export interface CreateBookInput {
  title: string;
  price: number;
  pageCount: number;
  onSale?: boolean;
}

export interface UpdateBookInput {
  bookId: string;
  title: string;
  price: number;
  pageCount: number;
  onSale: boolean;
  lastUpdated: number;
}

export interface GetBooksInput {
  onSale?: boolean;
}

export interface BookIdInput {
  bookId: string;
}

// tRPC Router type (simplified for Angular client)
export interface BookstoreRouter {
  getBooks: {
    input: GetBooksInput;
    output: Book[];
  };
  getBook: {
    input: BookIdInput;
    output: Book;
  };
  createBook: {
    input: CreateBookInput;
    output: Book;
  };
  updateBook: {
    input: UpdateBookInput;
    output: Book;
  };
  deleteBook: {
    input: BookIdInput;
    output: { success: boolean };
  };
}

export interface AppRouter {
  bookstore: BookstoreRouter;
}
