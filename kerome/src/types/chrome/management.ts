import type * as chrome from './'
/// /////////////////
// Management
/// /////////////////
/**
* The chrome.management API provides ways to manage the list of extensions/apps that are installed and running. It is particularly useful for extensions that override the built-in New Tab page.
* Permissions:  "management"
* @since Chrome 8.
*/

/** Information about an installed extension, app, or theme. */
export interface ExtensionInfo {
  /**
       * Optional.
       * A reason the item is disabled.
       * @since Chrome 17.
       */
  disabledReason?: string | undefined
  /** Optional. The launch url (only present for apps). */
  appLaunchUrl?: string | undefined
  /**
       * The description of this extension, app, or theme.
       * @since Chrome 9.
       */
  description: string
  /**
       * Returns a list of API based permissions.
       * @since Chrome 9.
       */
  permissions: string[]
  /**
       * Optional.
       * A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the manifest documentation on icons for more details.
       */
  icons?: IconInfo[] | undefined
  /**
       * Returns a list of host based permissions.
       * @since Chrome 9.
       */
  hostPermissions: string[]
  /** Whether it is currently enabled or disabled. */
  enabled: boolean
  /**
       * Optional.
       * The URL of the homepage of this extension, app, or theme.
       * @since Chrome 11.
       */
  homepageUrl?: string | undefined
  /**
       * Whether this extension can be disabled or uninstalled by the user.
       * @since Chrome 12.
       */
  mayDisable: boolean
  /**
       * How the extension was installed.
       * @since Chrome 22.
       */
  installType: string
  /** The version of this extension, app, or theme. */
  version: string
  /** The extension's unique identifier. */
  id: string
  /**
       * Whether the extension, app, or theme declares that it supports offline.
       * @since Chrome 15.
       */
  offlineEnabled: boolean
  /**
       * Optional.
       * The update URL of this extension, app, or theme.
       * @since Chrome 16.
       */
  updateUrl?: string | undefined
  /**
       * The type of this extension, app, or theme.
       * @since Chrome 23.
       */
  type: string
  /** The url for the item's options page, if it has one. */
  optionsUrl: string
  /** The name of this extension, app, or theme. */
  name: string
  /**
       * A short version of the name of this extension, app, or theme.
       * @since Chrome 31.
       */
  shortName: string
  /**
       * True if this is an app.
       * @deprecated since Chrome 33. Please use management.ExtensionInfo.type.
       */
  isApp: boolean
  /**
       * Optional.
       * The app launch type (only present for apps).
       * @since Chrome 37.
       */
  launchType?: string | undefined
  /**
       * Optional.
       * The currently available launch types (only present for apps).
       * @since Chrome 37.
       */
  availableLaunchTypes?: string[] | undefined
}

/** Information about an icon belonging to an extension, app, or theme. */
export interface IconInfo {
  /** The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append ?grayscale=true to the URL. */
  url: string
  /** A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16. */
  size: number
}

export interface UninstallOptions {
  /**
       * Optional.
       * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown.
       */
  showConfirmDialog?: boolean | undefined
}

export interface ManagementDisabledEvent extends chrome.events.Event<(info: ExtensionInfo) => void> {}

export interface ManagementUninstalledEvent extends chrome.events.Event<(id: string) => void> {}

export interface ManagementInstalledEvent extends chrome.events.Event<(info: ExtensionInfo) => void> {}

export interface ManagementEnabledEvent extends chrome.events.Event<(info: ExtensionInfo) => void> {}
export default interface _ {

  /**
   * Enables or disables an app or extension.
   * @param id This should be the id from an item of management.ExtensionInfo.
   * @param enabled Whether this item should be enabled or disabled.
   * @return The `setEnabled` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setEnabled: ((id: string, enabled: boolean) => Promise<void>) & ((id: string, enabled: boolean, callback: () => void) => void)

  /**
   * Returns a list of permission warnings for the given extension id.
   * @since Chrome 15.
   * @param id The ID of an already installed extension.
   * @return The `getPermissionWarningsById` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getPermissionWarningsById: ((id: string) => Promise<string[]>) & ((id: string, callback: (permissionWarnings: string[]) => void) => void)

  /**
   * Returns information about the installed extension, app, or theme that has the given ID.
   * @since Chrome 9.
   * @param id The ID from an item of management.ExtensionInfo.
   * @return The `get` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  get: ((id: string) => Promise<ExtensionInfo>) & ((id: string, callback: (result: ExtensionInfo) => void) => void)

  /**
   * Returns a list of information about installed extensions and apps.
   * @return The `getAll` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getAll: (() => Promise<ExtensionInfo[]>) & ((callback: (result: ExtensionInfo[]) => void) => void)

  /**
   * Returns a list of permission warnings for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
   * @since Chrome 15.
   * @param manifestStr Extension manifest JSON string.
   * @return The `getPermissionWarningsByManifest` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getPermissionWarningsByManifest: ((
    manifestStr: string,
  ) => Promise<string[]>) & ((
    manifestStr: string,
    callback: (permissionwarnings: string[]) => void,
  ) => void)

  /**
   * Launches an application.
   * @param id The extension id of the application.
   * @return The `launchApp` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  launchApp: ((id: string) => Promise<void>) & ((id: string, callback: () => void) => void)

  /**
   * Uninstalls a currently installed app or extension.
   * @since Chrome 21.
   * @param id This should be the id from an item of management.ExtensionInfo.
   * @return The `uninstall` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  uninstall: ((id: string, options?: UninstallOptions) => Promise<void>) & ((id: string, callback: () => void) => void) & ((id: string, options: UninstallOptions, callback: () => void) => void) & ((id: string) => Promise<void>) & ((id: string, callback: () => void) => void)

  /**
   * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
   * @since Chrome 39.
   * @return The `getSelf` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getSelf: (() => Promise<ExtensionInfo>) & ((callback: (result: ExtensionInfo) => void) => void)

  /**
   * Uninstalls the calling extension.
   * Note: This function can be used without requesting the 'management' permission in the manifest.
   * @since Chrome 26.
   * @return The `uninstallSelf` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  uninstallSelf: ((options?: UninstallOptions) => Promise<void>) & ((callback: () => void) => void) & ((options: UninstallOptions, callback: () => void) => void) & (() => Promise<void>) & ((callback: () => void) => void)

  /**
   * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
   * @since Chrome 37.
   * @return The `createAppShortcut` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  createAppShortcut: ((id: string) => Promise<void>) & ((id: string, callback: () => void) => void)

  /**
   * Set the launch type of an app.
   * @since Chrome 37.
   * @param id This should be the id from an app item of management.ExtensionInfo.
   * @param launchType The target launch type. Always check and make sure this launch type is in ExtensionInfo.availableLaunchTypes, because the available launch types vary on different platforms and configurations.
   * @return The `setLaunchType` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  setLaunchType: ((id: string, launchType: string) => Promise<void>) & ((id: string, launchType: string, callback: () => void) => void)

  /**
   * Generate an app for a URL. Returns the generated bookmark app.
   * @since Chrome 37.
   * @param url The URL of a web page. The scheme of the URL can only be "http" or "https".
   * @param title The title of the generated app.
   * @return The `generateAppForLink` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  generateAppForLink: ((url: string, title: string) => Promise<ExtensionInfo>) & ((url: string, title: string, callback: (result: ExtensionInfo) => void) => void)

  /** Fired when an app or extension has been disabled. */
  onDisabled: ManagementDisabledEvent

  /** Fired when an app or extension has been uninstalled. */
  onUninstalled: ManagementUninstalledEvent

  /** Fired when an app or extension has been installed. */
  onInstalled: ManagementInstalledEvent

  /** Fired when an app or extension has been enabled. */
  onEnabled: ManagementEnabledEvent
}
