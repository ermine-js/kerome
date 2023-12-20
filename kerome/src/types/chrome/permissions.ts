/// /////////////////
// Permissions
/// /////////////////
/**
* Use the chrome.permissions API to request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.
* @since Chrome 16.
*/

export interface Permissions {
  /**
       * Optional.
       * List of named permissions (does not include hosts or origins). Anything listed here must appear in the optional_permissions list in the manifest.
       */
  permissions?: string[] | undefined
  /**
       * Optional.
       * List of origin permissions. Anything listed here must be a subset of a host that appears in the optional_permissions list in the manifest. For example, if http://*.example.com/ or http://* appears in optional_permissions, you can request an origin of http://help.example.com/. Any path is ignored.
       */
  origins?: string[] | undefined
}

export interface PermissionsRemovedEvent {
  addListener: (callback: (/** The permissions that have been removed */ permissions: Permissions) => void) => void
}

export interface PermissionsAddedEvent {
  addListener: (callback: (/** The newly-acquired permissions */ permissions: Permissions) => void) => void
}
export default interface _ {

  /**
   * Checks if the extension has the specified permissions.
   * @return A Promise that resolves with boolean: True if the extension has the specified permissions.
   */
  contains: ((permissions: Permissions) => Promise<boolean>) & ((permissions: Permissions, callback: (result: boolean) => void) => void)

  /**
   * Gets the extension's current set of permissions.
   * @return A Promise that resolves with Permissions object describing the extension's active permissions.
   */
  getAll: (() => Promise<Permissions>) & ((callback: (permissions: Permissions) => void) => void)

  /**
   * Requests access to the specified permissions. These permissions must be defined in the optional_permissions field of the manifest. If there are any problems requesting the permissions, runtime.lastError will be set.
   * @return A Promise that resolves with boolean: True if the user granted the specified permissions.
   */
  request: ((permissions: Permissions) => Promise<boolean>) & ((permissions: Permissions, callback?: (granted: boolean) => void) => void)

  /**
   * Removes access to the specified permissions. If there are any problems removing the permissions, runtime.lastError will be set.
   * @return A Promise that resolves with boolean: True if the permissions were removed.
   */
  remove: ((permissions: Permissions) => Promise<boolean>) & ((permissions: Permissions, callback?: (removed: boolean) => void) => void)

  /** Fired when access to permissions has been removed from the extension. */
  onRemoved: PermissionsRemovedEvent

  /** Fired when the extension acquires new permissions. */
  onAdded: PermissionsAddedEvent
}
