import type * as chrome from './'
/// /////////////////
// Alarms
/// /////////////////
/**
* Use the chrome.alarms API to schedule code to run periodically or at a specified time in the future.
* Availability: Since Chrome 22.
* Permissions:  "alarms"
*/

export interface AlarmCreateInfo {
  /** Optional. Length of time in minutes after which the onAlarm event should fire.  */
  delayInMinutes?: number | undefined
  /** Optional. If set, the onAlarm event should fire every periodInMinutes minutes after the initial event specified by when or delayInMinutes. If not set, the alarm will only fire once.  */
  periodInMinutes?: number | undefined
  /** Optional. Time at which the alarm should fire, in milliseconds past the epoch (e.g. Date.now() + n).  */
  when?: number | undefined
}

export interface Alarm {
  /** Optional. If not null, the alarm is a repeating alarm and will fire again in periodInMinutes minutes.  */
  periodInMinutes?: number | undefined
  /** Time at which this alarm was scheduled to fire, in milliseconds past the epoch (e.g. Date.now() + n). For performance reasons, the alarm may have been delayed an arbitrary amount beyond this. */
  scheduledTime: number
  /** Name of this alarm. */
  name: string
}

export interface AlarmEvent extends chrome.events.Event<(alarm: Alarm) => void> {}
export default interface _ {

  /**
   * Creates an alarm. Near the time(s) specified by alarmInfo, the onAlarm event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
   * In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 1 minute but may delay them an arbitrary amount more. That is, setting delayInMinutes or periodInMinutes to less than 1 will not be honored and will cause a warning. when can be set to less than 1 minute after "now" without warning but won't actually cause the alarm to fire for at least 1 minute.
   * To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.
   * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either when or delayInMinutes (but not both). If periodInMinutes is set, the alarm will repeat every periodInMinutes minutes after the initial event. If neither when or delayInMinutes is set for a repeating alarm, periodInMinutes is used as the default for delayInMinutes.
   * @return The `create` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  create: ((alarmInfo: AlarmCreateInfo) => Promise<void>) & ((name: string, alarmInfo: AlarmCreateInfo) => Promise<void>) & ((alarmInfo: AlarmCreateInfo, callback: () => void) => void) & ((name: string, alarmInfo: AlarmCreateInfo, callback: () => void) => void)

  /**
   * Gets an array of all the alarms.
   */
  getAll: ((callback: (alarms: Alarm[]) => void) => void) & (() => Promise<Alarm[]>)

  /**
   * Clears all alarms.
   * function(boolean wasCleared) {...};
   * @return The `clearAll` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  clearAll: (() => Promise<boolean>) & ((callback: (wasCleared: boolean) => void) => void)

  /**
   * Clears the alarm with the given name.
   * @param name The name of the alarm to clear. Defaults to the empty string.
   * @return The `clear` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  clear: ((name?: string) => Promise<boolean>) & ((callback: (wasCleared: boolean) => void) => void) & ((name: string, callback: (wasCleared: boolean) => void) => void) & ((callback: (wasCleared: boolean) => void) => void) & (() => Promise<void>)

  /**
   * Retrieves details about the specified alarm.
   */
  get: ((callback: (alarm: Alarm) => void) => void) & (() => Promise<Alarm>) & ((name: string, callback: (alarm: Alarm) => void) => void) & ((name: string) => Promise<Alarm>)

  /** Fired when an alarm has elapsed. Useful for event pages. */
  onAlarm: AlarmEvent
}
