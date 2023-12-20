import type * as chrome from './'
/// /////////////////
// Web Navigation
/// /////////////////
/**
* Use the chrome.webNavigation API to receive notifications about the status of navigation requests in-flight.
* Permissions:  "webNavigation"
* @since Chrome 16.
*/

export interface GetFrameDetails {
  /**
       * The ID of the process runs the renderer for this tab.
       * @since Chrome 22.
       * @deprecated since Chrome 49. Frames are now uniquely identified by their tab ID and frame ID; the process ID is no longer needed and therefore ignored.
       */
  processId?: number | undefined
  /** The ID of the tab in which the frame is. */
  tabId: number
  /** The ID of the frame in the given tab. */
  frameId: number
}

export interface GetFrameResultDetails {
  /** The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists. */
  url: string
  /** A UUID of the document loaded. */
  documentId: string
  /** The lifecycle the document is in. */
  documentLifecycle: DocumentLifecycle
  /** True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired. */
  errorOccurred: boolean
  /** The type of frame the navigation occurred in. */
  frameType: FrameType
  /** A UUID of the parent document owning this frame. This is not set if there is no parent. */
  parentDocumentId?: string | undefined
  /** ID of frame that wraps the frame. Set to -1 of no parent frame exists. */
  parentFrameId: number
}

export interface GetAllFrameDetails {
  /** The ID of the tab. */
  tabId: number
}

export interface GetAllFrameResultDetails extends GetFrameResultDetails {
  /** The ID of the process runs the renderer for this tab. */
  processId: number
  /** The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe. */
  frameId: number
}

export interface WebNavigationCallbackDetails {
  /** The ID of the tab in which the navigation is about to occur. */
  tabId: number
  /** The time when the browser was about to start the navigation, in milliseconds since the epoch. */
  timeStamp: number
}

export interface WebNavigationUrlCallbackDetails extends WebNavigationCallbackDetails {
  url: string
}

export interface WebNavigationReplacementCallbackDetails extends WebNavigationCallbackDetails {
  /** The ID of the tab that was replaced. */
  replacedTabId: number
}

export interface WebNavigationFramedCallbackDetails extends WebNavigationUrlCallbackDetails {
  /** 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique for a given tab and process. */
  frameId: number
  /** The type of frame the navigation occurred in. */
  frameType: FrameType
  /** A UUID of the document loaded. (This is not set for onBeforeNavigate callbacks.) */
  documentId?: string | undefined
  /** The lifecycle the document is in. */
  documentLifecycle: DocumentLifecycle
  /** A UUID of the parent document owning this frame. This is not set if there is no parent. */
  parentDocumentId?: string | undefined
  /**
       * The ID of the process runs the renderer for this tab.
       * @since Chrome 22.
       */
  processId: number
}

export interface WebNavigationFramedErrorCallbackDetails extends WebNavigationFramedCallbackDetails {
  /** The error description. */
  error: string
}

export interface WebNavigationSourceCallbackDetails extends WebNavigationUrlCallbackDetails {
  /** The ID of the tab in which the navigation is triggered. */
  sourceTabId: number
  /**
       * The ID of the process runs the renderer for the source tab.
       * @since Chrome 22.
       */
  sourceProcessId: number
  /** The ID of the frame with sourceTabId in which the navigation is triggered. 0 indicates the main frame. */
  sourceFrameId: number
}

export interface WebNavigationParentedCallbackDetails extends WebNavigationFramedCallbackDetails {
  /**
       * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
       * @since Chrome 24.
       */
  parentFrameId: number
}

export interface WebNavigationTransitionCallbackDetails extends WebNavigationFramedCallbackDetails {
  /**
       * Cause of the navigation.
       * One of: "link", "typed", "auto_bookmark", "auto_subframe", "manual_subframe", "generated", "start_page", "form_submit", "reload", "keyword", or "keyword_generated"
       */
  transitionType: string
  /**
       * A list of transition qualifiers.
       * Each element one of: "client_redirect", "server_redirect", "forward_back", or "from_address_bar"
       */
  transitionQualifiers: string[]
}

export interface WebNavigationEventFilter {
  /** Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event. */
  url: chrome.events.UrlFilter[]
}

export interface WebNavigationEvent<T extends WebNavigationCallbackDetails>
  extends chrome.events.Event<(details: T) => void> {
  addListener: (callback: (details: T) => void, filters?: WebNavigationEventFilter) => void
}

export interface WebNavigationFramedEvent extends WebNavigationEvent<WebNavigationFramedCallbackDetails> {}

export interface WebNavigationFramedErrorEvent
  extends WebNavigationEvent<WebNavigationFramedErrorCallbackDetails>
{}

export interface WebNavigationSourceEvent extends WebNavigationEvent<WebNavigationSourceCallbackDetails> {}

export interface WebNavigationParentedEvent extends WebNavigationEvent<WebNavigationParentedCallbackDetails> {}

export interface WebNavigationTransitionalEvent
  extends WebNavigationEvent<WebNavigationTransitionCallbackDetails>
{}

export interface WebNavigationReplacementEvent
  extends WebNavigationEvent<WebNavigationReplacementCallbackDetails>
{}
export default interface _ {

  /**
   * Retrieves information about the given frame. A frame refers to an <iframe> or a <frame> of a web page and is identified by a tab ID and a frame ID.
   * @param details Information about the frame to retrieve information about.
   * @param callback
   * Optional parameter details: Information about the requested frame, null if the specified frame ID and/or tab ID are invalid.
   */
  getFrame: ((details: GetFrameDetails, callback: (details: GetFrameResultDetails | null) => void) => void) & ((details: GetFrameDetails) => Promise<GetFrameResultDetails | null>)

  /**
   * Retrieves information about all frames of a given tab.
   * @param details Information about the tab to retrieve all frames from.
   * @param callback
   * Optional parameter details: A list of frames in the given tab, null if the specified tab ID is invalid.
   */
  getAllFrames: ((
    details: GetAllFrameDetails,
    callback: (details: GetAllFrameResultDetails[] | null) => void,
  ) => void) & ((
    details: GetAllFrameDetails,
  ) => Promise<GetAllFrameResultDetails[] | null>)

  /** Fired when the reference fragment of a frame was updated. All future events for that frame will use the updated URL. */
  onReferenceFragmentUpdated: WebNavigationTransitionalEvent

  /** Fired when a document, including the resources it refers to, is completely loaded and initialized. */
  onCompleted: WebNavigationFramedEvent

  /**
   * Fired when the frame's history was updated to a new URL. All future events for that frame will use the updated URL.
   * @since Chrome 22.
   */
  onHistoryStateUpdated: WebNavigationTransitionalEvent

  /** Fired when a new window, or a new tab in an existing window, is created to host a navigation. */
  onCreatedNavigationTarget: WebNavigationSourceEvent

  /**
   * Fired when the contents of the tab is replaced by a different (usually previously pre-rendered) tab.
   * @since Chrome 22.
   */
  onTabReplaced: WebNavigationReplacementEvent

  /** Fired when a navigation is about to occur. */
  onBeforeNavigate: WebNavigationParentedEvent

  /** Fired when a navigation is committed. The document (and the resources it refers to, such as images and subframes) might still be downloading, but at least part of the document has been received from the server and the browser has decided to switch to the new document. */
  onCommitted: WebNavigationTransitionalEvent

  /** Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading. */
  onDOMContentLoaded: WebNavigationFramedEvent

  /** Fired when an error occurs and the navigation is aborted. This can happen if either a network error occurred, or the user aborted the navigation. */
  onErrorOccurred: WebNavigationFramedErrorEvent
}
