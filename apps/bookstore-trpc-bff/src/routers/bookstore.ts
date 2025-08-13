import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Input validation schemas based on OpenAPI spec
const BookIdInput = z.object({
  bookId: z.string(),
});

const BookCreateInput = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().positive('Price must be positive'),
  pageCount: z.number().int().positive('Page count must be a positive integer'),
  onSale: z.boolean().optional().default(false),
});

const BookUpdateInput = z.object({
  bookId: z.string(),
  title: z.string().min(1, 'Title is required'),
  price: z.number().positive('Price must be positive'),
  pageCount: z.number().int().positive('Page count must be a positive integer'),
  onSale: z.boolean(),
  lastUpdated: z.number().int(),
});

const GetBooksInput = z.object({
  onSale: z.boolean().optional().default(false),
});

// Book schema based on OpenAPI spec
const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  onSale: z.boolean(),
  pageCount: z.number().int(),
  lastUpdated: z.string(),
  lastUpdatedBy: z.string(),
});

export const bookstoreRouter = router({
  // Get a single book by ID
  getBook: publicProcedure
    .input(BookIdInput)
    .query(async ({ input }) => {
      const book = await getBookById(input.bookId);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    }),

  // Get list of books with optional onSale filter
  getBooks: publicProcedure
    .input(GetBooksInput)
    .query(async ({ input }) => {
      return await getBooks(input.onSale);
    }),

  // Create a new book
  createBook: publicProcedure
    .input(BookCreateInput)
    .mutation(async ({ input }) => {
      const book = await createBook(input);
      return book;
    }),

  // Update an existing book
  updateBook: publicProcedure
    .input(BookUpdateInput)
    .mutation(async ({ input }) => {
      const { bookId, ...updateData } = input;
      const book = await updateBook(bookId, updateData);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    }),

  // Delete a book
  deleteBook: publicProcedure
    .input(BookIdInput)
    .mutation(async ({ input }) => {
      const success = await deleteBook(input.bookId, 'system');
      if (!success) {
        throw new Error('Book not found or cannot be deleted');
      }
      return { success: true };
    }),
});

// Mock data functions - replace with your actual service calls
async function getBookById(bookId: string) {
  // Simulate database lookup
  const books = await getMockBooks();
  return books.find(book => book.id === bookId) || null;
}

async function getBooks(onSale = false) {
  const books = await getMockBooks();
  if (onSale) {
    return books.filter(book => book.onSale);
  }
  return books;
}

async function createBook(data: z.infer<typeof BookCreateInput>) {
  const newBook: z.infer<typeof BookSchema> = {
    id: `book-${Date.now()}`,
    title: data.title,
    price: data.price,
    pageCount: data.pageCount,
    onSale: data.onSale || false,
    lastUpdated: Date.now().toString(),
    lastUpdatedBy: 'system',
  };
  
  // In a real app, you would save to database here
  return newBook;
}

async function updateBook(bookId: string, data: Omit<z.infer<typeof BookUpdateInput>, 'bookId'>) {
  const existingBook = await getBookById(bookId);
  if (!existingBook) {
    return null;
  }

  // Check concurrency
  if (parseInt(existingBook.lastUpdated) !== data.lastUpdated) {
    throw new Error('Book has been modified since last read');
  }

  const updatedBook: z.infer<typeof BookSchema> = {
    ...existingBook,
    title: data.title,
    price: data.price,
    pageCount: data.pageCount,
    onSale: data.onSale,
    lastUpdated: Date.now().toString(),
    lastUpdatedBy: 'system',
  };

  // In a real app, you would update the database here
  return updatedBook;
}

async function deleteBook(bookId: string, userId: string) {
  const existingBook = await getBookById(bookId);
  if (!existingBook) {
    return false;
  }

  // In a real app, you would delete from database here
  return true;
}

async function getMockBooks(): Promise<z.infer<typeof BookSchema>[]> {
  return [
    {
      id: '1',
      title: 'The Great Gatsby',
      price: 12.99,
      onSale: true,
      pageCount: 180,
      lastUpdated: '1601901810913',
      lastUpdatedBy: 'admin',
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      price: 15.99,
      onSale: false,
      pageCount: 281,
      lastUpdated: '1601901810914',
      lastUpdatedBy: 'admin',
    },
    {
      id: '3',
      title: '1984',
      price: 11.99,
      onSale: true,
      pageCount: 328,
      lastUpdated: '1601901810915',
      lastUpdatedBy: 'admin',
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      price: 9.99,
      onSale: false,
      pageCount: 432,
      lastUpdated: '1601901810916',
      lastUpdatedBy: 'admin',
    },
    {
      id: '5',
      title: 'The Hobbit',
      price: 18.99,
      onSale: true,
      pageCount: 310,
      lastUpdated: '1601901810917',
      lastUpdatedBy: 'admin',
    },
  ];
}
