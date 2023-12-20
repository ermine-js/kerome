import type * as chrome from '../'
/// /////////////////
// Dev Tools - Network
/// /////////////////
/**
* Use the chrome.devtools.network API to retrieve the information about network requests displayed by the Developer Tools in the Network panel.
* Availability: Since Chrome 18.
*/

/** Represents a HAR entry for a specific finished request. */
export interface HAREntry extends HARFormatEntry {}

/** Represents a HAR log that contains all known network requests. */
export interface HARLog extends HARFormatLog {}

/** Represents a network request for a document resource (script, image and so on). See HAR Specification for reference. */
export interface Request extends chrome.devtools.network.HAREntry {
  /**
       * Returns content of the response body.
       * @param callback A function that receives the response body when the request completes.
       */
  getContent: (
    callback: (
      /** Content of the response body (potentially encoded) */
      content: string,
      /** Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported */
      encoding: string,
    ) => void,
  ) => void
}

export interface RequestFinishedEvent extends chrome.events.Event<(request: Request) => void> {}

export interface NavigatedEvent extends chrome.events.Event<(url: string) => void> {}
export default interface _ {

  /**
   * Returns HAR log that contains all known network requests.
   * @param callback A function that receives the HAR log when the request completes.
   * Parameter harLog: A HAR log. See HAR specification for details.
   */
  getHAR: (callback: (harLog: HARLog) => void) => void

  /** Fired when a network request is finished and all request data are available. */
  onRequestFinished: RequestFinishedEvent

  /** Fired when the inspected window navigates to a new page. */
  onNavigated: NavigatedEvent
}
