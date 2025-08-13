# Dashboard tRPC BFF

A Backend for Frontend (BFF) built with tRPC and Express, providing type-safe APIs for the Dashboard Angular application.

## Features

- **Full Type Safety**: End-to-end type inference from backend to frontend
- **Authentication**: JWT-based authentication with protected routes
- **Dashboard APIs**: Comprehensive dashboard data aggregation
- **Widget Management**: CRUD operations for dashboard widgets
- **Analytics**: Real-time analytics and metrics
- **Notifications**: User notification system

## Quick Start

### Development

```bash
# Start the BFF server
npm run serve-bff

# Start the dashboard app
npm run serve-dashboard

# Or start both together
npm run serve-all
```

### Production

```bash
# Build the BFF
npm run build-bff

# Build the dashboard
npm run build-dashboard
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### tRPC Endpoints
- `POST /trpc/*` - All tRPC procedures

## Available Procedures

### Dashboard Procedures
- `dashboard.getDashboardData` - Get complete dashboard data
- `dashboard.createWidget` - Create a new widget
- `dashboard.updateWidget` - Update an existing widget
- `dashboard.getUserWidgets` - Get user's widgets
- `dashboard.deleteWidget` - Delete a widget
- `dashboard.getAnalytics` - Get analytics data
- `dashboard.getNotifications` - Get user notifications
- `dashboard.markNotificationRead` - Mark notification as read

### Auth Procedures
- `auth.login` - User login
- `auth.register` - User registration
- `auth.me` - Get current user
- `auth.logout` - User logout
- `auth.refresh` - Refresh access token

## Type Safety

The BFF provides full type inference for all procedures. Types are automatically generated and shared between the backend and Angular frontend.

### Example Usage in Angular

```typescript
// The return type is automatically inferred!
const dashboardData$ = this.trpc.getDashboardData({
  userId: 'user-123',
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString()
  }
});

// TypeScript knows the exact shape of the response
dashboardData$.subscribe(data => {
  console.log(data.user.name); // Fully typed!
  console.log(data.analytics.revenue); // Fully typed!
});
```

## Authentication

The BFF uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Environment Variables

- `HOST` - Server host (default: localhost)
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## CORS Configuration

The BFF is configured to accept requests from:
- `http://localhost:4200` (Dashboard app)
- `http://localhost:4201` (Login app)

## Error Handling

All tRPC procedures include comprehensive error handling with detailed error messages and proper HTTP status codes.

## Development

### Adding New Procedures

1. Create a new router in `src/routers/`
2. Add the router to `src/app-router.ts`
3. Update the Angular service to include the new procedure
4. Types will be automatically inferred!

### Example Router

```typescript
// src/routers/example.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const exampleRouter = router({
  getData: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return { id: input.id, data: 'example' };
    }),
});
```

## Testing

```bash
# Run tests
nx test dashboard-trpc-bff

# Run tests in watch mode
nx test dashboard-trpc-bff --watch
```

## Deployment

The BFF can be deployed as a standard Node.js application. Make sure to:

1. Set appropriate environment variables
2. Configure CORS for production domains
3. Set up proper JWT secret keys
4. Configure database connections (replace mock data)
5. Set up monitoring and logging
