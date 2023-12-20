/// /////////////////
// Power
/// /////////////////
/**
* Use the chrome.power API to override the system's power management features.
* Permissions:  "power"
* @since Chrome 27.
*/
export default interface _ {

  /** Requests that power management be temporarily disabled. |level| describes the degree to which power management should be disabled. If a request previously made by the same app is still active, it will be replaced by the new request. */
  requestKeepAwake: (level: string) => void

  /** Releases a request previously made via requestKeepAwake(). */
  releaseKeepAwake: () => void
}
