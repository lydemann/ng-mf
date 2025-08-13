import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../trpc';

// Input validation schemas - these will be inferred in your Angular client
const GetDashboardDataInput = z.object({
  userId: z.string(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
});

const CreateWidgetInput = z.object({
  name: z.string().min(1, 'Widget name is required'),
  type: z.enum(['chart', 'metric', 'list']),
  config: z.record(z.any()),
});

const UpdateWidgetInput = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  config: z.record(z.any()).optional(),
});

export const dashboardRouter = router({
  // Get dashboard data with full type inference
  getDashboardData: publicProcedure
    .input(GetDashboardDataInput)
    .query(async ({ input, ctx }) => {
      const { userId, dateRange } = input;
      
      // Simulate data aggregation from multiple services
      const [userData, analytics, notifications, widgets] = await Promise.all([
        getUserData(userId),
        getAnalytics(userId, dateRange),
        getNotifications(userId),
        getUserWidgets(userId),
      ]);

      // Return type is automatically inferred! Analytics is always present
      return {
        user: userData,
        analytics, // This will always be defined
        notifications,
        widgets,
        lastUpdated: new Date().toISOString(),
      };
    }),

  // Create a new widget
  createWidget: publicProcedure
    .input(CreateWidgetInput.extend({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const widget = await createWidget({
        ...input,
        userId: input.userId,
      });

      return widget;
    }),

  // Update an existing widget
  updateWidget: publicProcedure
    .input(UpdateWidgetInput.extend({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const widget = await updateWidget(input.id, {
        ...input,
        userId: input.userId,
      });

      return widget;
    }),

  // Get user widgets
  getUserWidgets: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await getUserWidgets(input.userId);
    }),

  // Delete a widget
  deleteWidget: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await deleteWidget(input.id, ctx.user.id);
      return { success: true };
    }),

  // Get analytics data
  getAnalytics: publicProcedure
    .input(z.object({
      userId: z.string(),
      dateRange: z.object({
        start: z.string().datetime(),
        end: z.string().datetime(),
      }).optional(),
    }).optional())
    .query(async ({ input }) => {
      return await getAnalytics(input?.userId || 'default-user', input?.dateRange);
    }),

  // Get notifications
  getNotifications: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await getNotifications(input.userId);
    }),

  // Mark notification as read
  markNotificationRead: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      await markNotificationRead(input.id, input.userId);
      return { success: true };
    }),
});

// Mock data functions - replace with your actual service calls
async function getUserData(userId: string) {
  return {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://via.placeholder.com/150',
    lastLogin: new Date().toISOString(),
  };
}

async function getAnalytics(userId: string, dateRange?: { start?: string; end?: string }) {
  // Always return analytics data - never undefined
  return {
    totalUsers: 1234,
    activeUsers: 567,
    revenue: 89012.34,
    growth: 15.6,
    topProducts: [
      { name: 'Product A', sales: 1234 },
      { name: 'Product B', sales: 987 },
      { name: 'Product C', sales: 756 },
    ],
    chartData: [
      { date: '2024-01-01', value: 100 },
      { date: '2024-01-02', value: 120 },
      { date: '2024-01-03', value: 110 },
    ],
  } as const;
}

async function getNotifications(userId: string) {
  return [
    { 
      id: '1', 
      message: 'New user registered', 
      type: 'info', 
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    { 
      id: '2', 
      message: 'System maintenance scheduled', 
      type: 'warning', 
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    { 
      id: '3', 
      message: 'Revenue target achieved!', 
      type: 'success', 
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ];
}

async function getUserWidgets(userId: string) {
  return [
    { 
      id: '1', 
      name: 'Revenue Chart', 
      type: 'chart' as const, 
      config: { chartType: 'line', dataKey: 'revenue' },
      position: { x: 0, y: 0, w: 6, h: 4 },
    },
    { 
      id: '2', 
      name: 'User Metrics', 
      type: 'metric' as const, 
      config: { metric: 'activeUsers', format: 'number' },
      position: { x: 6, y: 0, w: 3, h: 2 },
    },
    { 
      id: '3', 
      name: 'Recent Activity', 
      type: 'list' as const, 
      config: { items: 10, showAvatar: true },
      position: { x: 9, y: 0, w: 3, h: 4 },
    },
  ];
}

async function createWidget(data: any) {
  return { 
    id: `widget-${Date.now()}`, 
    ...data,
    position: { x: 0, y: 0, w: 3, h: 2 },
  };
}

async function updateWidget(id: string, data: any) {
  return { id, ...data };
}

async function deleteWidget(id: string, userId: string) {
  // Simulate deletion
  return true;
}

async function markNotificationRead(id: string, userId: string) {
  // Simulate marking as read
  return true;
}
