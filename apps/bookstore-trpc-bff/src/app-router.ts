import { router } from './trpc';
import { bookstoreRouter } from './routers/bookstore';
import { authRouter } from './routers/auth';

export const appRouter = router({
  bookstore: bookstoreRouter,
  auth: authRouter,
});

// Export type for use in Angular client
export type AppRouter = typeof appRouter;
