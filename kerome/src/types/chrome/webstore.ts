import type * as chrome from './'
/// /////////////////
// Web Store
/// /////////////////
/**
* Use the chrome.webstore API to initiate app and extension installations "inline" from your site.
* @since Chrome 15.
*/

export interface InstallationStageEvent extends chrome.events.Event<(stage: string) => void> {}

export interface DownloadProgressEvent extends chrome.events.Event<(percentDownloaded: number) => void> {}
export default interface _ {

  /**
   * @param url Optional. If you have more than one <link> tag on your page with the chrome-webstore-item relation, you can choose which item you'd like to install by passing in its URL here. If it is omitted, then the first (or only) link will be used. An exception will be thrown if the passed in URL does not exist on the page.
   * @param successCallback Optional. This function is invoked when inline installation successfully completes (after the dialog is shown and the user agrees to add the item to Chrome). You may wish to use this to hide the user interface element that prompted the user to install the app or extension.
   * @param failureCallback Optional. This function is invoked when inline installation does not successfully complete. Possible reasons for this include the user canceling the dialog, the linked item not being found in the store, or the install being initiated from a non-verified site.
   * Parameter error: The failure detail. You may wish to inspect or log this for debugging purposes, but you should not rely on specific strings being passed back.
   * Optional parameter errorCode: The error code from the stable set of possible errors.
   * * Enum of the possible install results, including error codes sent back in the event that an inline installation has failed.
   * * * "otherError": An uncommon, unrecognized, or unexpected error. In some cases, the readable error string can provide more information.
   * * * "aborted": The operation was aborted as the requestor is no longer alive.
   * * * "installInProgress": An installation of the same extension is in progress.
   * * * "notPermitted": The installation is not permitted.
   * * * "invalidId": Invalid Chrome Web Store item ID.
   * * * "webstoreRequestError": Failed to retrieve extension metadata from the Web Store.
   * * * "invalidWebstoreResponse": The extension metadata retrieved from the Web Store was invalid.
   * * * "invalidManifest": An error occurred while parsing the extension manifest retrieved from the Web Store.
   * * * "iconError": Failed to retrieve the extension's icon from the Web Store, or the icon was invalid.
   * * * "userCanceled": The user canceled the operation.
   * * * "blacklisted": The extension is blacklisted.
   * * * "missingDependencies": Unsatisfied dependencies, such as shared modules.
   * * * "requirementViolations": Unsatisfied requirements, such as webgl.
   * * * "blockedByPolicy": The extension is blocked by management policies.
   * * * "launchFeatureDisabled": The launch feature is not available.
   * * * "launchUnsupportedExtensionType": The launch feature is not supported for the extension type.
   * * * "launchInProgress": A launch of the same extension is in progress.
   */
  install: ((
    url: string,
    successCallback?: Function,
    failureCallback?: (error: string, errorCode?: string) => void,
  ) => void) & ((
    successCallback: Function,
    failureCallback?: (error: string, errorCode?: string) => void,
  ) => void) & ((failureCallback?: (error: string, errorCode?: string) => void) => void)

  /**
   * Fired when an inline installation enters a new InstallStage. In order to receive notifications about this event, listeners must be registered before the inline installation begins.
   * @since Chrome 35.
   */
  onInstallStageChanged: InstallationStageEvent

  /**
   * Fired periodically with the download progress of an inline install. In order to receive notifications about this event, listeners must be registered before the inline installation begins.
   * @since Chrome 35.
   */
  onDownloadProgress: DownloadProgressEvent
}
