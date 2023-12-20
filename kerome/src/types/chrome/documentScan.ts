/// /////////////////
// Document Scan
/// /////////////////
/**
* Use the chrome.documentScan API to discover and retrieve images from attached paper document scanners.
* Availability: Since Chrome 44.
* Permissions:  "documentScan"
* Important: This API works only on Chrome OS.
*/

export interface DocumentScanOptions {
  /** Optional. The MIME types that are accepted by the caller.  */
  mimeTypes?: string[] | undefined
  /** Optional. The number of scanned images allowed (defaults to 1).  */
  maxImages?: number | undefined
}

export interface DocumentScanCallbackArg {
  /** The data image URLs in a form that can be passed as the "src" value to an image tag. */
  dataUrls: string[]
  /** The MIME type of dataUrls. */
  mimeType: string
}
export default interface _ {

  /**
   * Performs a document scan. On success, the PNG data will be sent to the callback.
   * @param options Object containing scan parameters.
   * @param callback Called with the result and data from the scan.
   */
  scan: (options: DocumentScanOptions, callback: (result: DocumentScanCallbackArg) => void) => void
}
