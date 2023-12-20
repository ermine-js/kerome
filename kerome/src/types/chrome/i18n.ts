/// /////////////////
// i18n
/// /////////////////
/**
* Use the chrome.i18n infrastructure to implement internationalization across your whole app or extension.
* @since Chrome 5.
*/

/** Holds detected ISO language code and its percentage in the input string */
export interface DetectedLanguage {
  /** An ISO language code such as 'en' or 'fr'.
       * For a complete list of languages supported by this method, see  [kLanguageInfoTable]{@link https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc}.
       * For an unknown language, 'und' will be returned, which means that [percentage] of the text is unknown to CLD */
  language: string

  /** The percentage of the detected language */
  percentage: number
}

/** Holds detected language reliability and array of DetectedLanguage */
export interface LanguageDetectionResult {
  /** CLD detected language reliability */
  isReliable: boolean

  /** Array of detectedLanguage */
  languages: DetectedLanguage[]
}
export default interface _ {

  /**
   * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use i18n.getUILanguage.
   * @return The `getAcceptLanguages` method provides its result via callback or returned as a `Promise` (MV3 only).
   * @since MV3
   */
  getAcceptLanguages: (() => Promise<string[]>) & ((callback: (languages: string[]) => void) => void)

  /**
   * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the getMessage() call is wrong — for example, messageName is not a string or the substitutions array has more than 9 elements — this method returns undefined.
   * @param messageName The name of the message, as specified in the messages.json file.
   * @param substitutions Optional. Up to 9 substitution strings, if the message requires any.
   */
  getMessage: (messageName: string, substitutions?: string | string[]) => string

  /**
   * Gets the browser UI language of the browser. This is different from i18n.getAcceptLanguages which returns the preferred user languages.
   * @since Chrome 35.
   */
  getUILanguage: () => string

  /** Detects the language of the provided text using CLD.
   * @param text User input string to be translated.
   * @return The `detectLanguage` method provides its result via callback or returned as a `Promise` (MV3 only).
   * @since MV3
   */
  detectLanguage: ((text: string) => Promise<LanguageDetectionResult>) & ((text: string, callback: (result: LanguageDetectionResult) => void) => void)
}
