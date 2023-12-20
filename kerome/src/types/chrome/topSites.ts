/// /////////////////
// Top Sites
/// /////////////////
/**
* Use the chrome.topSites API to access the top sites that are displayed on the new tab page.
* Permissions:  "topSites"
* @since Chrome 19.
*/

/** An object encapsulating a most visited URL, such as the URLs on the new tab page. */
export interface MostVisitedURL {
  /** The most visited URL. */
  url: string
  /** The title of the page */
  title: string
}
export default interface _ {

  /** Gets a list of top sites. */
  get: ((callback: (data: MostVisitedURL[]) => void) => void) & (() => Promise<MostVisitedURL[]>)
}
