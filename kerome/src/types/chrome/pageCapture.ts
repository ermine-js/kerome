/// /////////////////
// Page Capture
/// /////////////////
/**
* Use the chrome.pageCapture API to save a tab as MHTML.
* Permissions:  "pageCapture"
* @since Chrome 18.
*/

export interface SaveDetails {
  /** The id of the tab to save as MHTML. */
  tabId: number
}
export default interface _ {

  /**
   * Saves the content of the tab with given id as MHTML.
   * @param callback Called when the MHTML has been generated.
   * Parameter mhtmlData: The MHTML data as a Blob.
   */
  saveAsMHTML: (details: SaveDetails, callback: (mhtmlData?: Blob) => void) => void
}
