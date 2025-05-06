
import { useState } from 'react';
import { NotificationCard } from '@/components/notifications/NotificationCard';
import { Button } from '@/components/ui/button';
import { mockNotifications } from '@/lib/mock-data';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };
  
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        
        <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard 
            key={notification.id}
            id={notification.id}
            title={notification.title}
            message={notification.message}
            date={notification.date}
            read={notification.read}
            type={notification.type as any}
            onMarkAsRead={markAsRead}
          />
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notifications to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
