import type * as chrome from './'
/// /////////////////
// Accessibility Features
/// /////////////////
/**
* Use the chrome.accessibilityFeatures API to manage Chrome's accessibility features. This API relies on the ChromeSetting prototype of the type API for getting and setting individual accessibility features. In order to get feature states the extension must request accessibilityFeatures.read permission. For modifying feature state, the extension needs accessibilityFeatures.modify permission. Note that accessibilityFeatures.modify does not imply accessibilityFeatures.read permission.
* Availability: Since Chrome 37.
* Permissions: "accessibilityFeatures.read"
* Important: This API works only on Chrome OS.
*/
export default interface _ {

  /** **ChromeOS only.** Spoken feedback (text-to-speech). */
  spokenFeedback: chrome.types.ChromeSetting

  /** **ChromeOS only.** Enlarged cursor. */
  largeCursor: chrome.types.ChromeSetting

  /** **ChromeOS only.** Sticky modifier keys (like shift or alt). */
  stickyKeys: chrome.types.ChromeSetting

  /** **ChromeOS only.** High contrast rendering mode. */
  highContrast: chrome.types.ChromeSetting

  /** **ChromeOS only.** Full screen magnification. */
  screenMagnifier: chrome.types.ChromeSetting

  /** **ChromeOS only.** Auto mouse click after mouse stops moving. */
  autoclick: chrome.types.ChromeSetting

  /** **ChromeOS only.** Virtual on-screen keyboard. */
  virtualKeyboard: chrome.types.ChromeSetting

  /**
   * **ChromeOS only.**
   * Caret highlighting.
   * @since Chrome 51.
   */
  caretHighlight: chrome.types.ChromeSetting

  /**
   * **ChromeOS only.**
   * Cursor highlighting.
   * @since Chrome 51.
   */
  cursorHighlight: chrome.types.ChromeSetting

  /**
   * **ChromeOS only.**
   * Focus highlighting.
   * @since Chrome 51.
   */
  focusHighlight: chrome.types.ChromeSetting

  /**
   * **ChromeOS only.**
   * Select-to-speak.
   * @since Chrome 51.
   */
  selectToSpeak: chrome.types.ChromeSetting

  /**
   * **ChromeOS only.**
   * Switch Access.
   * @since Chrome 51.
   */
  switchAccess: chrome.types.ChromeSetting

  /**
   * @since Chrome 42.
   */
  animationPolicy: chrome.types.ChromeSetting
}
