import type * as chrome from './'
/// /////////////////
// Font Settings
/// /////////////////
/**
* Use the chrome.fontSettings API to manage Chrome's font settings.
* Availability: Since Chrome 22.
* Permissions:  "fontSettings"
*/

/** Represents a font name. */
export interface FontName {
  /** The display name of the font. */
  displayName: string
  /** The font ID. */
  fontId: string
}

export interface DefaultFontSizeDetails {
  /** The font size in pixels. */
  pixelSize: number
}

export interface FontDetails {
  /** The generic font family for the font. */
  genericFamily:
  | 'cursive'
  | 'fantasy'
  | 'fixed'
  | 'sansserif'
  | 'serif'
  | 'standard'
  /** Optional. The script for the font. If omitted, the global script font setting is affected.  */
  script?: string | undefined
}

export interface FullFontDetails {
  /** The generic font family for which the font setting has changed. */
  genericFamily: string
  /** The level of control this extension has over the setting. */
  levelOfControl: string
  /** Optional. The script code for which the font setting has changed.  */
  script?: string | undefined
  /** The font ID. See the description in getFont. */
  fontId: string
}

export interface FontDetailsResult {
  /** The level of control this extension has over the setting. */
  levelOfControl: string
  /** The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, fontId can differ from the font passed to setFont, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting. */
  fontId: string
}

export interface FontSizeDetails {
  /** The font size in pixels. */
  pixelSize: number
  /** The level of control this extension has over the setting. */
  levelOfControl: string
}

export interface SetFontSizeDetails {
  /** The font size in pixels. */
  pixelSize: number
}

export interface SetFontDetails extends FontDetails {
  /** The font ID. The empty string means to fallback to the global script font setting. */
  fontId: string
}

export interface DefaultFixedFontSizeChangedEvent extends chrome.events.Event<(details: FontSizeDetails) => void> {}

export interface DefaultFontSizeChangedEvent extends chrome.events.Event<(details: FontSizeDetails) => void> {}

export interface MinimumFontSizeChangedEvent extends chrome.events.Event<(details: FontSizeDetails) => void> {}

export interface FontChangedEvent extends chrome.events.Event<(details: FullFontDetails) => void> {}
export default interface _ {

  /**
   * Sets the default font size.
   * @return The `setDefaultFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setDefaultFontSize: ((details: DefaultFontSizeDetails) => Promise<void>) & ((details: DefaultFontSizeDetails, callback: Function) => void)

  /**
   * Gets the font for a given script and generic font family.
   * @return The `getFont` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getFont: ((details: FontDetails) => Promise<FontDetailsResult>) & ((details: FontDetails, callback: (details: FontDetailsResult) => void) => void)

  /**
   * Gets the default font size.
   * @param details This parameter is currently unused.
   * @return The `getDefaultFontSize` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getDefaultFontSize: ((details?: Object) => Promise<FontSizeDetails>) & ((callback: (options: FontSizeDetails) => void) => void) & ((details: Object, callback: (options: FontSizeDetails) => void) => void)

  /**
   * Gets the minimum font size.
   * @param details This parameter is currently unused.
   * @return The `getMinimumFontSize` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getMinimumFontSize: ((details?: object) => Promise<FontSizeDetails>) & ((callback: (options: FontSizeDetails) => void) => void) & ((details: object, callback: (options: FontSizeDetails) => void) => void)

  /**
   * Sets the minimum font size.
   * @return The `setMinimumFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setMinimumFontSize: ((details: SetFontSizeDetails) => Promise<void>) & ((details: SetFontSizeDetails, callback: Function) => void)

  /**
   * Gets the default size for fixed width fonts.
   * @param details This parameter is currently unused.
   * @return The `getDefaultFixedFontSize` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getDefaultFixedFontSize: ((details?: Object) => Promise<FontSizeDetails>) & ((callback: (details: FontSizeDetails) => void) => void) & ((details: Object, callback: (details: FontSizeDetails) => void) => void)

  /**
   * Clears the default font size set by this extension, if any.
   * @param details This parameter is currently unused.
   * @return The `clearDefaultFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  clearDefaultFontSize: ((details?: Object) => Promise<void>) & ((callback: Function) => void) & ((details: Object, callback: Function) => void)

  /**
   * Sets the default size for fixed width fonts.
   * @return The `setDefaultFixedFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setDefaultFixedFontSize: ((details: SetFontSizeDetails) => Promise<void>) & ((details: SetFontSizeDetails, callback: Function) => void)

  /**
   * Clears the font set by this extension, if any.
   * @return The `clearFont` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  clearFont: ((details: FontDetails) => Promise<void>) & ((details: FontDetails, callback: Function) => void)

  /**
   * Sets the font for a given script and generic font family.
   * @return The `setFont` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setFont: ((details: SetFontDetails) => Promise<void>) & ((details: SetFontDetails, callback: Function) => void)

  /**
   * Clears the minimum font size set by this extension, if any.
   * @param details This parameter is currently unused.
   * @return The `clearMinimumFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  clearMinimumFontSize: ((details?: Object) => Promise<void>) & ((callback: Function) => void) & ((details: Object, callback: Function) => void)

  /**
   * Gets a list of fonts on the system.
   * @return The `getFontList` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getFontList: (() => Promise<FontName[]>) & ((callback: (results: FontName[]) => void) => void)

  /**
   * Clears the default fixed font size set by this extension, if any.
   * @param details This parameter is currently unused.
   * @return The `clearDefaultFixedFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  clearDefaultFixedFontSize: ((details: Object) => Promise<void>) & ((details: Object, callback: Function) => void)

  /** Fired when the default fixed font size setting changes. */
  onDefaultFixedFontSizeChanged: DefaultFixedFontSizeChangedEvent

  /** Fired when the default font size setting changes. */
  onDefaultFontSizeChanged: DefaultFontSizeChangedEvent

  /** Fired when the minimum font size setting changes. */
  onMinimumFontSizeChanged: MinimumFontSizeChangedEvent

  /** Fired when a font setting changes. */
  onFontChanged: FontChangedEvent
}
