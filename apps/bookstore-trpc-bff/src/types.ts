// Shared types between BFF and Angular client
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  lastLogin?: string;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
  topProducts: Array<{
    name: string;
    sales: number;
  }>;
  chartData: Array<{
    date: string;
    value: number;
  }>;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

export interface Widget {
  id: string;
  name: string;
  type: 'chart' | 'metric' | 'list';
  config: Record<string, any>;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface DashboardData {
  user: User;
  analytics: Analytics; // Always required, never undefined
  notifications: Notification[];
  widgets: Widget[];
  lastUpdated: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface CreateWidgetInput {
  name: string;
  type: 'chart' | 'metric' | 'list';
  config: Record<string, any>;
}

export interface UpdateWidgetInput {
  id: string;
  name?: string;
  config?: Record<string, any>;
}
