import type * as chrome from './'
/// /////////////////
// Declarative Content
/// /////////////////
/**
* Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content.
* Availability: Since Chrome 33.
* Permissions:  "declarativeContent"
*/

export interface PageStateUrlDetails {
  /** Optional. Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.  */
  hostContains?: string | undefined
  /** Optional. Matches if the host name of the URL is equal to a specified string.  */
  hostEquals?: string | undefined
  /** Optional. Matches if the host name of the URL starts with a specified string.  */
  hostPrefix?: string | undefined
  /** Optional. Matches if the host name of the URL ends with a specified string.  */
  hostSuffix?: string | undefined
  /** Optional. Matches if the path segment of the URL contains a specified string.  */
  pathContains?: string | undefined
  /** Optional. Matches if the path segment of the URL is equal to a specified string.  */
  pathEquals?: string | undefined
  /** Optional. Matches if the path segment of the URL starts with a specified string.  */
  pathPrefix?: string | undefined
  /** Optional. Matches if the path segment of the URL ends with a specified string.  */
  pathSuffix?: string | undefined
  /** Optional. Matches if the query segment of the URL contains a specified string.  */
  queryContains?: string | undefined
  /** Optional. Matches if the query segment of the URL is equal to a specified string.  */
  queryEquals?: string | undefined
  /** Optional. Matches if the query segment of the URL starts with a specified string.  */
  queryPrefix?: string | undefined
  /** Optional. Matches if the query segment of the URL ends with a specified string.  */
  querySuffix?: string | undefined
  /** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
  urlContains?: string | undefined
  /** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
  urlEquals?: string | undefined
  /** Optional. Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.  */
  urlMatches?: string | undefined
  /** Optional. Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.  */
  originAndPathMatches?: string | undefined
  /** Optional. Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
  urlPrefix?: string | undefined
  /** Optional. Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
  urlSuffix?: string | undefined
  /** Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.  */
  schemes?: string[] | undefined
  /** Optional. Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.  */
  ports?: Array<number | number[]> | undefined
}

export interface PageStateMatcherProperties {
  /** Optional. Filters URLs for various criteria. See event filtering. All criteria are case sensitive.  */
  pageUrl?: PageStateUrlDetails | undefined
  /** Optional. Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame. All selectors in this array must be compound selectors to speed up matching. Note that listing hundreds of CSS selectors or CSS selectors that match hundreds of times per page can still slow down web sites.  */
  css?: string[] | undefined
  /**
       * Optional.
       * Since Chrome 45. Warning: this is the current Beta channel. More information available on the API documentation pages.
       * Matches if the bookmarked state of the page is equal to the specified value. Requires the bookmarks permission.
       */
  isBookmarked?: boolean | undefined
}

/** Matches the state of a web page by various criteria. */
export type PageStateMatcher = new(options: PageStateMatcherProperties) => PageStateMatcher

/**
   * Declarative event action that enables the extension's action while the corresponding conditions are met.
   * Manifest v3.
   */
export interface ShowAction {}

/**
   * Declarative event action that shows the extension's page action while the corresponding conditions are met.
   * Manifest v2.
   */
export interface ShowPageAction {}

/** Declarative event action that changes the icon of the page action while the corresponding conditions are met. */
export type SetIcon = new(options?: { imageData?: ImageData | Record<string, ImageData> | undefined }) => SetIcon

/** Provides the Declarative Event API consisting of addRules, removeRules, and getRules. */
export interface PageChangedEvent extends chrome.events.Event<() => void> {}
export default interface _ {

  onPageChanged: PageChangedEvent
}
