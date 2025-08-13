# Bookstore NestJS BFF

This is a NestJS Backend for Frontend (BFF) application for the bookstore functionality. It provides a REST API that follows the OpenAPI specification and replaces the tRPC implementation.

## Features

- **REST API**: Full CRUD operations for books
- **OpenAPI Documentation**: Auto-generated Swagger documentation
- **Validation**: Request/response validation using class-validator
- **TypeScript**: Fully typed with interfaces and DTOs
- **Nx Integration**: Built using Nx best practices

## API Endpoints

### Books

- `GET /v1/books` - Get all books (with optional `onSale` filter)
- `GET /v1/books/:bookId` - Get a specific book
- `POST /v1/books` - Create a new book
- `PUT /v1/books/:bookId` - Update an existing book
- `DELETE /v1/books/:bookId` - Delete a book

## Development

### Prerequisites

- Node.js (v18 or higher)
- Nx CLI

### Installation

```bash
npm install
```

### Running the Application

```bash
# Development mode
npx nx serve bookstore-nestjs-bff

# Production build
npx nx build bookstore-nestjs-bff
```

### Testing

```bash
# Unit tests
npx nx test bookstore-nestjs-bff

# E2E tests
npx nx e2e bookstore-nestjs-bff-e2e
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3001/api
```

## Architecture

### Structure

```
src/
├── app.module.ts              # Main application module
├── main.ts                    # Application entry point
├── models/                    # TypeScript interfaces
│   └── index.ts
├── books/                     # Books feature module
│   ├── books.module.ts        # Books module
│   ├── books.controller.ts    # REST controller
│   ├── books.service.ts       # Business logic
│   ├── books.service.spec.ts  # Unit tests
│   └── dto/                   # Data Transfer Objects
│       ├── book.dto.ts
│       ├── book-create.dto.ts
│       └── book-update.dto.ts
└── openapi.yaml               # OpenAPI specification
```

### Key Components

1. **BooksController**: Handles HTTP requests and responses
2. **BooksService**: Contains business logic and data management
3. **DTOs**: Data Transfer Objects for validation and documentation
4. **Models**: TypeScript interfaces for type safety

## Integration with Frontend

The bookstore Angular application has been updated to use this NestJS BFF instead of the tRPC implementation. The new service (`BookstoreNestjsService`) communicates with the REST API endpoints.

## Configuration

The application runs on port 3001 by default. You can change this by setting the `PORT` environment variable.

## OpenAPI Specification

The API follows the OpenAPI 3.0.2 specification defined in `openapi.yaml`. This specification includes:

- Complete API documentation
- Request/response schemas
- Error handling
- Examples

## Error Handling

The application includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **409 Conflict**: Concurrency conflicts (for updates)

## Validation

All incoming requests are validated using class-validator decorators:

- Required field validation
- Type validation
- Range validation (e.g., minimum values)
- String length validation

## Testing

The application includes unit tests for the service layer, covering:

- CRUD operations
- Error scenarios
- Edge cases
- Business logic validation
