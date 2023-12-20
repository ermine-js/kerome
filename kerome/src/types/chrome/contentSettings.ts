/// /////////////////
// Content Settings
/// /////////////////
/**
* Use the chrome.contentSettings API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.
* Availability: Since Chrome 16.
* Permissions:  "contentSettings"
*/

  type ScopeEnum = 'regular' | 'incognito_session_only'

export interface ClearDetails {
  /**
       * Optional.
       * Where to clear the setting (default: regular).
       * The scope of the ContentSetting. One of
       * * regular: setting for regular profile (which is inherited by the incognito profile if not overridden elsewhere),
       * * incognito_session_only: setting for incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular settings).
       */
  scope?: ScopeEnum | undefined
}

  type DefaultContentSettingDetails = 'allow' | 'ask' | 'block' | 'detect_important_content' | 'session_only'

export interface SetDetails {
  /** Optional. The resource identifier for the content type.  */
  resourceIdentifier?: ResourceIdentifier | undefined
  /** The setting applied by this rule. See the description of the individual ContentSetting objects for the possible values. */
  setting: DefaultContentSettingDetails
  /** Optional. The pattern for the secondary URL. Defaults to matching all URLs. For details on the format of a pattern, see Content Setting Patterns.  */
  secondaryPattern?: string | undefined
  /** Optional. Where to set the setting (default: regular).  */
  scope?: ScopeEnum | undefined
  /** The pattern for the primary URL. For details on the format of a pattern, see Content Setting Patterns. */
  primaryPattern: string
}

export interface CookieSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'session_only'
}

export interface ImagesSetDetails extends SetDetails {
  setting: 'allow' | 'block'
}

export interface JavascriptSetDetails extends SetDetails {
  setting: 'allow' | 'block'
}

export interface LocationSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'ask'
}

export interface PluginsSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'detect_important_content'
}

export interface PopupsSetDetails extends SetDetails {
  setting: 'allow' | 'block'
}

export interface NotificationsSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'ask'
}

export interface FullscreenSetDetails extends SetDetails {
  setting: 'allow'
}

export interface MouselockSetDetails extends SetDetails {
  setting: 'allow'
}

export interface MicrophoneSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'ask'
}

export interface CameraSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'ask'
}

export interface PpapiBrokerSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'ask'
}

export interface MultipleAutomaticDownloadsSetDetails extends SetDetails {
  setting: 'allow' | 'block' | 'ask'
}

export interface GetDetails {
  /** Optional. The secondary URL for which the content setting should be retrieved. Defaults to the primary URL. Note that the meaning of a secondary URL depends on the content type, and not all content types use secondary URLs.  */
  secondaryUrl?: string | undefined
  /** Optional. A more specific identifier of the type of content for which the settings should be retrieved.  */
  resourceIdentifier?: ResourceIdentifier | undefined
  /** Optional. Whether to check the content settings for an incognito session. (default false)  */
  incognito?: boolean | undefined
  /** The primary URL for which the content setting should be retrieved. Note that the meaning of a primary URL depends on the content type. */
  primaryUrl: string
}

export interface ReturnedDetails {
  /** The content setting. See the description of the individual ContentSetting objects for the possible values. */
  setting: DefaultContentSettingDetails
}

export interface ContentSetting {
  /**
       * Clear all content setting rules set by this extension.
       */
  clear: (details: ClearDetails, callback?: () => void) => void
  /**
       * Applies a new content setting rule.
       */
  set: (details: SetDetails, callback?: () => void) => void
  getResourceIdentifiers: (
    callback: (
      /**
               * A list of resource identifiers for this content type, or undefined if this content type does not use resource identifiers.
               */
      resourceIdentifiers?: ResourceIdentifier[],
    ) => void,
  ) => void
  /**
       * Gets the current content setting for a given pair of URLs.
       */
  get: (details: GetDetails, callback: (details: ReturnedDetails) => void) => void
}

export interface CookieContentSetting extends ContentSetting {
  set: (details: CookieSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: CookieSetDetails) => void) => void
}

export interface PopupsContentSetting extends ContentSetting {
  set: (details: PopupsSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: PopupsSetDetails) => void) => void
}

export interface JavascriptContentSetting extends ContentSetting {
  set: (details: JavascriptSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: JavascriptSetDetails) => void) => void
}

export interface NotificationsContentSetting extends ContentSetting {
  set: (details: NotificationsSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: NotificationsSetDetails) => void) => void
}

export interface PluginsContentSetting extends ContentSetting {
  set: (details: PluginsSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: PluginsSetDetails) => void) => void
}

export interface ImagesContentSetting extends ContentSetting {
  set: (details: ImagesSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: ImagesSetDetails) => void) => void
}

export interface LocationContentSetting extends ContentSetting {
  set: (details: LocationSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: LocationSetDetails) => void) => void
}

export interface FullscreenContentSetting extends ContentSetting {
  set: (details: FullscreenSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: FullscreenSetDetails) => void) => void
}

export interface MouselockContentSetting extends ContentSetting {
  set: (details: MouselockSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: MouselockSetDetails) => void) => void
}

export interface MicrophoneContentSetting extends ContentSetting {
  set: (details: MicrophoneSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: MicrophoneSetDetails) => void) => void
}

export interface CameraContentSetting extends ContentSetting {
  set: (details: CameraSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: CameraSetDetails) => void) => void
}

export interface PpapiBrokerContentSetting extends ContentSetting {
  set: (details: PpapiBrokerSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: PpapiBrokerSetDetails) => void) => void
}

export interface MultipleAutomaticDownloadsContentSetting extends ContentSetting {
  set: (details: MultipleAutomaticDownloadsSetDetails, callback?: () => void) => void
  get: (details: GetDetails, callback: (details: MultipleAutomaticDownloadsSetDetails) => void) => void
}

/** The only content type using resource identifiers is contentSettings.plugins. For more information, see Resource Identifiers. */
export interface ResourceIdentifier {
  /** The resource identifier for the given content type. */
  id: string
  /** Optional. A human readable description of the resource.  */
  description?: string | undefined
}
export default interface _ {

  /**
   * Whether to allow cookies and other local data to be set by websites. One of
   * allow: Accept cookies,
   * block: Block cookies,
   * session_only: Accept cookies only for the current session.
   * Default is allow.
   * The primary URL is the URL representing the cookie origin. The secondary URL is the URL of the top-level frame.
   */
  cookies: CookieContentSetting

  /**
   * Whether to allow sites to show pop-ups. One of
   * allow: Allow sites to show pop-ups,
   * block: Don't allow sites to show pop-ups.
   * Default is block.
   * The primary URL is the URL of the top-level frame. The secondary URL is not used.
   */
  popups: PopupsContentSetting

  /**
   * Whether to run JavaScript. One of
   * allow: Run JavaScript,
   * block: Don't run JavaScript.
   * Default is allow.
   * The primary URL is the URL of the top-level frame. The secondary URL is not used.
   */
  javascript: JavascriptContentSetting

  /**
   * Whether to allow sites to show desktop notifications. One of
   * allow: Allow sites to show desktop notifications,
   * block: Don't allow sites to show desktop notifications,
   * ask: Ask when a site wants to show desktop notifications.
   * Default is ask.
   * The primary URL is the URL of the document which wants to show the notification. The secondary URL is not used.
   */
  notifications: NotificationsContentSetting

  /**
   * Whether to run plugins. One of
   * allow: Run plugins automatically,
   * block: Don't run plugins automatically,
   * detect_important_content: Only run automatically those plugins that are detected as the website's main content.
   * Default is allow.
   * The primary URL is the URL of the top-level frame. The secondary URL is not used.
   */
  plugins: PluginsContentSetting

  /**
   * Whether to show images. One of
   * allow: Show images,
   * block: Don't show images.
   * Default is allow.
   * The primary URL is the URL of the top-level frame. The secondary URL is the URL of the image.
   */
  images: ImagesContentSetting

  /**
   * Since Chrome 42.
   * Whether to allow Geolocation. One of
   * allow: Allow sites to track your physical location,
   * block: Don't allow sites to track your physical location,
   * ask: Ask before allowing sites to track your physical location.
   * Default is ask.
   * The primary URL is the URL of the document which requested location data. The secondary URL is the URL of the top-level frame (which may or may not differ from the requesting URL).
   */
  location: LocationContentSetting

  /**
   * Since Chrome 42.
   * Whether to allow sites to toggle the fullscreen mode. One of
   * allow: Allow sites to toggle the fullscreen mode,
   * ask: Ask when a site wants to toggle the fullscreen mode.
   * Default is ask.
   * The primary URL is the URL of the document which requested to toggle the fullscreen mode. The secondary URL is the URL of the top-level frame (which may or may not differ from the requesting URL).
   */
  fullscreen: FullscreenContentSetting

  /**
   * Since Chrome 42.
   * Whether to allow sites to disable the mouse cursor. One of
   * allow: Allow sites to disable the mouse cursor,
   * block: Don't allow sites to disable the mouse cursor,
   * ask: Ask when a site wants to disable the mouse cursor.
   * Default is ask.
   * The primary URL is the URL of the top-level frame. The secondary URL is not used.
   */
  mouselock: MouselockContentSetting

  /**
   * Since Chrome 46.
   * Whether to allow sites to access the microphone. One of
   * allow: Allow sites to access the microphone,
   * block: Don't allow sites to access the microphone,
   * ask: Ask when a site wants to access the microphone.
   * Default is ask.
   * The primary URL is the URL of the document which requested microphone access. The secondary URL is not used.
   * NOTE: The 'allow' setting is not valid if both patterns are ''.
   */
  microphone: MicrophoneContentSetting

  /**
   * Since Chrome 46.
   * Whether to allow sites to access the camera. One of
   * allow: Allow sites to access the camera,
   * block: Don't allow sites to access the camera,
   * ask: Ask when a site wants to access the camera.
   * Default is ask.
   * The primary URL is the URL of the document which requested camera access. The secondary URL is not used.
   * NOTE: The 'allow' setting is not valid if both patterns are ''.
   */
  camera: CameraContentSetting

  /**
   * Since Chrome 42.
   * Whether to allow sites to run plugins unsandboxed. One of
   * allow: Allow sites to run plugins unsandboxed,
   * block: Don't allow sites to run plugins unsandboxed,
   * ask: Ask when a site wants to run a plugin unsandboxed.
   * Default is ask.
   * The primary URL is the URL of the top-level frame. The secondary URL is not used.
   */
  unsandboxedPlugins: PpapiBrokerContentSetting

  /**
   * Since Chrome 42.
   * Whether to allow sites to download multiple files automatically. One of
   * allow: Allow sites to download multiple files automatically,
   * block: Don't allow sites to download multiple files automatically,
   * ask: Ask when a site wants to download files automatically after the first file.
   * Default is ask.
   * The primary URL is the URL of the top-level frame. The secondary URL is not used.
   */
  automaticDownloads: MultipleAutomaticDownloadsContentSetting
}
