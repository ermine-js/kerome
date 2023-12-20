import type * as chrome from './'
/// /////////////////
// TabCapture
/// /////////////////
/**
* Use the chrome.tabCapture API to interact with tab media streams.
* Permissions:  "tabCapture"
* @since Chrome 31.
*/

export interface CaptureInfo {
  /** The id of the tab whose status changed. */
  tabId: number
  /**
       * The new capture status of the tab.
       * One of: "pending", "active", "stopped", or "error"
       */
  status: string
  /** Whether an element in the tab being captured is in fullscreen mode. */
  fullscreen: boolean
}

export interface MediaStreamConstraint {
  mandatory: object
  optional?: object | undefined
}

export interface CaptureOptions {
  /** Optional. */
  audio?: boolean | undefined
  /** Optional. */
  video?: boolean | undefined
  /** Optional. */
  audioConstraints?: MediaStreamConstraint | undefined
  /** Optional. */
  videoConstraints?: MediaStreamConstraint | undefined
}

export interface GetMediaStreamOptions {
  /** Optional tab id of the tab which will later invoke getUserMedia() to consume the stream. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches the consumber tab's origin. The tab's origin must be a secure origin, e.g. HTTPS. */
  consumerTabId?: number | undefined
  /** Optional tab id of the tab which will be captured. If not specified then the current active tab will be selected. Only tabs for which the extension has been granted the activeTab permission can be used as the target tab. */
  targetTabId?: number | undefined
}

export interface CaptureStatusChangedEvent extends chrome.events.Event<(info: CaptureInfo) => void> {}
export default interface _ {

  /**
   * Captures the visible area of the currently active tab. Capture can only be started on the currently active tab after the extension has been invoked. Capture is maintained across page navigations within the tab, and stops when the tab is closed, or the media stream is closed by the extension.
   * @param options Configures the returned media stream.
   * @param callback Callback with either the tab capture stream or null.
   */
  capture: (options: CaptureOptions, callback: (stream: MediaStream | null) => void) => void

  /**
   * Returns a list of tabs that have requested capture or are being captured, i.e. status != stopped and status != error. This allows extensions to inform the user that there is an existing tab capture that would prevent a new tab capture from succeeding (or to prevent redundant requests for the same tab).
   * @param callback Callback invoked with CaptureInfo[] for captured tabs.
   */
  getCapturedTabs: (callback: (result: CaptureInfo[]) => void) => void

  /**
   * Creates a stream ID to capture the target tab. Similar to chrome.tabCapture.capture() method, but returns a media stream ID, instead of a media stream, to the consumer tab.
   * @param options Options for the media stream id to retrieve.
   * @param callback Callback to invoke with the result. If successful, the result is an opaque string that can be passed to the getUserMedia() API to generate a media stream that corresponds to the target tab. The created streamId can only be used once and expires after a few seconds if it is not used.
   */
  getMediaStreamId: (options: GetMediaStreamOptions, callback: (streamId: string) => void) => void

  /** Event fired when the capture status of a tab changes. This allows extension authors to keep track of the capture status of tabs to keep UI elements like page actions in sync. */
  onStatusChanged: CaptureStatusChangedEvent
}
