# Bookstore Data Access Library

This library provides generated TypeScript clients for the Bookstore API based on the OpenAPI specification.

## Available Generated Clients

### 1. Angular HTTP Client (`BookstoreAngularService`) ⭐ **RECOMMENDED**
**Location:** `src/generated/angular-service.ts`
**Use Case:** Angular applications
**Features:**
- Angular HttpClient integration
- Injectable service with proper dependency injection
- RxJS observables
- TypeScript interfaces
- **Currently used in the bookstore app**

**Usage:**
```typescript
import { Injectable, inject } from '@angular/core';
import { BookstoreAngularService } from '@ng-mf/bookstore-data-access';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private bookstoreService = inject(BookstoreAngularService);
  
  getBooks() {
    return this.bookstoreService.getBooks();
  }
  
  getBooksOnSale() {
    return this.bookstoreService.getBooks(true);
  }
}
```

**Component Usage:**
```typescript
import { Component, inject } from '@angular/core';
import { BookstoreAngularService } from '@ng-mf/bookstore-data-access';

@Component({
  selector: 'app-books',
  template: `<div *ngFor="let book of books$ | async">{{ book.title }}</div>`
})
export class BooksComponent {
  private bookstoreService = inject(BookstoreAngularService);
  books$ = this.bookstoreService.getBooks();
}
```

### 2. Generated API Client (`Api`)
**Location:** `src/generated/angular-client.ts`
**Use Case:** General TypeScript applications
**Features:**
- Custom HTTP client
- Modular structure
- All API types and interfaces

### 3. Axios Client (`typescript-axios`)
**Location:** `src/generated/axios/`
**Use Case:** Node.js applications or browser with Axios
**Features:**
- Axios HTTP client
- Promise-based API
- TypeScript interfaces

**Usage:**
```typescript
import { Configuration, DefaultApi } from '@ng-mf/bookstore/data-access';

const config = new Configuration({
  basePath: 'http://localhost:3001'
});
const api = new DefaultApi(config);

// Get books
api.getBooks().then(response => {
  console.log(response.data);
});
```

### 4. NestJS Controllers (`typescript-nestjs`)
**Location:** `src/generated/nestjs/`
**Use Case:** NestJS backend applications
**Features:**
- NestJS controllers and DTOs
- Class validation decorators
- Class transformer support

**Usage:**
```typescript
import { BookController } from '@ng-mf/bookstore/data-access';

@Controller('books')
export class BookController {
  // Generated controller methods
}
```

## Generation Commands

### Prerequisites
- Docker (for OpenAPI generator)
- OR Java Runtime (if not using Docker)

### Generate All Clients
```bash
npm run generate-dtos
```

### Generate Specific Client
```bash
# Angular service (recommended for Angular apps)
npm run generate-angular-service

# Angular client (OpenAPI generator)
npm run generate-angular

# Axios client  
npm run generate-axios

# NestJS controllers
npm run generate-nestjs
```

### Using Nx Commands
```bash
# Generate all
nx run bookstore-data-access:generate-dtos

# Generate specific
nx run bookstore-data-access:generate-angular-service
nx run bookstore-data-access:generate-angular
nx run bookstore-data-access:generate-axios
nx run bookstore-data-access:generate-nestjs
```

## Current Implementation

The **bookstore app** is currently using the `BookstoreAngularService` through a wrapper service:

```typescript
// apps/bookstore/src/app/services/bookstore-nestjs.service.ts
import { Injectable, inject } from '@angular/core';
import { BookstoreAngularService } from '@ng-mf/bookstore-data-access';

@Injectable({
  providedIn: 'root',
})
export class BookstoreNestjsService {
  private bookstoreService = inject(BookstoreAngularService);

  getBooks(onSale?: boolean) {
    return this.bookstoreService.getBooks(onSale);
  }
  
  // ... other methods
}
```

## Configuration

The generation is configured in `openapitools.json` with the following options:

- **Angular Service:** Optimized for Angular applications with proper naming conventions
- **Axios Client:** Standard Axios integration with TypeScript
- **NestJS Controllers:** Full NestJS integration with validation and transformation

## API Specification

The clients are generated from `openapi.yaml` which defines the Bookstore API endpoints:

- `GET /v1/books` - Get list of books
- `GET /v1/books/{bookId}` - Get a specific book
- `POST /v1/books` - Create a new book
- `PUT /v1/books/{bookId}` - Update a book
- `DELETE /v1/books/{bookId}` - Delete a book

## Integration

Import the appropriate client in your application:

```typescript
// For Angular apps (recommended)
import { BookstoreAngularService } from '@ng-mf/bookstore/data-access';

// For Node.js apps
import { DefaultApi } from '@ng-mf/bookstore/data-access';

// For NestJS apps
import { BookController } from '@ng-mf/bookstore/data-access';
```

## Regeneration

To regenerate the clients after API changes:

```bash
# Regenerate Angular service (used by bookstore app)
npm run generate-angular-service

# Or regenerate all clients
npm run generate-dtos
```
