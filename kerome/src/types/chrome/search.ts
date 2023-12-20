/// /////////////////
// Search
/// /////////////////
/**
* Use the chrome.search API to search via the default provider.
* Permissions:  "search"
*/

export type Disposition = 'CURRENT_TAB' | 'NEW_TAB' | 'NEW_WINDOW'

export interface QueryInfo {
  /** Location where search results should be displayed. CURRENT_TAB is the default.  */
  disposition?: Disposition | undefined
  /** Location where search results should be displayed. tabIdcannot be used with disposition. */
  tabId?: number | undefined
  /** String to query with the default search provider. */
  text?: string | undefined
}
export default interface _ {

  /**
   * Used to query the default search provider. In case of an error, runtime.lastError will be set.
   * @param options search configuration options.
   */
  query: ((options: QueryInfo, callback: () => void) => void) & ((options: QueryInfo) => Promise<void>)
}
