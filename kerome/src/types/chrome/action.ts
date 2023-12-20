import type * as chrome from './'
/// /////////////////
// Action
/// /////////////////
/**
* Use the chrome.action API to control the extension's icon in the Google Chrome toolbar.
* Availability: Since Chrome 88. Manifest v3.
* Manifest:  "action": {...}
*/

/** @deprecated Use BadgeColorDetails instead. */
export interface BadgeBackgroundColorDetails extends BadgeColorDetails {}

export interface BadgeColorDetails {
  /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is [255, 0, 0, 255]. Can also be a string with a CSS value, with opaque red being #FF0000 or #F00. */
  color: string | ColorArray
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
  tabId?: number | undefined
}

export interface BadgeTextDetails {
  /** Any number of characters can be passed, but only about four can fit in the space. */
  text: string
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
  tabId?: number | undefined
}

export type ColorArray = [number, number, number, number]

export interface TitleDetails {
  /** The string the action should display when moused over. */
  title: string
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
  tabId?: number | undefined
}

export interface PopupDetails {
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
  tabId?: number | undefined
  /** The html file to show in a popup. If set to the empty string (''), no popup is shown. */
  popup: string
}

export interface BrowserClickedEvent extends chrome.events.Event<(tab: chrome.tabs.Tab) => void> {}

export interface TabIconDetails {
  /** Optional. Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'  */
  path?: string | Record<number, string> | undefined
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
  tabId?: number | undefined
  /** Optional. Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'  */
  imageData?: ImageData | Record<number, ImageData> | undefined
}

export interface OpenPopupOptions {
  /** Optional. The id of the window to open the action popup in. Defaults to the currently-active window if unspecified.  */
  windowId?: number | undefined
}

export interface TabDetails {
  /** Optional. The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.  */
  tabId?: number | undefined
}

export interface UserSettings {
  /** Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user). */
  isOnToolbar: boolean
}
export default interface _ {

  /**
   * Since Chrome 88.
   * Disables the action for a tab.
   * @param tabId The id of the tab for which you want to modify the action.
   * @return The `disable` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  disable: ((tabId?: number) => Promise<void>) & ((callback: () => void) => void) & ((tabId: number, callback: () => void) => void)

  /**
   * Since Chrome 88.
   * Enables the action for a tab. By default, actions are enabled.
   * @param tabId The id of the tab for which you want to modify the action.
   * @return The `enable` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  enable: ((tabId?: number) => Promise<void>) & ((callback: () => void) => void) & ((tabId: number, callback: () => void) => void)

  /**
   * Since Chrome 88.
   * Gets the background color of the action.
   */
  getBadgeBackgroundColor: ((details: TabDetails, callback: (result: ColorArray) => void) => void) & ((details: TabDetails) => Promise<ColorArray>)

  /**
   * Since Chrome 88.
   * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned.
   * If displayActionCountAsBadgeText is enabled, a placeholder text will be returned unless the
   * declarativeNetRequestFeedback permission is present or tab-specific badge text was provided.
   */
  getBadgeText: ((details: TabDetails, callback: (result: string) => void) => void) & ((details: TabDetails) => Promise<string>)

  /**
   * Since Chrome 110.
   * Gets the text color of the action.
   */
  getBadgeTextColor: ((details: TabDetails, callback: (result: ColorArray) => void) => void) & ((details: TabDetails) => Promise<ColorArray>)

  /**
   * Since Chrome 88.
   * Gets the html document set as the popup for this action.
   */
  getPopup: ((details: TabDetails, callback: (result: string) => void) => void) & ((details: TabDetails) => Promise<string>)

  /**
   * Since Chrome 88.
   * Gets the title of the action.
   */
  getTitle: ((details: TabDetails, callback: (result: string) => void) => void) & ((details: TabDetails) => Promise<string>)

  /**
   * Since Chrome 91.
   * Returns the user-specified settings relating to an extension's action.
   */
  getUserSettings: ((callback: (userSettings: UserSettings) => void) => void) & (() => Promise<UserSettings>)

  /**
   * Since Chrome 110.
   * Indicates whether the extension action is enabled for a tab (or globally if no tabId is provided). Actions enabled using only declarativeContent always return false.
   */
  isEnabled: ((tabId: number | undefined, callback: (isEnabled: boolean) => void) => void) & ((tabId?: number) => Promise<boolean>)

  /**
   * Since Chrome 99+.
   * Opens the extension's popup.
   * @param options Specifies options for opening the popup.
   * () => {...}
   * @return The `openPopup` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  openPopup: ((options?: OpenPopupOptions) => Promise<void>) & ((callback: () => void) => void) & ((options: OpenPopupOptions, callback: () => void) => void)

  /**
   * Since Chrome 88.
   * Sets the background color for the badge.
   * @return The `setBadgeBackgroundColor` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setBadgeBackgroundColor: ((details: BadgeColorDetails) => Promise<void>) & ((details: BadgeColorDetails, callback: () => void) => void)

  /**
   * Since Chrome 88.
   * Sets the badge text for the action. The badge is displayed on top of the icon.
   * @return The `setBadgeText` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setBadgeText: ((details: BadgeTextDetails) => Promise<void>) & ((details: BadgeTextDetails, callback: () => void) => void)

  /**
   * Since Chrome 110.
   * Sets the text color for the badge.
   * @return The `setBadgeTextColor` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setBadgeTextColor: ((details: BadgeColorDetails) => Promise<void>) & ((details: BadgeColorDetails, callback: () => void) => void)

  /**
   * Since Chrome 88.
   * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element,
   * or as dictionary of either one of those. Either the path or the imageData property must be specified.
   * @return The `setIcon` method provides its result via callback or returned as a `Promise` (MV3 only). Since Chrome 96.
   */
  setIcon: ((details: TabIconDetails) => Promise<void>) & ((details: TabIconDetails, callback: () => void) => void)

  /**
   * Since Chrome 88.
   * Sets the html document to be opened as a popup when the user clicks on the action's icon.
   * @return The `setPopup` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setPopup: ((details: PopupDetails) => Promise<void>) & ((details: PopupDetails, callback: () => void) => void)

  /**
   * Since Chrome 88.
   * Sets the title of the action. This shows up in the tooltip.
   * @return The `setTitle` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setTitle: ((details: TitleDetails) => Promise<void>) & ((details: TitleDetails, callback: () => void) => void)

  /** Fired when an action icon is clicked. This event will not fire if the action has a popup. */
  onClicked: BrowserClickedEvent
}
