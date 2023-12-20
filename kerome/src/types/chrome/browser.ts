/// /////////////////
// Browser
/// /////////////////
/**
* Use the chrome.browser API to interact with the Chrome browser associated with
* the current application and Chrome profile.
*/

export interface Options {
  /** The URL to navigate to when the new tab is initially opened. */
  url: string
}
export default interface _ {

  /**
   * Opens a new tab in a browser window associated with the current application
   * and Chrome profile. If no browser window for the Chrome profile is opened,
   * a new one is opened prior to creating the new tab.
   * @param options Configures how the tab should be opened.
   * @param callback Called when the tab was successfully
   * created, or failed to be created. If failed, runtime.lastError will be set.
   */
  openTab: ((options: Options, callback: () => void) => void) & ((options: Options) => void)
}
