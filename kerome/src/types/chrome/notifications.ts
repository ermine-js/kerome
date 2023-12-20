import type * as chrome from './'
/// /////////////////
// Notifications
// https://developer.chrome.com/extensions/notifications
/// /////////////////
/**
* Use the chrome.notifications API to create rich notifications using templates and show these notifications to users in the system tray.
* Permissions:  "notifications"
* @since Chrome 28.
*/

export type TemplateType = 'basic' | 'image' | 'list' | 'progress'

export interface ButtonOptions {
  title: string
  iconUrl?: string | undefined
}

export interface ItemOptions {
  /** Title of one item of a list notification. */
  title: string
  /** Additional details about this item. */
  message: string
}

export type NotificationOptions<T extends boolean = false> =
      & {
        /**
           * Optional.
           * Alternate notification content with a lower-weight font.
           * @since Chrome 31.
           */
        contextMessage?: string | undefined
        /** Optional. Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default. */
        priority?: number | undefined
        /** Optional. A timestamp associated with the notification, in milliseconds past the epoch (e.g. Date.now() + n). */
        eventTime?: number | undefined
        /** Optional. Text and icons for up to two notification action buttons. */
        buttons?: ButtonOptions[] | undefined
        /** Optional. Items for multi-item notifications. */
        items?: ItemOptions[] | undefined
        /**
           * Optional.
           * Current progress ranges from 0 to 100.
           * @since Chrome 30.
           */
        progress?: number | undefined
        /**
           * Optional.
           * Whether to show UI indicating that the app will visibly respond to clicks on the body of a notification.
           * @since Chrome 32.
           */
        isClickable?: boolean | undefined
        /**
           * Optional.
           * A URL to the app icon mask. URLs have the same restrictions as iconUrl. The app icon mask should be in alpha channel, as only the alpha channel of the image will be considered.
           * @since Chrome 38.
           */
        appIconMaskUrl?: string | undefined
        /** Optional. A URL to the image thumbnail for image-type notifications. URLs have the same restrictions as iconUrl. */
        imageUrl?: string | undefined
        /**
           * Indicates that the notification should remain visible on screen until the user activates or dismisses the notification.
           * This defaults to false.
           * @since Chrome 50
           */
        requireInteraction?: boolean | undefined
        /**
           * Optional.
           * Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.
           * @since Chrome 70
           */
        silent?: boolean | undefined
      }
      & (T extends true ? {
        /**
               * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
               * URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file. Required for notifications.create method.
               */
        iconUrl: string
        /** Main notification content. Required for notifications.create method. */
        message: string
        /** Which type of notification to display. Required for notifications.create method. */
        type: TemplateType
        /** Title of the notification (e.g. sender name for email). Required for notifications.create method. */
        title: string
      }
        : {
            /**
               * Optional.
               * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
               * URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file. Required for notifications.create method.
               */
            iconUrl?: string | undefined
            /** Optional. Main notification content. Required for notifications.create method. */
            message?: string | undefined
            /** Optional. Which type of notification to display. Required for notifications.create method. */
            type?: TemplateType | undefined
            /** Optional. Title of the notification (e.g. sender name for email). Required for notifications.create method. */
            title?: string | undefined
          })

export interface NotificationClosedEvent
  extends chrome.events.Event<(notificationId: string, byUser: boolean) => void>
{}

export interface NotificationClickedEvent extends chrome.events.Event<(notificationId: string) => void> {}

export interface NotificationButtonClickedEvent
  extends chrome.events.Event<(notificationId: string, buttonIndex: number) => void>
{}

export interface NotificationPermissionLevelChangedEvent extends chrome.events.Event<(level: string) => void> {}

export interface NotificationShowSettingsEvent extends chrome.events.Event<() => void> {}
export default interface _ {

  /** The notification closed, either by the system or by user action. */
  onClosed: NotificationClosedEvent

  /** The user clicked in a non-button area of the notification. */
  onClicked: NotificationClickedEvent

  /** The user pressed a button in the notification. */
  onButtonClicked: NotificationButtonClickedEvent

  /**
   * The user changes the permission level.
   * @since Chrome 32.
   */
  onPermissionLevelChanged: NotificationPermissionLevelChangedEvent

  /**
   * The user clicked on a link for the app's notification settings.
   * @since Chrome 32.
   */
  onShowSettings: NotificationShowSettingsEvent

  /**
   * Creates and displays a notification.
   * @param notificationId Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation.
   * The notificationId parameter is required before Chrome 42.
   * @param options Contents of the notification.
   * @param callback Returns the notification id (either supplied or generated) that represents the created notification.
   * The callback is required before Chrome 42.
   */
  create: ((
    notificationId: string,
    options: NotificationOptions<true>,
    callback?: (notificationId: string) => void,
  ) => void) & ((options: NotificationOptions<true>, callback?: (notificationId: string) => void) => void)

  /**
   * Updates an existing notification.
   * @param notificationId The id of the notification to be updated. This is returned by notifications.create method.
   * @param options Contents of the notification to update to.
   * @param callback Called to indicate whether a matching notification existed.
   * The callback is required before Chrome 42.
   */
  update: (
    notificationId: string,
    options: NotificationOptions,
    callback?: (wasUpdated: boolean) => void,
  ) => void

  /**
   * Clears the specified notification.
   * @param notificationId The id of the notification to be cleared. This is returned by notifications.create method.
   * @param callback Called to indicate whether a matching notification existed.
   * The callback is required before Chrome 42.
   */
  clear: (notificationId: string, callback?: (wasCleared: boolean) => void) => void

  /**
   * Retrieves all the notifications.
   * @since Chrome 29.
   * @param callback Returns the set of notification_ids currently in the system.
   */
  getAll: (callback: (notifications: Object) => void) => void

  /**
   * Retrieves whether the user has enabled notifications from this app or extension.
   * @since Chrome 32.
   * @param callback Returns the current permission level.
   */
  getPermissionLevel: (callback: (level: string) => void) => void
}
