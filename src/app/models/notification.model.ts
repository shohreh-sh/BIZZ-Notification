export enum NotificationTypes {
  INVITATIONAL = 'invitation',
  CREATE = 'create',
  REMOVE = 'remove',
  MOVE = 'move',
  COMMIT = 'commit',
}

export interface Notification {
  notification_type: NotificationTypes;
  source: string;
  target: string;
  message?: string;
  icon?: string;
  url?: string;
  date?: string;
}

export enum NotificationMessage {

}
