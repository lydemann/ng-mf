import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// Context type
export interface Context {
  req: CreateExpressContextOptions['req'];
  res: CreateExpressContextOptions['res'];
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Create context function
export async function createContext({ req, res }: CreateExpressContextOptions): Promise<Context> {
  // Extract user from JWT token or session
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  let user: Context['user'] | undefined;
  
  if (token) {
    try {
      // In a real app, you'd verify the JWT token here
      // For now, we'll simulate a user
      user = {
        id: 'user-123',
        email: 'user@example.com',
        role: 'admin'
      };
    } catch (error) {
      // Token is invalid, user remains undefined
    }
  }

  return {
    req,
    res,
    user,
  };
}

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware for authentication
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource'
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(isAuthed);
