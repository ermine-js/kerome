/// /////////////////
// DOM
/// /////////////////
/**
* Use the chrome.dom API to programmatically access shadow root in an HTMLElement.
* Availability: Since Chrome 88+.
*/
export default interface _ {

  /**
   * Since Chrome 88+.
   * Requests chrome to return the open/closed shadow roots else return null.
   * @param element reference of HTMLElement.
   */
  openOrClosedShadowRoot: (element: HTMLElement) => ShadowRoot
}
