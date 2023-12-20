import type * as chrome from './'
/// /////////////////
// Extension
/// /////////////////
/**
* The chrome.extension API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in Message Passing.
* Availability: Since Chrome 5.
*/

export interface FetchProperties {
  /**
       * Optional.
       * Chrome 54+
       * Find a view according to a tab id. If this field is omitted, returns all views.
       */
  tabId?: number | undefined
  /** Optional. The window to restrict the search to. If omitted, returns all views.  */
  windowId?: number | undefined
  /** Optional. The type of view to get. If omitted, returns all views (including background pages and tabs). Valid values: 'tab', 'notification', 'popup'.  */
  type?: string | undefined
}

export interface LastError {
  /** Description of the error that has taken place. */
  message: string
}

export interface OnRequestEvent extends
  chrome.events.Event<
  | ((request: any, sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
  | ((sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
  >
{}
export default interface _ {

  /**
   * Since Chrome 7.
   * True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior.
   */
  inIncognitoContext: boolean

  /** Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occurred lastError will be undefined. */
  lastError: LastError

  /** Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page. */
  getBackgroundPage: () => Window | null

  /**
   * Converts a relative path within an extension install directory to a fully-qualified URL.
   * @param path A path to a resource within an extension expressed relative to its install directory.
   */
  getURL: (path: string) => string

  /**
   * Sets the value of the ap CGI parameter used in the extension's update URL. This value is ignored for extensions that are hosted in the Chrome Extension Gallery.
   * Since Chrome 9.
   */
  setUpdateUrlData: (data: string) => void

  /** Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension. */
  getViews: (fetchProperties?: FetchProperties) => Window[]

  /**
   * Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox.
   * Since Chrome 12.
   * @return The `isAllowedFileSchemeAccess` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  isAllowedFileSchemeAccess: (() => Promise<boolean>) & ((callback: (isAllowedAccess: boolean) => void) => void)

  /**
   * Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox.
   * Since Chrome 12.
   * @return The `isAllowedIncognitoAccess` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  isAllowedIncognitoAccess: (() => Promise<boolean>) & ((callback: (isAllowedAccess: boolean) => void) => void)

  /**
   * Sends a single request to other listeners within the extension. Similar to runtime.connect, but only sends a single request with an optional response. The extension.onRequest event is fired in each page of the extension.
   * @deprecated Deprecated since Chrome 33. Please use runtime.sendMessage.
   * @param extensionId The extension ID of the extension you want to connect to. If omitted, default is your own extension.
   * @param responseCallback If you specify the responseCallback parameter, it should be a function that looks like this:
   * function(any response) {...};
   * Parameter response: The JSON response object sent by the handler of the request. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendRequest: (<Request = any, Response = any>(
    extensionId: string,
    request: Request,
    responseCallback?: (response: Response) => void,
  ) => void) & (<Request = any, Response = any>(
    request: Request,
    responseCallback?: (response: Response) => void,
  ) => void)

  /**
   * Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If windowId is specified, returns only the 'window' objects of tabs attached to the specified window.
   * @deprecated Deprecated since Chrome 33. Please use extension.getViews {type: "tab"}.
   */
  getExtensionTabs: (windowId?: number) => Window[]

  /**
   * Fired when a request is sent from either an extension process or a content script.
   * @deprecated Deprecated since Chrome 33. Please use runtime.onMessage.
   */
  onRequest: OnRequestEvent

  /**
   * Fired when a request is sent from another extension.
   * @deprecated Deprecated since Chrome 33. Please use runtime.onMessageExternal.
   */
  onRequestExternal: OnRequestEvent
}
