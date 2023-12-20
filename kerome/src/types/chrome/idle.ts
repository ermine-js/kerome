import type * as chrome from './'
/// /////////////////
// Idle
/// /////////////////
/**
* Use the chrome.idle API to detect when the machine's idle state changes.
* Permissions:  "idle"
* @since Chrome 6.
*/

export type IdleState = 'active' | 'idle' | 'locked'

export interface IdleStateChangedEvent extends chrome.events.Event<(newState: IdleState) => void> {}
export default interface _ {

  /**
   * Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
   * @param detectionIntervalInSeconds The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.
   * Since Chrome 25.
   */
  queryState: (detectionIntervalInSeconds: number, callback: (newState: IdleState) => void) => void

  /**
   * Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.
   * @since Chrome 25.
   * @param intervalInSeconds Threshold, in seconds, used to determine when the system is in an idle state.
   */
  setDetectionInterval: (intervalInSeconds: number) => void

  /**
   * Gets the time, in seconds, it takes until the screen is locked automatically while idle. Returns a zero duration if the screen is never locked automatically. Currently supported on Chrome OS only.
   * Parameter delay: Time, in seconds, until the screen is locked automatically while idle. This is zero if the screen never locks automatically.
   */
  getAutoLockDelay: (callback: (delay: number) => void) => void

  /** Fired when the system changes to an active, idle or locked state. The event fires with "locked" if the screen is locked or the screensaver activates, "idle" if the system is unlocked and the user has not generated any input for a specified number of seconds, and "active" when the user generates input on an idle system. */
  onStateChanged: IdleStateChangedEvent
}
