import type * as chrome from './'
/// /////////////////
// Runtime
/// /////////////////
/**
* Use the chrome.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
* @since Chrome 22
*/

/** https://developer.chrome.com/docs/extensions/reference/runtime/#type-PlatformOs */
export type PlatformOs = 'mac' | 'win' | 'android' | 'cros' | 'linux' | 'openbsd'

/** https://developer.chrome.com/docs/extensions/reference/runtime/#type-PlatformArch */
export type PlatformArch = 'arm' | 'arm64' | 'x86-32' | 'x86-64' | 'mips' | 'mips64'

/** https://developer.chrome.com/docs/extensions/reference/runtime/#type-PlatformNaclArch */
export type PlatformNaclArch = 'arm' | 'x86-32' | 'x86-64' | 'mips' | 'mips64'

/** https://developer.chrome.com/docs/extensions/reference/runtime/#type-OnInstalledReason */
export enum OnInstalledReason {
  INSTALL = 'install',
  UPDATE = 'update',
  CHROME_UPDATE = 'chrome_update',
  SHARED_MODULE_UPDATE = 'shared_module_update',
}

export interface LastError {
  /** Optional. Details about the error which occurred.  */
  message?: string | undefined
}

export interface ConnectInfo {
  name?: string | undefined
  includeTlsChannelId?: boolean | undefined
}

export interface InstalledDetails {
  /**
       * The reason that this event is being dispatched.
       */
  reason: OnInstalledReason
  /**
       * Optional.
       * Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'.
       */
  previousVersion?: string | undefined
  /**
       * Optional.
       * Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared_module_update'.
       * @since Chrome 29.
       */
  id?: string | undefined
}

export interface MessageOptions {
  /** Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event. */
  includeTlsChannelId?: boolean | undefined
}

/**
   * An object containing information about the script context that sent a message or request.
   * @since Chrome 26.
   */
export interface MessageSender {
  /** The ID of the extension or app that opened the connection, if any. */
  id?: string | undefined
  /** The tabs.Tab which opened the connection, if any. This property will only be present when the connection was opened from a tab (including content scripts), and only if the receiver is an extension, not an app. */
  tab?: chrome.tabs.Tab | undefined
  /** The name of the native application that opened the connection, if any.
       * @since Chrome 74
       */
  nativeApplication?: string | undefined
  /**
       * The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set.
       * @since Chrome 41.
       */
  frameId?: number | undefined
  /**
       * The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it.
       * @since Chrome 28.
       */
  url?: string | undefined
  /**
       * The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available.
       * @since Chrome 32.
       */
  tlsChannelId?: string | undefined
  /**
       * The origin of the page or frame that opened the connection. It can vary from the url property (e.g., about:blank) or can be opaque (e.g., sandboxed iframes). This is useful for identifying if the origin can be trusted if we can't immediately tell from the URL.
       * @since Chrome 80.
       */
  origin?: string | undefined
  /**
       * The lifecycle the document that opened the connection is in at the time the port was created. Note that the lifecycle state of the document may have changed since port creation.
       * @since Chrome 106.
       */
  documentLifecycle?: DocumentLifecycle | undefined
  /**
       * A UUID of the document that opened the connection.
       * @since Chrome 106.
       */
  documentId?: string | undefined
}

/**
   * An object containing information about the current platform.
   * @since Chrome 36.
   */
export interface PlatformInfo {
  /**
       * The operating system chrome is running on.
       */
  os: PlatformOs
  /**
       * The machine's processor architecture.
       */
  arch: PlatformArch
  /**
       * The native client architecture. This may be different from arch on some platforms.
       */
  nacl_arch: PlatformNaclArch
}

/**
   * An object which allows two way communication with other pages.
   * @since Chrome 26.
   */
export interface Port {
  postMessage: (message: any) => void
  disconnect: () => void
  /**
       * Optional.
       * This property will only be present on ports passed to onConnect/onConnectExternal listeners.
       */
  sender?: MessageSender | undefined
  /** An object which allows the addition and removal of listeners for a Chrome event. */
  onDisconnect: PortDisconnectEvent
  /** An object which allows the addition and removal of listeners for a Chrome event. */
  onMessage: PortMessageEvent
  name: string
}

export interface UpdateAvailableDetails {
  /** The version number of the available update. */
  version: string
}

export interface UpdateCheckDetails {
  /** The version of the available update. */
  version: string
}

/** Result of the update check. */
export type RequestUpdateCheckStatus = 'throttled' | 'no_update' | 'update_available'

/** Result of the update check. */
export interface RequestUpdateCheckResult {
  /** The status of the update check. */
  status: RequestUpdateCheckStatus
  /** The version of the available update. */
  version: string
}

export interface PortDisconnectEvent extends chrome.events.Event<(port: Port) => void> {}

export interface PortMessageEvent extends chrome.events.Event<(message: any, port: Port) => void> {}

export interface ExtensionMessageEvent extends
  chrome.events.Event<
  (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void
  >
{}

export interface ExtensionConnectEvent extends chrome.events.Event<(port: Port) => void> {}

export interface RuntimeInstalledEvent extends chrome.events.Event<(details: InstalledDetails) => void> {}

export interface RuntimeEvent extends chrome.events.Event<() => void> {}

export interface RuntimeRestartRequiredEvent extends chrome.events.Event<(reason: string) => void> {}

export interface RuntimeUpdateAvailableEvent
  extends chrome.events.Event<(details: UpdateAvailableDetails) => void>
{}

export type ManifestIcons = Record<number, string>

export interface ManifestAction {
  default_icon?: ManifestIcons | undefined
  default_title?: string | undefined
  default_popup?: string | undefined
}

// Source: https://developer.chrome.com/docs/extensions/mv3/declare_permissions/
export type ManifestPermissions =
      | 'activeTab'
      | 'alarms'
      | 'background'
      | 'bookmarks'
      | 'browsingData'
      | 'certificateProvider'
      | 'clipboardRead'
      | 'clipboardWrite'
      | 'contentSettings'
      | 'contextMenus'
      | 'cookies'
      | 'debugger'
      | 'declarativeContent'
      | 'declarativeNetRequest'
      | 'declarativeNetRequestFeedback'
      | 'declarativeNetRequestWithHostAccess'
      | 'declarativeWebRequest'
      | 'desktopCapture'
      | 'documentScan'
      | 'downloads'
      | 'downloads.shelf'
      | 'downloads.ui'
      | 'enterprise.deviceAttributes'
      | 'enterprise.hardwarePlatform'
      | 'enterprise.networkingAttributes'
      | 'enterprise.platformKeys'
      | 'experimental'
      | 'favicon'
      | 'fileBrowserHandler'
      | 'fileSystemProvider'
      | 'fontSettings'
      | 'gcm'
      | 'geolocation'
      | 'history'
      | 'identity'
      | 'identity.email'
      | 'idle'
      | 'loginState'
      | 'management'
      | 'nativeMessaging'
      | 'notifications'
      | 'offscreen'
      | 'pageCapture'
      | 'platformKeys'
      | 'power'
      | 'printerProvider'
      | 'printing'
      | 'printingMetrics'
      | 'privacy'
      | 'processes'
      | 'proxy'
      | 'scripting'
      | 'search'
      | 'sessions'
      | 'sidePanel'
      | 'signedInDevices'
      | 'storage'
      | 'system.cpu'
      | 'system.display'
      | 'system.memory'
      | 'system.storage'
      | 'tabCapture'
      | 'tabGroups'
      | 'tabs'
      | 'topSites'
      | 'tts'
      | 'ttsEngine'
      | 'unlimitedStorage'
      | 'vpnProvider'
      | 'wallpaper'
      | 'webNavigation'
      | 'webRequest'
      | 'webRequestBlocking'

export interface SearchProvider {
  name?: string | undefined
  keyword?: string | undefined
  favicon_url?: string | undefined
  search_url: string
  encoding?: string | undefined
  suggest_url?: string | undefined
  instant_url?: string | undefined
  image_url?: string | undefined
  search_url_post_params?: string | undefined
  suggest_url_post_params?: string | undefined
  instant_url_post_params?: string | undefined
  image_url_post_params?: string | undefined
  alternate_urls?: string[] | undefined
  prepopulated_id?: number | undefined
  is_default?: boolean | undefined
}

export interface ManifestBase {
  // Required
  manifest_version: number
  name: string
  version: string

  // Recommended
  default_locale?: string | undefined
  description?: string | undefined
  icons?: ManifestIcons | undefined

  // Optional
  author?: string | undefined
  background_page?: string | undefined
  chrome_settings_overrides?: {
    homepage?: string | undefined
    search_provider?: SearchProvider | undefined
    startup_pages?: string[] | undefined
  } | undefined
  chrome_ui_overrides?: {
    bookmarks_ui?: {
      remove_bookmark_shortcut?: boolean | undefined
      remove_button?: boolean | undefined
    } | undefined
  } | undefined
  chrome_url_overrides?: {
    bookmarks?: string | undefined
    history?: string | undefined
    newtab?: string | undefined
  } | undefined
  commands?: Record<string, {
    suggested_key?: {
      default?: string | undefined
      windows?: string | undefined
      mac?: string | undefined
      chromeos?: string | undefined
      linux?: string | undefined
    } | undefined
    description?: string | undefined
    global?: boolean | undefined
  }> | undefined
  content_capabilities?: {
    matches?: string[] | undefined
    permissions?: string[] | undefined
  } | undefined
  content_scripts?: Array<{
    matches?: string[] | undefined
    exclude_matches?: string[] | undefined
    css?: string[] | undefined
    js?: string[] | undefined
    run_at?: string | undefined
    all_frames?: boolean | undefined
    match_about_blank?: boolean | undefined
    include_globs?: string[] | undefined
    exclude_globs?: string[] | undefined
  }> | undefined
  converted_from_user_script?: boolean | undefined
  current_locale?: string | undefined
  devtools_page?: string | undefined
  event_rules?: Array<{
    event?: string | undefined
    actions?: Array<{
      type: string
    }> | undefined
    conditions?: chrome.declarativeContent.PageStateMatcherProperties[] | undefined
  }> | undefined
  externally_connectable?: {
    ids?: string[] | undefined
    matches?: string[] | undefined
    accepts_tls_channel_id?: boolean | undefined
  } | undefined
  file_browser_handlers?: Array<{
    id?: string | undefined
    default_title?: string | undefined
    file_filters?: string[] | undefined
  }> | undefined
  file_system_provider_capabilities?: {
    configurable?: boolean | undefined
    watchable?: boolean | undefined
    multiple_mounts?: boolean | undefined
    source?: string | undefined
  } | undefined
  homepage_url?: string | undefined
  import?: Array<{
    id: string
    minimum_version?: string | undefined
  }> | undefined
  export?: {
    whitelist?: string[] | undefined
  } | undefined
  incognito?: string | undefined
  input_components?: Array<{
    name?: string | undefined
    type?: string | undefined
    id?: string | undefined
    description?: string | undefined
    language?: string[] | string | undefined
    layouts?: string[] | undefined
    indicator?: string | undefined
  }> | undefined
  key?: string | undefined
  minimum_chrome_version?: string | undefined
  nacl_modules?: Array<{
    path: string
    mime_type: string
  }> | undefined
  oauth2?: {
    client_id: string
    scopes?: string[] | undefined
  } | undefined
  offline_enabled?: boolean | undefined
  omnibox?: {
    keyword: string
  } | undefined
  options_page?: string | undefined
  options_ui?: {
    page?: string | undefined
    chrome_style?: boolean | undefined
    open_in_tab?: boolean | undefined
  } | undefined
  platforms?: Array<{
    nacl_arch?: string | undefined
    sub_package_path: string
  }> | undefined
  plugins?: Array<{
    path: string
  }> | undefined
  requirements?: {
    '3D'?: {
      features?: string[] | undefined
    } | undefined
    plugins?: {
      npapi?: boolean | undefined
    } | undefined
  } | undefined
  sandbox?: {
    pages: string[]
    content_security_policy?: string | undefined
  } | undefined
  short_name?: string | undefined
  spellcheck?: {
    dictionary_language?: string | undefined
    dictionary_locale?: string | undefined
    dictionary_format?: string | undefined
    dictionary_path?: string | undefined
  } | undefined
  storage?: {
    managed_schema: string
  } | undefined
  tts_engine?: {
    voices: Array<{
      voice_name: string
      lang?: string | undefined
      gender?: string | undefined
      event_types?: string[] | undefined
    }>
  } | undefined
  update_url?: string | undefined
  version_name?: string | undefined
  [key: string]: any
}

export interface ManifestV2 extends ManifestBase {
  // Required
  manifest_version: 2

  // Pick one (or none)
  browser_action?: ManifestAction | undefined
  page_action?: ManifestAction | undefined

  // Optional
  background?:
  | {
    scripts?: string[] | undefined
    page?: string | undefined
    persistent?: boolean | undefined
  }
  | undefined
  content_security_policy?: string | undefined
  optional_permissions?: string[] | undefined
  permissions?: string[] | undefined
  web_accessible_resources?: string[] | undefined
}

export interface ManifestV3 extends ManifestBase {
  // Required
  manifest_version: 3

  // Optional
  action?: ManifestAction | undefined
  background?:
  | {
    service_worker: string
    type?: 'module' // If the service worker uses ES modules
  }
  | undefined
  content_scripts?: Array<{
    matches?: string[] | undefined
    exclude_matches?: string[] | undefined
    css?: string[] | undefined
    js?: string[] | undefined
    run_at?: string | undefined
    all_frames?: boolean | undefined
    match_about_blank?: boolean | undefined
    include_globs?: string[] | undefined
    exclude_globs?: string[] | undefined
    world?: 'ISOLATED' | 'MAIN' | undefined
  }> | undefined
  content_security_policy?: {
    extension_pages?: string
    sandbox?: string
  }
  host_permissions?: string[] | undefined
  optional_permissions?: ManifestPermissions[] | undefined
  permissions?: ManifestPermissions[] | undefined
  web_accessible_resources?: Array<{ resources: string[], matches: string[] }> | undefined
}

export type Manifest = ManifestV2 | ManifestV3
export default interface _ {

  /** This will be defined during an API method callback if there was an error */
  lastError: LastError | undefined

  /** The ID of the extension/app. */
  id: string

  // Source: https://developer.chrome.com/docs/extensions/mv3/declare_permissions/

  /**
   * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect.
   * @since Chrome 26.
   */
  connect: ((connectInfo?: ConnectInfo) => Port) & ((extensionId: string, connectInfo?: ConnectInfo) => Port)

  /**
   * Connects to a native application in the host machine.
   * @since Chrome 28.
   * @param application The name of the registered application to connect to.
   */
  connectNative: (application: string) => Port

  /** Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set. */
  getBackgroundPage: (callback: (backgroundPage?: Window) => void) => void

  /**
   * Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file.
   * @return The manifest details.
   */
  getManifest: () => Manifest

  /**
   * Returns a DirectoryEntry for the package directory.
   * @since Chrome 29.
   */
  getPackageDirectoryEntry: (callback: (directoryEntry: DirectoryEntry) => void) => void

  /**
   * Returns information about the current platform.
   * @since Chrome 29.
   * @param callback Called with results
   */
  getPlatformInfo: ((callback: (platformInfo: PlatformInfo) => void) => void) & (() => Promise<PlatformInfo>)

  /**
   * Converts a relative path within an app/extension install directory to a fully-qualified URL.
   * @param path A path to a resource within an app/extension expressed relative to its install directory.
   */
  getURL: (path: string) => string

  /**
   * Reloads the app or extension.
   * @since Chrome 25.
   */
  reload: () => void

  /**
   * Requests an update check for this app/extension.
   * @since Chrome 109
   * @return This only returns a Promise when the callback parameter is not specified, and with MV3+.
   */
  requestUpdateCheck: (() => Promise<RequestUpdateCheckResult>) & ((
    callback: (status: RequestUpdateCheckStatus, details?: UpdateCheckDetails) => void,
  ) => void)

  /**
   * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.
   * @since Chrome 32.
   */
  restart: () => void

  /**
   * Restart the ChromeOS device when the app runs in kiosk mode after the
   * given seconds. If called again before the time ends, the reboot will
   * be delayed. If called with a value of -1, the reboot will be
   * cancelled. It's a no-op in non-kiosk mode. It's only allowed to be
   * called repeatedly by the first extension to invoke this API.
   * @since Chrome 53.
   * @param seconds
   * @param callback
   */
  restartAfterDelay: (seconds: number, callback?: () => void) => void

  /**
   * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
   * @since Chrome 26.
   * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendMessage: (<M = any, R = any>(message: M, responseCallback: (response: R) => void) => void) & (<M = any, R = any>(
    message: M,
    options: MessageOptions,
    responseCallback: (response: R) => void,
  ) => void) & (<M = any, R = any>(
    extensionId: string | undefined | null,
    message: M,
    responseCallback: (response: R) => void,
  ) => void) & (<Message = any, Response = any>(
    extensionId: string | undefined | null,
    message: Message,
    options: MessageOptions,
    responseCallback: (response: Response) => void,
  ) => void) & (<M = any, R = any>(message: M) => Promise<R>) & (<M = any, R = any>(
    message: M,
    options: MessageOptions,
  ) => Promise<R>) & (<M = any, R = any>(extensionId: string | undefined | null, message: M) => Promise<R>) & (<Message = any, Response = any>(
    extensionId: string | undefined | null,
    message: Message,
    options: MessageOptions,
  ) => Promise<Response>)

  /**
   * Send a single message to a native application.
   * @since Chrome 28.
   * @param application The of the native messaging host.
   * @param message The message that will be passed to the native messaging host.
   * Parameter response: The response message sent by the native messaging host. If an error occurs while connecting to the native messaging host, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendNativeMessage: ((
    application: string,
    message: Object,
    responseCallback: (response: any) => void,
  ) => void) & ((
    application: string,
    message: Object,
  ) => Promise<any>)

  /**
   * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
   * @since Chrome 41.
   * @param url Since Chrome 34.
   * URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
   * @param callback Called when the uninstall URL is set. If the given URL is invalid, runtime.lastError will be set.
   */
  setUninstallURL: (url: string, callback?: () => void) => void

  /**
   * Open your Extension's options page, if possible.
   * The precise behavior may depend on your manifest's options_ui or options_page key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.
   * If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set lastError.
   * @since Chrome 42.
   */
  openOptionsPage: (callback?: () => void) => void

  /**
   * Fired when a connection is made from either an extension process or a content script.
   * @since Chrome 26.
   */
  onConnect: ExtensionConnectEvent

  /**
   * Fired when a connection is made from another extension.
   * @since Chrome 26.
   */
  onConnectExternal: ExtensionConnectEvent

  /** Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. */
  onSuspend: RuntimeEvent

  /**
   * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
   * @since Chrome 23.
   */
  onStartup: RuntimeEvent

  /** Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. */
  onInstalled: RuntimeInstalledEvent

  /** Sent after onSuspend to indicate that the app won't be unloaded after all. */
  onSuspendCanceled: RuntimeEvent

  /**
   * Fired when a message is sent from either an extension process or a content script.
   * @since Chrome 26.
   */
  onMessage: ExtensionMessageEvent

  /**
   * Fired when a message is sent from another extension/app. Cannot be used in a content script.
   * @since Chrome 26.
   */
  onMessageExternal: ExtensionMessageEvent

  /**
   * Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps.
   * @since Chrome 29.
   */
  onRestartRequired: RuntimeRestartRequiredEvent

  /**
   * Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event.
   * @since Chrome 25.
   */
  onUpdateAvailable: RuntimeUpdateAvailableEvent

  /**
   * @deprecated since Chrome 33. Please use chrome.runtime.onRestartRequired.
   * Fired when a Chrome update is available, but isn't installed immediately because a browser restart is required.
   */
  onBrowserUpdateAvailable: RuntimeEvent
}
