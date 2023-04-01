interface Notification {
  artist_id: string;
  notifType: string;
  redirectId: string;
  notificationData: any;
  notifRead: boolean;
  createdAt: Date;
}

export interface NotificationState {
  notifications: Notification[];
  isFetchingNotifications: boolean,
}
