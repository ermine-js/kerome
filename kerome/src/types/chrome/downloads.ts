import type * as chrome from './'
/// /////////////////
// Dev Tools - Downloads
/// /////////////////
/**
* Use the chrome.downloads API to programmatically initiate, monitor, manipulate, and search for downloads.
* Availability: Since Chrome 31.
* Permissions:  "downloads"
*/

export interface HeaderNameValuePair {
  /** Name of the HTTP header. */
  name: string
  /** Value of the HTTP header. */
  value: string
}

export type FilenameConflictAction = 'uniquify' | 'overwrite' | 'prompt'

export interface DownloadOptions {
  /** Optional. Post body.  */
  body?: string | undefined
  /** Optional. Use a file-chooser to allow the user to select a filename regardless of whether filename is set or already exists.  */
  saveAs?: boolean | undefined
  /** The URL to download. */
  url: string
  /** Optional. A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will cause an error. onDeterminingFilename allows suggesting a filename after the file's MIME type and a tentative filename have been determined.  */
  filename?: string | undefined
  /** Optional. Extra HTTP headers to send with the request if the URL uses the HTTP[s] protocol. Each header is represented as a dictionary containing the keys name and either value or binaryValue, restricted to those allowed by XMLHttpRequest.  */
  headers?: HeaderNameValuePair[] | undefined
  /** Optional. The HTTP method to use if the URL uses the HTTP[S] protocol.  */
  method?: 'GET' | 'POST' | undefined
  /** Optional. The action to take if filename already exists.  */
  conflictAction?: FilenameConflictAction | undefined
}

export interface DownloadDelta {
  /** The id of the DownloadItem that changed. */
  id: number
  /** Optional. The change in danger, if any.  */
  danger?: StringDelta | undefined
  /** Optional. The change in url, if any.  */
  url?: StringDelta | undefined
  /**
       * Optional. The change in finalUrl, if any.
       * @since Since Chrome 54.
       */
  finalUrl?: StringDelta | undefined
  /** Optional. The change in totalBytes, if any.  */
  totalBytes?: DoubleDelta | undefined
  /** Optional. The change in filename, if any.  */
  filename?: StringDelta | undefined
  /** Optional. The change in paused, if any.  */
  paused?: BooleanDelta | undefined
  /** Optional. The change in state, if any.  */
  state?: StringDelta | undefined
  /** Optional. The change in mime, if any.  */
  mime?: StringDelta | undefined
  /** Optional. The change in fileSize, if any.  */
  fileSize?: DoubleDelta | undefined
  /** Optional. The change in startTime, if any.  */
  startTime?: StringDelta | undefined
  /** Optional. The change in error, if any.  */
  error?: StringDelta | undefined
  /** Optional. The change in endTime, if any.  */
  endTime?: StringDelta | undefined
  /** Optional. The change in canResume, if any.  */
  canResume?: BooleanDelta | undefined
  /** Optional. The change in exists, if any.  */
  exists?: BooleanDelta | undefined
}

export interface BooleanDelta {
  current?: boolean | undefined
  previous?: boolean | undefined
}

/** Since Chrome 34. */
export interface DoubleDelta {
  current?: number | undefined
  previous?: number | undefined
}

export interface StringDelta {
  current?: string | undefined
  previous?: string | undefined
}

export type DownloadInterruptReason =
      | 'FILE_FAILED'
      | 'FILE_ACCESS_DENIED'
      | 'FILE_NO_SPACE'
      | 'FILE_NAME_TOO_LONG'
      | 'FILE_TOO_LARGE'
      | 'FILE_VIRUS_INFECTED'
      | 'FILE_TRANSIENT_ERROR'
      | 'FILE_BLOCKED'
      | 'FILE_SECURITY_CHECK_FAILED'
      | 'FILE_TOO_SHORT'
      | 'FILE_HASH_MISMATCH'
      | 'FILE_SAME_AS_SOURCE'
      | 'NETWORK_FAILED'
      | 'NETWORK_TIMEOUT'
      | 'NETWORK_DISCONNECTED'
      | 'NETWORK_SERVER_DOWN'
      | 'NETWORK_INVALID_REQUEST'
      | 'SERVER_FAILED'
      | 'SERVER_NO_RANGE'
      | 'SERVER_BAD_CONTENT'
      | 'SERVER_UNAUTHORIZED'
      | 'SERVER_CERT_PROBLEM'
      | 'SERVER_FORBIDDEN'
      | 'SERVER_UNREACHABLE'
      | 'SERVER_CONTENT_LENGTH_MISMATCH'
      | 'SERVER_CROSS_ORIGIN_REDIRECT'
      | 'USER_CANCELED'
      | 'USER_SHUTDOWN'
      | 'CRASH'

export type DownloadState = 'in_progress' | 'interrupted' | 'complete'

export type DangerType = 'file' | 'url' | 'content' | 'uncommon' | 'host' | 'unwanted' | 'safe' | 'accepted'

export interface DownloadItem {
  /** Number of bytes received so far from the host, without considering file compression. */
  bytesReceived: number
  /** Indication of whether this download is thought to be safe or known to be suspicious. */
  danger: DangerType
  /** The absolute URL that this download initiated from, before any redirects. */
  url: string
  /**
       * The absolute URL that this download is being made from, after all redirects.
       * @since Since Chrome 54.
       */
  finalUrl: string
  /** Number of bytes in the whole file, without considering file compression, or -1 if unknown. */
  totalBytes: number
  /** Absolute local path. */
  filename: string
  /** True if the download has stopped reading data from the host, but kept the connection open. */
  paused: boolean
  /** Indicates whether the download is progressing, interrupted, or complete. */
  state: DownloadState
  /** The file's MIME type. */
  mime: string
  /** Number of bytes in the whole file post-decompression, or -1 if unknown. */
  fileSize: number
  /** The time when the download began in ISO 8601 format. May be passed directly to the Date constructor: chrome.downloads.search({}, function(items){items.forEach(function(item){console.log(new Date(item.startTime))})}) */
  startTime: string
  /** Optional. Why the download was interrupted. Several kinds of HTTP errors may be grouped under one of the errors beginning with SERVER_. Errors relating to the network begin with NETWORK_, errors relating to the process of writing the file to the file system begin with FILE_, and interruptions initiated by the user begin with USER_.  */
  error?: DownloadInterruptReason | undefined
  /** Optional. The time when the download ended in ISO 8601 format. May be passed directly to the Date constructor: chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.endTime) console.log(new Date(item.endTime))})})  */
  endTime?: string | undefined
  /** An identifier that is persistent across browser sessions. */
  id: number
  /** False if this download is recorded in the history, true if it is not recorded. */
  incognito: boolean
  /** Absolute URL. */
  referrer: string
  /** Optional. Estimated time when the download will complete in ISO 8601 format. May be passed directly to the Date constructor: chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.estimatedEndTime) console.log(new Date(item.estimatedEndTime))})})  */
  estimatedEndTime?: string | undefined
  /** True if the download is in progress and paused, or else if it is interrupted and can be resumed starting from where it was interrupted. */
  canResume: boolean
  /** Whether the downloaded file still exists. This information may be out of date because Chrome does not automatically watch for file removal. Call search() in order to trigger the check for file existence. When the existence check completes, if the file has been deleted, then an onChanged event will fire. Note that search() does not wait for the existence check to finish before returning, so results from search() may not accurately reflect the file system. Also, search() may be called as often as necessary, but will not check for file existence any more frequently than once every 10 seconds. */
  exists: boolean
  /** Optional. The identifier for the extension that initiated this download if this download was initiated by an extension. Does not change once it is set.  */
  byExtensionId?: string | undefined
  /** Optional. The localized name of the extension that initiated this download if this download was initiated by an extension. May change if the extension changes its name or if the user changes their locale.  */
  byExtensionName?: string | undefined
}

export interface GetFileIconOptions {
  /** Optional. * The size of the returned icon. The icon will be square with dimensions size * size pixels. The default and largest size for the icon is 32x32 pixels. The only supported sizes are 16 and 32. It is an error to specify any other size.
       */
  size?: 16 | 32 | undefined
}

export interface DownloadQuery {
  /** Optional. Set elements of this array to DownloadItem properties in order to sort search results. For example, setting orderBy=['startTime'] sorts the DownloadItem by their start time in ascending order. To specify descending order, prefix with a hyphen: '-startTime'.  */
  orderBy?: string[] | undefined
  /** Optional. Limits results to DownloadItem whose url matches the given regular expression.  */
  urlRegex?: string | undefined
  /** Optional. Limits results to DownloadItem that ended before the time in ISO 8601 format.  */
  endedBefore?: string | undefined
  /** Optional. Limits results to DownloadItem whose totalBytes is greater than the given integer.  */
  totalBytesGreater?: number | undefined
  /** Optional. Indication of whether this download is thought to be safe or known to be suspicious.  */
  danger?: string | undefined
  /** Optional. Number of bytes in the whole file, without considering file compression, or -1 if unknown.  */
  totalBytes?: number | undefined
  /** Optional. True if the download has stopped reading data from the host, but kept the connection open.  */
  paused?: boolean | undefined
  /** Optional. Limits results to DownloadItem whose filename matches the given regular expression.  */
  filenameRegex?: string | undefined
  /** Optional. This array of search terms limits results to DownloadItem whose filename or url contain all of the search terms that do not begin with a dash '-' and none of the search terms that do begin with a dash.  */
  query?: string[] | undefined
  /** Optional. Limits results to DownloadItem whose totalBytes is less than the given integer.  */
  totalBytesLess?: number | undefined
  /** Optional. The id of the DownloadItem to query.  */
  id?: number | undefined
  /** Optional. Number of bytes received so far from the host, without considering file compression.  */
  bytesReceived?: number | undefined
  /** Optional. Limits results to DownloadItem that ended after the time in ISO 8601 format.  */
  endedAfter?: string | undefined
  /** Optional. Absolute local path.  */
  filename?: string | undefined
  /** Optional. Indicates whether the download is progressing, interrupted, or complete.  */
  state?: string | undefined
  /** Optional. Limits results to DownloadItem that started after the time in ISO 8601 format.  */
  startedAfter?: string | undefined
  /** Optional. The file's MIME type.  */
  mime?: string | undefined
  /** Optional. Number of bytes in the whole file post-decompression, or -1 if unknown.  */
  fileSize?: number | undefined
  /** Optional. The time when the download began in ISO 8601 format.  */
  startTime?: string | undefined
  /** Optional. Absolute URL.  */
  url?: string | undefined
  /** Optional. Limits results to DownloadItem that started before the time in ISO 8601 format.  */
  startedBefore?: string | undefined
  /** Optional. The maximum number of matching DownloadItem returned. Defaults to 1000. Set to 0 in order to return all matching DownloadItem. See search for how to page through results.  */
  limit?: number | undefined
  /** Optional. Why a download was interrupted.  */
  error?: number | undefined
  /** Optional. The time when the download ended in ISO 8601 format.  */
  endTime?: string | undefined
  /** Optional. Whether the downloaded file exists;  */
  exists?: boolean | undefined
}

export interface DownloadFilenameSuggestion {
  /** The DownloadItem's new target DownloadItem.filename, as a path relative to the user's default Downloads directory, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will be ignored. */
  filename: string
  /** Optional. The action to take if filename already exists.  */
  conflictAction?: string | undefined
}

export interface UiOptions {
  /** Enable or disable the download UI. */
  enabled: boolean
}

export interface DownloadChangedEvent extends chrome.events.Event<(downloadDelta: DownloadDelta) => void> {}

export interface DownloadCreatedEvent extends chrome.events.Event<(downloadItem: DownloadItem) => void> {}

export interface DownloadErasedEvent extends chrome.events.Event<(downloadId: number) => void> {}

export interface DownloadDeterminingFilenameEvent extends
  chrome.events.Event<
  (downloadItem: DownloadItem, suggest: (suggestion?: DownloadFilenameSuggestion) => void) => void
  >
{}
export default interface _ {

  /**
   * Find DownloadItem. Set query to the empty object to get all DownloadItem. To get a specific DownloadItem, set only the id field. To page through a large number of items, set orderBy: ['-startTime'], set limit to the number of items per page, and set startedAfter to the startTime of the last item from the last page.
   * @return The `search` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  search: ((query: DownloadQuery) => Promise<DownloadItem[]>) & ((query: DownloadQuery, callback: (results: DownloadItem[]) => void) => void)

  /**
   * Pause the download. If the request was successful the download is in a paused state. Otherwise runtime.lastError contains an error message. The request will fail if the download is not active.
   * @param downloadId The id of the download to pause.
   * @return The `pause` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  pause: ((downloadId: number) => Promise<void>) & ((downloadId: number, callback: () => void) => void)

  /**
   * Retrieve an icon for the specified download. For new downloads, file icons are available after the onCreated event has been received. The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, runtime.lastError will contain an error message.
   * @param downloadId The identifier for the download.
   * @return The `getFileIcon` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getFileIcon: ((downloadId: number, options?: GetFileIconOptions) => Promise<string>) & ((downloadId: number, callback: (iconURL: string) => void) => void) & ((
    downloadId: number,
    options: GetFileIconOptions,
    callback: (iconURL: string) => void,
  ) => void)

  /**
   * Resume a paused download. If the request was successful the download is in progress and unpaused. Otherwise runtime.lastError contains an error message. The request will fail if the download is not active.
   * @param downloadId The id of the download to resume.
   * @return The `resume` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  resume: ((downloadId: number) => Promise<void>) & ((downloadId: number, callback: () => void) => void)

  /**
   * Cancel a download. When callback is run, the download is cancelled, completed, interrupted or doesn't exist anymore.
   * @param downloadId The id of the download to cancel.
   * @return The `cancel` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  cancel: ((downloadId: number) => Promise<void>) & ((downloadId: number, callback: () => void) => void)

  /**
   * Download a URL. If the URL uses the HTTP[S] protocol, then the request will include all cookies currently set for its hostname. If both filename and saveAs are specified, then the Save As dialog will be displayed, pre-populated with the specified filename. If the download started successfully, callback will be called with the new DownloadItem's downloadId. If there was an error starting the download, then callback will be called with downloadId=undefined and runtime.lastError will contain a descriptive string. The error strings are not guaranteed to remain backwards compatible between releases. Extensions must not parse it.
   * @param options What to download and how.
   * @return The `download` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  download: ((options: DownloadOptions) => Promise<number>) & ((options: DownloadOptions, callback: (downloadId: number) => void) => void)

  /**
   * Open the downloaded file now if the DownloadItem is complete; otherwise returns an error through runtime.lastError. Requires the "downloads.open" permission in addition to the "downloads" permission. An onChanged event will fire when the item is opened for the first time.
   * @param downloadId The identifier for the downloaded file.
   */
  open: (downloadId: number) => void

  /**
   * Show the downloaded file in its folder in a file manager.
   * @param downloadId The identifier for the downloaded file.
   */
  show: (downloadId: number) => void

  /** Show the default Downloads folder in a file manager. */
  showDefaultFolder: () => void

  /**
   * Erase matching DownloadItem from history without deleting the downloaded file. An onErased event will fire for each DownloadItem that matches query, then callback will be called.
   * @return The `erase` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  erase: ((query: DownloadQuery) => Promise<number[]>) & ((query: DownloadQuery, callback: (erasedIds: number[]) => void) => void)

  /**
   * Remove the downloaded file if it exists and the DownloadItem is complete; otherwise return an error through runtime.lastError.
   * @return The `removeFile` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeFile: ((downloadId: number) => Promise<void>) & ((downloadId: number, callback?: () => void) => void)

  /**
   * Prompt the user to accept a dangerous download. Can only be called from a visible context (tab, window, or page/browser action popup). Does not automatically accept dangerous downloads. If the download is accepted, then an onChanged event will fire, otherwise nothing will happen. When all the data is fetched into a temporary file and either the download is not dangerous or the danger has been accepted, then the temporary file is renamed to the target filename, the |state| changes to 'complete', and onChanged fires.
   * @param downloadId The identifier for the DownloadItem.
   * @return The `acceptDanger` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  acceptDanger: ((downloadId: number) => Promise<void>) & ((downloadId: number, callback: () => void) => void)

  /** Initiate dragging the downloaded file to another application. Call in a javascript ondragstart handler. */
  drag: (downloadId: number) => void

  /** Enable or disable the gray shelf at the bottom of every window associated with the current browser profile. The shelf will be disabled as long as at least one extension has disabled it. Enabling the shelf while at least one other extension has disabled it will return an error through runtime.lastError. Requires the "downloads.shelf" permission in addition to the "downloads" permission. */
  setShelfEnabled: (enabled: boolean) => void

  /**
   * Change the download UI of every window associated with the current browser profile. As long as at least one extension has set UiOptions.enabled to false, the download UI will be hidden. Setting UiOptions.enabled to true while at least one other extension has disabled it will return an error through runtime.lastError. Requires the "downloads.ui" permission in addition to the "downloads" permission.
   * @param options Encapsulate a change to the download UI.
   * @since Chrome 105
   */
  setUiOptions: ((options: UiOptions) => Promise<void>) & ((options: UiOptions, callback: () => void) => void)

  /** When any of a DownloadItem's properties except bytesReceived and estimatedEndTime changes, this event fires with the downloadId and an object containing the properties that changed. */
  onChanged: DownloadChangedEvent

  /** This event fires with the DownloadItem object when a download begins. */
  onCreated: DownloadCreatedEvent

  /** Fires with the downloadId when a download is erased from history. */
  onErased: DownloadErasedEvent

  /** During the filename determination process, extensions will be given the opportunity to override the target DownloadItem.filename. Each extension may not register more than one listener for this event. Each listener must call suggest exactly once, either synchronously or asynchronously. If the listener calls suggest asynchronously, then it must return true. If the listener neither calls suggest synchronously nor returns true, then suggest will be called automatically. The DownloadItem will not complete until all listeners have called suggest. Listeners may call suggest without any arguments in order to allow the download to use downloadItem.filename for its filename, or pass a suggestion object to suggest in order to override the target filename. If more than one extension overrides the filename, then the last extension installed whose listener passes a suggestion object to suggest wins. In order to avoid confusion regarding which extension will win, users should not install extensions that may conflict. If the download is initiated by download and the target filename is known before the MIME type and tentative filename have been determined, pass filename to download instead. */
  onDeterminingFilename: DownloadDeterminingFilenameEvent
}
