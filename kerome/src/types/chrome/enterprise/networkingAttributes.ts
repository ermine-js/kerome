/// /////////////////
// Enterprise Networking Attributes
/// /////////////////
/**
* Use the <code>chrome.enterprise.networkingAttributes</code> API to read information about your current network. Note: This API is only available to extensions force-installed by enterprise policy.
* Important: This API works only on Chrome OS.
* @since Chrome 85.
*/

export interface NetworkDetails {
  /** The device's MAC address. */
  macAddress: string
  /** Optional. The device's local IPv4 address (undefined if not configured). */
  ipv4?: string | undefined
  /** Optional. The device's local IPv6 address (undefined if not configured). */
  ipv6?: string | undefined
}
export default interface _ {

  /**
   * Retrieves the network details of the device's default network. If the user is not affiliated or the device is not connected to a network, runtime.lastError will be set with a failure reason.
   * @param callback Called with the device's default network's NetworkDetails.
   */
  getNetworkDetails: (callback: (networkDetails: NetworkDetails) => void) => void
}
