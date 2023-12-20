import type * as chrome from './'
/// /////////////////
// Privacy
/// /////////////////
/**
* Use the chrome.privacy API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the ChromeSetting prototype of the type API for getting and setting Chrome's configuration.
* Permissions:  "privacy"
* The Chrome Privacy Whitepaper gives background detail regarding the features which this API can control.
* @since Chrome 18.
*/

export interface Services {
  /** since Chrome 20. */
  spellingServiceEnabled: chrome.types.ChromeSetting
  searchSuggestEnabled: chrome.types.ChromeSetting
  instantEnabled: chrome.types.ChromeSetting
  alternateErrorPagesEnabled: chrome.types.ChromeSetting
  safeBrowsingEnabled: chrome.types.ChromeSetting
  /** @deprecated since Chrome 70. Please use privacy.services.autofillAddressEnabled and privacy.services.autofillCreditCardEnabled. */
  autofillEnabled: chrome.types.ChromeSetting
  translationServiceEnabled: chrome.types.ChromeSetting
  /** @since Chrome 38. */
  passwordSavingEnabled: chrome.types.ChromeSetting
  /** @since Chrome 42. */
  hotwordSearchEnabled: chrome.types.ChromeSetting
  /** @since Chrome 42. */
  safeBrowsingExtendedReportingEnabled: chrome.types.ChromeSetting
  /** @since Chrome 70. */
  autofillAddressEnabled: chrome.types.ChromeSetting
  /** @since Chrome 70. */
  autofillCreditCardEnabled: chrome.types.ChromeSetting
}

export interface Network {
  networkPredictionEnabled: chrome.types.ChromeSetting
  /** @deprecated since Chrome 48. Please use privacy.network.webRTCIPHandlingPolicy. */
  webRTCMultipleRoutesEnabled: chrome.types.ChromeSetting
  /** @deprecated since Chrome 48. Please use privacy.network.webRTCIPHandlingPolicy. */
  webRTCNonProxiedUdpEnabled: chrome.types.ChromeSetting
  /** @since Chrome 48. */
  webRTCIPHandlingPolicy: chrome.types.ChromeSetting
}

export interface Websites {
  thirdPartyCookiesAllowed: chrome.types.ChromeSetting
  referrersEnabled: chrome.types.ChromeSetting
  hyperlinkAuditingEnabled: chrome.types.ChromeSetting
  /** @since Chrome 21. Available on Windows and ChromeOS only. */
  protectedContentEnabled: chrome.types.ChromeSetting
  /** @since Chrome 65. */
  doNotTrackEnabled: chrome.types.ChromeSetting
}
export default interface _ {

  /** Settings that enable or disable features that require third-party network services provided by Google and your default search provider. */
  services: Services

  /** Settings that influence Chrome's handling of network connections in general. */
  network: Network

  /** Settings that determine what information Chrome makes available to websites. */
  websites: Websites
}
