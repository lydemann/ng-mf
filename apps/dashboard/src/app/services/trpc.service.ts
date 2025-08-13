import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import type { AppRouter } from '../../../dashboard-trpc-bff/src/app-router';

// Type-safe tRPC client for Angular
@Injectable({
  providedIn: 'root'
})
export class TrpcService {
  private baseUrl = 'http://localhost:3000/trpc';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private http = inject(HttpClient);

  // Set authentication token
  setAuthToken(token: string): void {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  // Clear authentication token
  clearAuthToken(): void {
    this.headers = this.headers.delete('Authorization');
  }

  // Generic method to call tRPC query procedures (GET)
  private query<TInput, TOutput>(
    path: string,
    input?: TInput
  ): Observable<TOutput> {
    let url = `${this.baseUrl}/${path}`;
    
    // Add query parameters if input exists
    if (input) {
      const params = new URLSearchParams();
      params.append('input', JSON.stringify(input));
      url += `?${params.toString()}`;
    }
    
    return this.http.get<{ result: { data: TOutput } }>(url, { headers: this.headers }).pipe(
      map(response => response.result.data),
      catchError(error => {
        console.error('tRPC Query Error:', error);
        return throwError(() => error);
      })
    );
  }

  // Generic method to call tRPC mutation procedures (POST)
  private mutation<TInput, TOutput>(
    path: string,
    input?: TInput
  ): Observable<TOutput> {
    const url = `${this.baseUrl}/${path}`;
    const body = input || {};
    
    return this.http.post<{ result: { data: TOutput } }>(url, body, { headers: this.headers }).pipe(
      map(response => response.result.data),
      catchError(error => {
        console.error('tRPC Mutation Error:', error);
        return throwError(() => error);
      })
    );
  }

  // Dashboard procedures
  getDashboardData(input: {
    userId: string;
    dateRange?: { start: string; end: string };
  }): Observable<{
    user: { id: string; name: string; email: string; role: string; avatar?: string; lastLogin?: string };
    analytics: { 
      totalUsers: number; 
      activeUsers: number; 
      revenue: number; 
      growth: number;
      topProducts: Array<{ name: string; sales: number }>;
      chartData: Array<{ date: string; value: number }>;
    };
    notifications: Array<{ id: string; message: string; type: string; read: boolean; timestamp: string }>;
    widgets: Array<{ id: string; name: string; type: string; config: any; position: { x: number; y: number; w: number; h: number } }>;
    lastUpdated: string;
  }> {
    return this.query('dashboard.getDashboardData', input);
  }

  createWidget(input: { name: string; type: 'chart' | 'metric' | 'list'; config: any; userId: string }): Observable<{
    id: string;
    name: string;
    type: string;
    config: any;
    position: { x: number; y: number; w: number; h: number };
  }> {
    return this.mutation('dashboard.createWidget', input);
  }

  updateWidget(input: { id: string; name?: string; config?: any; userId: string }): Observable<{
    id: string;
    name?: string;
    config?: any;
  }> {
    return this.mutation('dashboard.updateWidget', input);
  }

  getUserWidgets(userId: string): Observable<Array<{
    id: string;
    name: string;
    type: string;
    config: any;
    position: { x: number; y: number; w: number; h: number };
  }>> {
    return this.query('dashboard.getUserWidgets', { userId });
  }

  deleteWidget(input: { id: string }): Observable<{ success: boolean }> {
    return this.mutation('dashboard.deleteWidget', input);
  }

  getAnalytics(userId: string, input?: { dateRange?: { start: string; end: string } }): Observable<{
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    growth: number;
    topProducts: Array<{ name: string; sales: number }>;
    chartData: Array<{ date: string; value: number }>;
  }> {
    return this.query('dashboard.getAnalytics', { userId, ...input });
  }

  getNotifications(userId: string): Observable<Array<{
    id: string;
    message: string;
    type: string;
    read: boolean;
    timestamp: string;
  }>> {
    return this.query('dashboard.getNotifications', { userId });
  }

  markNotificationRead(input: { id: string; userId: string }): Observable<{ success: boolean }> {
    return this.mutation('dashboard.markNotificationRead', input);
  }

  // Auth procedures
  login(input: { email: string; password: string }): Observable<{
    user: { id: string; email: string; name: string; role: string };
    token: string;
    expiresAt: string;
  }> {
    return this.mutation('auth.login', input);
  }

  register(input: { email: string; password: string; name: string }): Observable<{
    user: { id: string; email: string; name: string; role: string };
    token: string;
    expiresAt: string;
  }> {
    return this.mutation('auth.register', input);
  }

  me(): Observable<{
    id: string;
    email: string;
    role: string;
    name: string;
  }> {
    return this.query('auth.me');
  }

  logout(): Observable<{ success: boolean }> {
    return this.mutation('auth.logout');
  }

  refresh(input: { token: string }): Observable<{
    token: string;
    expiresAt: string;
  }> {
    return this.mutation('auth.refresh', input);
  }
}
