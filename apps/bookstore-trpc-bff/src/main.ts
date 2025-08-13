import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './app-router';
import { createContext } from './trpc';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration for your Angular apps
app.use(cors({
  origin: [
    'http://localhost:4200', // Dashboard app
    'http://localhost:4201', // Login app
    'http://localhost:4202', // Bookstore app
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'bookstore-trpc-bff'
  });
});

// tRPC middleware
app.use('/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
  onError: ({ error, path, input, ctx, type }) => {
    console.error('tRPC Error:', {
      path,
      type,
      error: error.message,
      input,
      userId: ctx?.user?.id,
    });
  },
}));

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Express Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, host, () => {
  console.log(`🚀 Bookstore tRPC BFF server running on http://${host}:${port}`);
  console.log(`📊 tRPC endpoint: http://${host}:${port}/trpc`);
  console.log(`❤️  Health check: http://${host}:${port}/health`);
});
