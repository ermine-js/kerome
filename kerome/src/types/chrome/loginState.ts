import type * as chrome from './'
/// /////////////////
// LoginState
/// /////////////////
/**
* Use the chrome.loginState API to read and monitor the login state.
* Permissions: "loginState"
* @since Chrome 78.
* Important: This API works only on Chrome OS.
*/

export interface SessionStateChangedEvent extends chrome.events.Event<(sessionState: SessionState) => void> {}

/** Possible profile types. */
export type ProfileType = 'SIGNIN_PROFILE' | 'USER_PROFILE'

/** Possible session states. */
export type SessionState = 'UNKNOWN' | 'IN_OOBE_SCREEN' | 'IN_LOGIN_SCREEN' | 'IN_SESSION' | 'IN_LOCK_SCREEN'
export default interface _ {

  /** Gets the type of the profile the extension is in. */
  getProfileType: (callback: (profileType: ProfileType) => void) => void

  /** Gets the current session state. */
  getSessionState: (callback: (sessionState: SessionState) => void) => void

  /** Dispatched when the session state changes. sessionState is the new session state. */
  onSessionStateChanged: SessionStateChangedEvent
}
