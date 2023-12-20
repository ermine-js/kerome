/// /////////////////
// Offscreen
/// /////////////////
/**
* Use the offscreen API to create and manage offscreen documents.
* Availability: @since Chrome 109. Manifest v3.
* Permissions: "offscreen"
*/

/** The reason(s) the extension is creating the offscreen document. */
export enum Reason {
  /** A reason used for testing purposes only. */
  TESTING = 'TESTING',
  /** The offscreen document is responsible for playing audio. */
  AUDIO_PLAYBACK = 'AUDIO_PLAYBACK',
  /** The offscreen document needs to embed and script an iframe in order to modify the iframe's content. */
  IFRAME_SCRIPTING = 'IFRAME_SCRIPTING',
  /** The offscreen document needs to embed an iframe and scrape its DOM to extract information. */
  DOM_SCRAPING = 'DOM_SCRAPING',
  /** The offscreen document needs to interact with Blob objects (including URL.createObjectURL()). */
  BLOBS = 'BLOBS',
  /** The offscreen document needs to use the DOMParser API. */
  DOM_PARSER = 'DOM_PARSER',
  /** The offscreen document needs to interact with media streams from user media (e.g. getUserMedia()). */
  USER_MEDIA = 'USER_MEDIA',
  /** The offscreen document needs to interact with media streams from display media (e.g. getDisplayMedia()). */
  DISPLAY_MEDIA = 'DISPLAY_MEDIA',
  /** The offscreen document needs to use WebRTC APIs. */
  WEB_RTC = 'WEB_RTC',
  /** The offscreen document needs to interact with the clipboard APIs(e.g. Navigator.clipboard). */
  CLIPBOARD = 'CLIPBOARD',
  /** Specifies that the offscreen document needs access to localStorage. */
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  /** Specifies that the offscreen document needs to spawn workers. */
  WORKERS = 'WORKERS',
  /** Specifies that the offscreen document needs to use navigator.geolocation. */
  GEOLOCATION = 'GEOLOCATION',
}

/** The parameters describing the offscreen document to create. */
export interface CreateParameters {
  /** The reason(s) the extension is creating the offscreen document. */
  reasons: Reason[]
  /** The (relative) URL to load in the document. */
  url: string
  /** A developer-provided string that explains, in more detail, the need for the background context. The user agent _may_ use this in display to the user. */
  justification: string
}
export default interface _ {

  /**
   * Creates a new offscreen document for the extension.
   * @param parameters The parameters describing the offscreen document to create.
   * @return The `createDocument` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  createDocument: ((parameters: CreateParameters) => Promise<void>) & ((parameters: CreateParameters, callback: () => void) => void)

  /**
   * Closes the currently-open offscreen document for the extension.
   * @return The `closeDocument` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  closeDocument: (() => Promise<void>) & ((callback: () => void) => void)

  /**
   * Determines whether the extension has an active document.
   * @return The `hasDocument` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  hasDocument: (() => Promise<boolean>) & ((callback: (result: boolean) => void) => void)
}
