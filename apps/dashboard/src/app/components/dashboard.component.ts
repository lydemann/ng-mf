import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrpcService } from '../services/trpc.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ng-mf-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private trpc = inject(TrpcService);

  // Signals for state management
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Convert observable to signal
  dashboardData = toSignal(
    this.trpc.getDashboardData({
      userId: 'user-123',
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString()
      }
    })
  );

  ngOnInit() {
    // Set a mock auth token for demonstration
    this.trpc.setAuthToken('mock-jwt-token-123');
  }

  createNewWidget() {
    this.loading.set(true);
    this.error.set(null);
    
    this.trpc.createWidget({
      name: 'New Chart Widget',
      type: 'chart',
      config: { chartType: 'bar', dataKey: 'sales' },
      userId: 'user-123'
    }).subscribe({
      next: (widget) => {
        console.log('Created new widget:', widget);
        this.loading.set(false);
        this.refreshData();
      },
      error: (error) => {
        console.error('Error creating widget:', error);
        this.error.set('Failed to create widget');
        this.loading.set(false);
      }
    });
  }

  markAsRead(notificationId: string) {
    this.trpc.markNotificationRead({ id: notificationId, userId: 'user-123' }).subscribe({
      next: () => {
        console.log('Marked notification as read:', notificationId);
        this.refreshData();
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }

  refreshData() {
    // In a real app, you'd trigger a refresh of the dashboard data
    console.log('Refreshing dashboard data...');
  }
}
