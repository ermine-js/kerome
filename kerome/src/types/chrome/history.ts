import type * as chrome from './'
/// /////////////////
// History
/// /////////////////
/**
* Use the chrome.history API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see Override Pages.
* Availability: Since Chrome 5.
* Permissions:  "history"
*/

/** An object encapsulating one visit to a URL. */
export interface VisitItem {
  /** The transition type for this visit from its referrer. */
  transition: string
  /** Optional. When this visit occurred, represented in milliseconds since the epoch. */
  visitTime?: number | undefined
  /** The unique identifier for this visit. */
  visitId: string
  /** The visit ID of the referrer. */
  referringVisitId: string
  /** The unique identifier for the item. */
  id: string
}

/** An object encapsulating one result of a history query. */
export interface HistoryItem {
  /** Optional. The number of times the user has navigated to this page by typing in the address. */
  typedCount?: number | undefined
  /** Optional. The title of the page when it was last loaded. */
  title?: string | undefined
  /** Optional. The URL navigated to by a user. */
  url?: string | undefined
  /** Optional. When this page was last loaded, represented in milliseconds since the epoch. */
  lastVisitTime?: number | undefined
  /** Optional. The number of times the user has navigated to this page. */
  visitCount?: number | undefined
  /** The unique identifier for the item. */
  id: string
}

export interface HistoryQuery {
  /** A free-text query to the history service. Leave empty to retrieve all pages. */
  text: string
  /** Optional. The maximum number of results to retrieve. Defaults to 100. */
  maxResults?: number | undefined
  /** Optional. Limit results to those visited after this date, represented in milliseconds since the epoch. */
  startTime?: number | undefined
  /** Optional. Limit results to those visited before this date, represented in milliseconds since the epoch. */
  endTime?: number | undefined
}

export interface Url {
  /** The URL for the operation. It must be in the format as returned from a call to history.search. */
  url: string
}

export interface Range {
  /** Items added to history before this date, represented in milliseconds since the epoch. */
  endTime: number
  /** Items added to history after this date, represented in milliseconds since the epoch. */
  startTime: number
}

export interface RemovedResult {
  /** True if all history was removed. If true, then urls will be empty. */
  allHistory: boolean
  /** Optional. */
  urls?: string[] | undefined
}

export interface HistoryVisitedEvent extends chrome.events.Event<(result: HistoryItem) => void> {}

export interface HistoryVisitRemovedEvent extends chrome.events.Event<(removed: RemovedResult) => void> {}
export default interface _ {

  /**
   * Searches the history for the last visit time of each page matching the query.
   * @return The `search` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  search: ((query: HistoryQuery) => Promise<HistoryItem[]>) & ((query: HistoryQuery, callback: (results: HistoryItem[]) => void) => void)

  /**
   * Adds a URL to the history at the current time with a transition type of "link".
   * @return The `addUrl` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  addUrl: ((details: Url) => Promise<void>) & ((details: Url, callback: () => void) => void)

  /**
   * Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.
   * @return The `deleteRange` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  deleteRange: ((range: Range) => Promise<void>) & ((range: Range, callback: () => void) => void)

  /**
   * Deletes all items from the history.
   * @return The `deleteAll` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  deleteAll: (() => Promise<void>) & ((callback: () => void) => void)

  /**
   * Retrieves information about visits to a URL.
   * @return The `getVisits` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getVisits: ((details: Url) => Promise<VisitItem[]>) & ((details: Url, callback: (results: VisitItem[]) => void) => void)

  /**
   * Removes all occurrences of the given URL from the history.
   * @return The `deleteUrl` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  deleteUrl: ((details: Url) => Promise<void>) & ((details: Url, callback: () => void) => void)

  /** Fired when a URL is visited, providing the HistoryItem data for that URL. This event fires before the page has loaded. */
  onVisited: HistoryVisitedEvent

  /** Fired when one or more URLs are removed from the history service. When all visits have been removed the URL is purged from history. */
  onVisitRemoved: HistoryVisitRemovedEvent
}
