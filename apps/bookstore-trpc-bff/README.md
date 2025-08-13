# Bookstore tRPC BFF

This is a Backend for Frontend (BFF) service for the Bookstore application, built with tRPC and Express.js. It provides a type-safe API layer that follows the OpenAPI specification for bookstore operations.

## Features

- **Type-safe API**: Built with tRPC for end-to-end type safety
- **OpenAPI Compliance**: Follows the provided OpenAPI 3.0.2 specification
- **REST-like Operations**: Implements all CRUD operations for books
- **Concurrency Control**: Handles optimistic locking with `lastUpdated` timestamps
- **Filtering**: Supports filtering books by sale status
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

## API Endpoints

### Books

- `GET /trpc/bookstore.getBooks` - Get list of books (with optional `onSale` filter)
- `GET /trpc/bookstore.getBook` - Get a single book by ID
- `POST /trpc/bookstore.createBook` - Create a new book
- `PUT /trpc/bookstore.updateBook` - Update an existing book
- `DELETE /trpc/bookstore.deleteBook` - Delete a book

## Data Models

### Book Schema
```typescript
{
  id: string;
  title: string;
  price: number;
  onSale: boolean;
  pageCount: number;
  lastUpdated: string;
  lastUpdatedBy: string;
}
```

### Create Book Input
```typescript
{
  title: string;
  price: number;
  pageCount: number;
  onSale?: boolean;
}
```

### Update Book Input
```typescript
{
  bookId: string;
  title: string;
  price: number;
  pageCount: number;
  onSale: boolean;
  lastUpdated: number; // For concurrency control
}
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Running the Server
```bash
# Development
npm run serve

# Production
npm run build
npm start
```

The server will start on `http://localhost:3001` by default.

### Environment Variables
- `HOST` - Server host (default: localhost)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## OpenAPI Integration

This BFF implements the following OpenAPI specification endpoints:

### `/v1/books/{bookId}`
- **GET**: Retrieve a single book
- **PUT**: Update a book (with concurrency control)
- **DELETE**: Delete a book

### `/v1/books`
- **GET**: List books with optional `onSale` query parameter
- **POST**: Create a new book

## Error Handling

The BFF follows the OpenAPI error response schema:

```typescript
{
  message: string;
  errors: Array<{
    reason: string;
    description: string;
    identifier?: string;
  }>;
  timestamp: string;
}
```

## Type Safety

The tRPC router automatically generates TypeScript types that can be imported by the Angular frontend:

```typescript
import type { AppRouter } from '../../../bookstore-trpc-bff/src/app-router';
```

This ensures complete type safety between the frontend and backend.

## Mock Data

Currently, the BFF uses mock data for demonstration purposes. In a production environment, you would:

1. Replace the mock functions with actual database calls
2. Implement proper authentication and authorization
3. Add input validation middleware
4. Set up proper logging and monitoring
5. Configure CORS for production domains

## Testing

```bash
npm test
```

## Health Check

The server provides a health check endpoint at `/health` that returns:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "bookstore-trpc-bff"
}
```
