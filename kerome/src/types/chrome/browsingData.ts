/// /////////////////
// Browsing Data
/// /////////////////
/**
* Use the chrome.browsingData API to remove browsing data from a user's local profile.
* Availability: Since Chrome 19.
* Permissions:  "browsingData"
*/

export interface OriginTypes {
  /** Optional. Extensions and packaged applications a user has installed (be _really_ careful!).  */
  extension?: boolean | undefined
  /** Optional. Websites that have been installed as hosted applications (be careful!).  */
  protectedWeb?: boolean | undefined
  /** Optional. Normal websites.  */
  unprotectedWeb?: boolean | undefined
}

/** Options that determine exactly what data will be removed. */
export interface RemovalOptions {
  /**
       * Optional.
       * Since Chrome 74.
       * When present, data for origins in this list is excluded from deletion. Can't be used together with origins. Only supported for cookies, storage and cache. Cookies are excluded for the whole registrable domain.
       */
  excludeOrigins?: string[] | undefined
  /**
       * Optional.
       * An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you _really_ want to remove application data before adding 'protectedWeb' or 'extensions'.
       */
  originTypes?: OriginTypes | undefined
  /**
       * Optional.
       * Since Chrome 74.
       * When present, only data for origins in this list is deleted. Only supported for cookies, storage and cache. Cookies are cleared for the whole registrable domain.
       */
  origins?: string[] | undefined
  /**
       * Optional.
       * Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the {@link Date.getTime} method). If absent, defaults to 0 (which would remove all browsing data).
       */
  since?: number | undefined
}

/**
   * Since Chrome 27.
   * A set of data types. Missing data types are interpreted as false.
   */
export interface DataTypeSet {
  /** Optional. Websites' WebSQL data.  */
  webSQL?: boolean | undefined
  /** Optional. Websites' IndexedDB data.  */
  indexedDB?: boolean | undefined
  /** Optional. The browser's cookies.  */
  cookies?: boolean | undefined
  /** Optional. Stored passwords.  */
  passwords?: boolean | undefined
  /**
       * @deprecated Deprecated since Chrome 76.
       * Support for server-bound certificates has been removed. This data type will be ignored.
       *
       * Optional. Server-bound certificates.
       */
  serverBoundCertificates?: boolean | undefined
  /** Optional. The browser's download list.  */
  downloads?: boolean | undefined
  /** Optional. The browser's cache. Note: when removing data, this clears the entire cache: it is not limited to the range you specify.  */
  cache?: boolean | undefined
  /** Optional. The browser's cacheStorage.  */
  cacheStorage?: boolean | undefined
  /** Optional. Websites' appcaches.  */
  appcache?: boolean | undefined
  /** Optional. Websites' file systems.  */
  fileSystems?: boolean | undefined
  /**
       * @deprecated Deprecated since Chrome 88.
       * Support for Flash has been removed. This data type will be ignored.
       *
       * Optional. Plugins' data.
       */
  pluginData?: boolean | undefined
  /** Optional. Websites' local storage data.  */
  localStorage?: boolean | undefined
  /** Optional. The browser's stored form data.  */
  formData?: boolean | undefined
  /** Optional. The browser's history.  */
  history?: boolean | undefined
  /**
       * Optional.
       * Since Chrome 39.
       * Service Workers.
       */
  serviceWorkers?: boolean | undefined
}

export interface SettingsResult {
  options: RemovalOptions
  /** All of the types will be present in the result, with values of true if they are both selected to be removed and permitted to be removed, otherwise false. */
  dataToRemove: DataTypeSet
  /** All of the types will be present in the result, with values of true if they are permitted to be removed (e.g., by enterprise policy) and false if not. */
  dataRemovalPermitted: DataTypeSet
}
export default interface _ {

  /**
   * Since Chrome 26.
   * Reports which types of data are currently selected in the 'Clear browsing data' settings UI. Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
   * @return The `settings` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  settings: (() => Promise<SettingsResult>) & ((callback: (result: SettingsResult) => void) => void)

  /**
   * @deprecated Deprecated since Chrome 88.
   * Support for Flash has been removed. This function has no effect.
   *
   * Clears plugins' data.
   * @return The `removePluginData` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removePluginData: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Since Chrome 72.
   * Clears websites' service workers.
   * @return The `removeServiceWorkers` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeServiceWorkers: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears the browser's stored form data (autofill).
   * @return The `removeFormData` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeFormData: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears websites' file system data.
   * @return The `removeFileSystems` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeFileSystems: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears various types of browsing data stored in a user's profile.
   * @param dataToRemove The set of data types to remove.
   * @return The `remove` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  remove: ((options: RemovalOptions, dataToRemove: DataTypeSet) => Promise<void>) & ((options: RemovalOptions, dataToRemove: DataTypeSet, callback: () => void) => void)

  /**
   * Clears the browser's stored passwords.
   * @return The `removePasswords` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removePasswords: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
   * @return The `removeCookies` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeCookies: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears websites' WebSQL data.
   * @return The `removeWebSQL` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeWebSQL: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears websites' appcache data.
   * @return The `removeAppcache` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeAppcache: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /** Clears websites' cache storage data.
   * @return The `removeCacheStorage` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeCacheStorage: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears the browser's list of downloaded files (not the downloaded files themselves).
   * @return The `removeDownloads` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeDownloads: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears websites' local storage data.
   * @return The `removeLocalStorage` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeLocalStorage: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears the browser's cache.
   * @return The `removeCache` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeCache: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears the browser's history.
   * @return The `removeHistory` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeHistory: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)

  /**
   * Clears websites' IndexedDB data.
   * @return The `removeIndexedDB` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeIndexedDB: ((options: RemovalOptions) => Promise<void>) & ((options: RemovalOptions, callback: () => void) => void)
}
