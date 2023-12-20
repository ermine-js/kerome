import type * as chrome from './'
/// /////////////////
// Google Cloud Messaging
/// /////////////////
/**
* Use chrome.gcm to enable apps and extensions to send and receive messages through the Google Cloud Messaging Service.
* Availability: Since Chrome 35.
* Permissions:  "gcm"
*/

export interface OutgoingMessage {
  /** The ID of the server to send the message to as assigned by Google API Console. */
  destinationId: string
  /** The ID of the message. It must be unique for each message in scope of the applications. See the Cloud Messaging documentation for advice for picking and handling an ID. */
  messageId: string
  /** Optional. Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The maximum and a default value of time-to-live is 86400 seconds (1 day). */
  timeToLive?: number | undefined
  /** Message data to send to the server. Case-insensitive goog. and google, as well as case-sensitive collapse_key are disallowed as key prefixes. Sum of all key/value pairs should not exceed gcm.MAX_MESSAGE_SIZE. */
  data: Object
}

export interface IncomingMessage {
  /** The message data. */
  data: Object
  /**
       * Optional.
       * The sender who issued the message.
       * @since Since Chrome 41.
       */
  from?: string | undefined
  /**
       * Optional.
       * The collapse key of a message. See Collapsible Messages section of Cloud Messaging documentation for details.
       */
  collapseKey?: string | undefined
}

export interface GcmError {
  /** The error message describing the problem. */
  errorMessage: string
  /** Optional. The ID of the message with this error, if error is related to a specific message. */
  messageId?: string | undefined
  /** Additional details related to the error, when available. */
  detail: Object
}

export interface MessageReceptionEvent extends chrome.events.Event<(message: IncomingMessage) => void> {}

export interface MessageDeletionEvent extends chrome.events.Event<() => void> {}

export interface GcmErrorEvent extends chrome.events.Event<(error: GcmError) => void> {}
export default interface _ {

  /** The maximum size (in bytes) of all key/value pairs in a message. */
  MAX_MESSAGE_SIZE: number

  /**
   * Registers the application with GCM. The registration ID will be returned by the callback. If register is called again with the same list of senderIds, the same registration ID will be returned.
   * @param senderIds A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.
   * @param callback Function called when registration completes. It should check runtime.lastError for error when registrationId is empty.
   * Parameter registrationId: A registration ID assigned to the application by the GCM.
   */
  register: (senderIds: string[], callback: (registrationId: string) => void) => void

  /**
   * Unregisters the application from GCM.
   * @param callback A function called after the unregistration completes. Unregistration was successful if runtime.lastError is not set.
   */
  unregister: (callback: () => void) => void

  /**
   * Sends a message according to its contents.
   * @param message A message to send to the other party via GCM.
   * @param callback A function called after the message is successfully queued for sending. runtime.lastError should be checked, to ensure a message was sent without problems.
   * Parameter messageId: The ID of the message that the callback was issued for.
   */
  send: (message: OutgoingMessage, callback: (messageId: string) => void) => void

  /** Fired when a message is received through GCM. */
  onMessage: MessageReceptionEvent

  /** Fired when a GCM server had to delete messages sent by an app server to the application. See Messages deleted event section of Cloud Messaging documentation for details on handling this event. */
  onMessagesDeleted: MessageDeletionEvent

  /** Fired when it was not possible to send a message to the GCM server. */
  onSendError: GcmErrorEvent
}
