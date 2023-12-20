import type * as chrome from './'
/// /////////////////
// Types
/// /////////////////
/**
* The chrome.types API contains type declarations for Chrome.
* @since Chrome 13.
*/

  type settingsScope = 'regular' | 'regular_only' | 'incognito_persistent' | 'incognito_session_only' | undefined

export interface ChromeSettingClearDetails {
  /**
       * Optional.
       * The scope of the ChromeSetting. One of
       * • regular: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),
       * • regular_only: setting for the regular profile only (not inherited by the incognito profile),
       * • incognito_persistent: setting for the incognito profile that survives browser restarts (overrides regular preferences),
       * • incognito_session_only: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).
       */
  scope?: settingsScope
}

export interface ChromeSettingSetDetails extends ChromeSettingClearDetails {
  /**
       * The value of the setting.
       * Note that every setting has a specific value type, which is described together with the setting. An extension should not set a value of a different type.
       */
  value: any
  /**
       * Optional.
       * The scope of the ChromeSetting. One of
       * • regular: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),
       * • regular_only: setting for the regular profile only (not inherited by the incognito profile),
       * • incognito_persistent: setting for the incognito profile that survives browser restarts (overrides regular preferences),
       * • incognito_session_only: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).
       */
  scope?: settingsScope
}

export interface ChromeSettingGetDetails {
  /** Optional. Whether to return the value that applies to the incognito session (default false). */
  incognito?: boolean | undefined
}

/**
   * @param details Details of the currently effective value.
   */
export type DetailsCallback = (details: ChromeSettingGetResultDetails) => void

export interface ChromeSettingGetResultDetails {
  /**
       * One of
       * • not_controllable: cannot be controlled by any extension
       * • controlled_by_other_extensions: controlled by extensions with higher precedence
       * • controllable_by_this_extension: can be controlled by this extension
       * • controlled_by_this_extension: controlled by this extension
       */
  levelOfControl:
  | 'not_controllable'
  | 'controlled_by_other_extensions'
  | 'controllable_by_this_extension'
  | 'controlled_by_this_extension'
  /** The value of the setting. */
  value: any
  /**
       * Optional.
       * Whether the effective value is specific to the incognito session.
       * This property will only be present if the incognito property in the details parameter of get() was true.
       */
  incognitoSpecific?: boolean | undefined
}

export interface ChromeSettingChangedEvent extends chrome.events.Event<DetailsCallback> {}

/** An interface that allows access to a Chrome browser setting. See accessibilityFeatures for an example. */
export interface ChromeSetting {
  /**
       * Sets the value of a setting.
       * @param details Which setting to change.
       * @param callback Optional. Called at the completion of the set operation.
       */
  set: (details: ChromeSettingSetDetails, callback?: Function) => void
  /**
       * Gets the value of a setting.
       * @param details Which setting to consider.
       */
  get: (details: ChromeSettingGetDetails, callback?: DetailsCallback) => void
  /**
       * Clears the setting, restoring any default value.
       * @param details Which setting to clear.
       * @param callback Optional. Called at the completion of the clear operation.
       */
  clear: (details: ChromeSettingClearDetails, callback?: Function) => void
  /** Fired after the setting changes. */
  onChange: ChromeSettingChangedEvent
}
