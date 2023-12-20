import type * as chrome from '../'
/// /////////////////
// Notifications
/// /////////////////
/**
* Use the networking.config API to authenticate to captive portals.
* Permissions:  "networking.config"
* Important: This API works only on Chrome OS.
* @since Chrome 43.
*/

export interface NetworkInfo {
  /** Currently only WiFi supported. */
  Type: string
  /** Optional. A unique identifier of the network. */
  GUID?: string | undefined
  /** Optional. A hex-encoded byte sequence. */
  HexSSID?: string | undefined
  /** Optional. The decoded SSID of the network (default encoding is UTF-8). To filter for non-UTF-8 SSIDs, use HexSSID instead. */
  SSID?: string | undefined
  /** Optional. The basic service set identification (BSSID) uniquely identifying the basic service set. BSSID is represented as a human readable, hex-encoded string with bytes separated by colons, e.g. 45:67:89:ab:cd:ef. */
  BSSID?: string | undefined
  /** Optional. Identifier indicating the security type of the network. Valid values are None, WEP-PSK, WPA-PSK and WPA-EAP. */
  Security?: string | undefined
}

export interface CaptivePorttalDetectedEvent extends chrome.events.Event<(networkInfo: NetworkInfo) => void> {}
export default interface _ {

  /**
   * Allows an extension to define network filters for the networks it can handle. A call to this function will remove all filters previously installed by the extension before setting the new list.
   * @param networks Network filters to set. Every NetworkInfo must either have the SSID or HexSSID set. Other fields will be ignored.
   * @param callback Called back when this operation is finished.
   */
  setNetworkFilter: (networks: NetworkInfo[], callback: () => void) => void

  /**
   * Called by the extension to notify the network config API that it finished a captive portal authentication attempt and hand over the result of the attempt. This function must only be called with the GUID of the latest onCaptivePortalDetected event.
   * @param GUID Unique network identifier obtained from onCaptivePortalDetected.
   * @param result The result of the authentication attempt.
   * unhandled: The extension does not handle this network or captive portal (e.g. server end-point not found or not compatible).
   * succeeded: The extension handled this network and authenticated successfully.
   * rejected: The extension handled this network, tried to authenticate, however was rejected by the server.
   * failed: The extension handled this network, tried to authenticate, however failed due to an unspecified error.
   * @param callback Called back when this operation is finished.
   */
  finishAuthentication: (GUID: string, result: string, callback?: () => void) => void

  /** This event fires everytime a captive portal is detected on a network matching any of the currently registered network filters and the user consents to use the extension for authentication. Network filters may be set using the setNetworkFilter. Upon receiving this event the extension should start its authentication attempt with the captive portal. When the extension finishes its attempt, it must call finishAuthentication with the GUID received with this event and the appropriate authentication result. */
  onCaptivePortalDetected: CaptivePorttalDetectedEvent
}
