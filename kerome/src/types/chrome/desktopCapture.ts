import type * as chrome from './'
/// /////////////////
// DesktopCapture
/// /////////////////
/**
* Desktop Capture API that can be used to capture content of screen, individual windows or tabs.
* Availability: Since Chrome 34.
* Permissions:  "desktopCapture"
*/

/** Contains properties that describe the stream. */
export interface StreamOptions {
  /** True if "audio" is included in parameter sources, and the end user does not uncheck the "Share audio" checkbox. Otherwise false, and in this case, one should not ask for audio stream through getUserMedia call. */
  canRequestAudioTrack: boolean
}
export default interface _ {

  /**
   * Shows desktop media picker UI with the specified set of sources.
   * @param sources Set of sources that should be shown to the user.
   * Parameter streamId: An opaque string that can be passed to getUserMedia() API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty streamId. The created streamId can be used only once and expires after a few seconds when it is not used.
   */
  chooseDesktopMedia: ((
    sources: string[],
    callback: (streamId: string, options: StreamOptions) => void,
  ) => number) & ((
    sources: string[],
    targetTab: chrome.tabs.Tab,
    callback: (streamId: string, options: StreamOptions) => void,
  ) => number)

  /**
   * Hides desktop media picker dialog shown by chooseDesktopMedia().
   * @param desktopMediaRequestId Id returned by chooseDesktopMedia()
   */
  cancelChooseDesktopMedia: (desktopMediaRequestId: number) => void
}
