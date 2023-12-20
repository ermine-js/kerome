import type * as chrome from './'
/// /////////////////
// Sessions
/// /////////////////
/**
* Use the chrome.sessions API to query and restore tabs and windows from a browsing session.
* Permissions:  "sessions"
* @since Chrome 37.
*/

export interface Filter {
  /**
       * Optional.
       * The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries (sessions.MAX_SESSION_RESULTS).
       */
  maxResults?: number | undefined
}

export interface Session {
  /** The time when the window or tab was closed or modified, represented in milliseconds since the epoch. */
  lastModified: number
  /**
       * Optional.
       * The tabs.Tab, if this entry describes a tab. Either this or sessions.Session.window will be set.
       */
  tab?: tabs.Tab | undefined
  /**
       * Optional.
       * The windows.Window, if this entry describes a window. Either this or sessions.Session.tab will be set.
       */
  window?: windows.Window | undefined
}

export interface Device {
  /** The name of the foreign device. */
  deviceName: string
  /** A list of open window sessions for the foreign device, sorted from most recently to least recently modified session. */
  sessions: Session[]
}

export interface SessionChangedEvent extends chrome.events.Event<() => void> {}
export default interface _ {

  /** The maximum number of sessions.Session that will be included in a requested list. */
  MAX_SESSION_RESULTS: number

  /**
   * Gets the list of recently closed tabs and/or windows.
   * @return The `getRecentlyClosed` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getRecentlyClosed: ((filter?: Filter) => Promise<Session[]>) & ((filter: Filter, callback: (sessions: Session[]) => void) => void) & ((callback: (sessions: Session[]) => void) => void)

  /**
   * Retrieves all devices with synced sessions.
   * @return The `getDevices` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getDevices: ((filter?: Filter) => Promise<Device[]>) & ((filter: Filter, callback: (devices: Device[]) => void) => void) & ((callback: (devices: Device[]) => void) => void)

  /**
   * Reopens a windows.Window or tabs.Tab.
   * @param sessionId Optional.
   * The windows.Window.sessionId, or tabs.Tab.sessionId to restore. If this parameter is not specified, the most recently closed session is restored.
   * @return The `restore` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  restore: ((sessionId?: string) => Promise<Session>) & ((sessionId: string, callback: (restoredSession: Session) => void) => void) & ((callback: (restoredSession: Session) => void) => void)

  /** Fired when recently closed tabs and/or windows are changed. This event does not monitor synced sessions changes. */
  onChanged: SessionChangedEvent
}
