export enum NotificationType {
  INVITATIONAL = 'invitation',
  COMMIT = 'commit',
  CREATE = 'create',
  MOVE = 'move',
  REMOVE = 'remove'
}

export interface Notification {
  notification_type: NotificationType;
  source: string;
  target: string;
  message?: string;
  icon?: string;
  url?: string;
  date?: string;
}

export const NotificationTypesValue = new Map<NotificationType, string>([
  [NotificationType.INVITATIONAL, 'invitation'],
  [NotificationType.COMMIT, 'commit'],
  [NotificationType.CREATE, 'create'],
  [NotificationType.MOVE, 'move'],
  [NotificationType.REMOVE, 'remove']
]);

export const NotificationMessages = new Map<NotificationType, string>([
  [NotificationType.INVITATIONAL, 'invited you to'],
  [NotificationType.COMMIT, 'committed changes to'],
  [NotificationType.CREATE, 'created'],
  [NotificationType.MOVE, 'has moved to'],
  [NotificationType.REMOVE, 'removed claims from']
]);

export const NotificationIcons = new Map<NotificationType, string>([
  [NotificationType.INVITATIONAL, 'fa-user'],
  [NotificationType.COMMIT, 'fa-globe'],
  [NotificationType.CREATE, 'fa-file'],
  [NotificationType.MOVE, 'fa-arrows-alt'],
  [NotificationType.REMOVE, 'fa-trash']
]);
