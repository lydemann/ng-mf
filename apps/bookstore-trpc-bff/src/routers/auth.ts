import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

const LoginInput = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const RegisterInput = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
});

export const authRouter = router({
  // Login procedure
  login: publicProcedure
    .input(LoginInput)
    .mutation(async ({ input }) => {
      // In a real app, you'd validate credentials against your database
      const { email, password } = input;
      
      // Simulate authentication
      if (email === 'user@example.com' && password === 'password123') {
        const user = {
          id: 'user-123',
          email: 'user@example.com',
          name: 'John Doe',
          role: 'admin',
        };

        // In a real app, you'd generate a JWT token here
        const token = `mock-jwt-token-${Date.now()}`;

        return {
          user,
          token,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        };
      }

      throw new Error('Invalid credentials');
    }),

  // Register procedure
  register: publicProcedure
    .input(RegisterInput)
    .mutation(async ({ input }) => {
      const { email, password, name } = input;
      
      // In a real app, you'd create a new user in your database
      const user = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'user',
      };

      // In a real app, you'd generate a JWT token here
      const token = `mock-jwt-token-${Date.now()}`;

      return {
        user,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
    }),

  // Get current user (requires authentication)
  me: protectedProcedure
    .query(async ({ ctx }) => {
      return {
        id: ctx.user.id,
        email: ctx.user.email,
        role: ctx.user.role,
        name: 'John Doe', // In a real app, this would come from the database
      };
    }),

  // Logout procedure
  logout: protectedProcedure
    .mutation(async ({ ctx }) => {
      // In a real app, you'd invalidate the token
      return { success: true };
    }),

  // Refresh token
  refresh: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      // In a real app, you'd validate the refresh token and generate a new access token
      const newToken = `mock-jwt-token-${Date.now()}`;
      
      return {
        token: newToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
    }),
});
