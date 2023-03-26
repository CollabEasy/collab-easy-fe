interface Notification {
  artist_id: string;
  notif_type: string;
  redirect_id: string;
  notification_data: any;
  notif_read: boolean;
  created_at: Date;
}

export interface NotificationState {
  notifications: Notification[];
  isFetchingNotifications: boolean,
}
