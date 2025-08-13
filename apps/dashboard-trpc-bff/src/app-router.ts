import { router } from './trpc';
import { dashboardRouter } from './routers/dashboard';
import { authRouter } from './routers/auth';

export const appRouter = router({
  dashboard: dashboardRouter,
  auth: authRouter,
});

// Export type for use in Angular client
export type AppRouter = typeof appRouter;
