import type * as chrome from './'
/// /////////////////
// VPN Provider
/// /////////////////
/**
* Use the chrome.vpnProvider API to implement a VPN client.
* Permissions:  "vpnProvider"
* Important: This API works only on Chrome OS.
* @since Chrome 43.
*/

export interface VpnSessionParameters {
  /** IP address for the VPN interface in CIDR notation. IPv4 is currently the only supported mode. */
  address: string
  /** Optional. Broadcast address for the VPN interface. (default: deduced from IP address and mask) */
  broadcastAddress?: string | undefined
  /** Optional. MTU setting for the VPN interface. (default: 1500 bytes) */
  mtu?: string | undefined
  /**
       * Exclude network traffic to the list of IP blocks in CIDR notation from the tunnel. This can be used to bypass traffic to and from the VPN server. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
       */
  exclusionList: string[]
  /**
       * Include network traffic to the list of IP blocks in CIDR notation to the tunnel. This parameter can be used to set up a split tunnel. By default no traffic is directed to the tunnel. Adding the entry "0.0.0.0/0" to this list gets all the user traffic redirected to the tunnel. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
       */
  inclusionList: string[]
  /** Optional. A list of search domains. (default: no search domain) */
  domainSearch?: string[] | undefined
  /** A list of IPs for the DNS servers. */
  dnsServer: string[]
}

export interface VpnPlatformMessageEvent
  extends chrome.events.Event<(id: string, message: string, error: string) => void>
{}

export interface VpnPacketReceptionEvent extends chrome.events.Event<(data: ArrayBuffer) => void> {}

export interface VpnConfigRemovalEvent extends chrome.events.Event<(id: string) => void> {}

export interface VpnConfigCreationEvent
  extends chrome.events.Event<(id: string, name: string, data: Object) => void>
{}

export interface VpnUiEvent extends chrome.events.Event<(event: string, id?: string) => void> {}
export default interface _ {

  /**
   * Creates a new VPN configuration that persists across multiple login sessions of the user.
   * @param name The name of the VPN configuration.
   * @param callback Called when the configuration is created or if there is an error.
   * Parameter id: A unique ID for the created configuration, empty string on failure.
   */
  createConfig: (name: string, callback: (id: string) => void) => void

  /**
   * Destroys a VPN configuration created by the extension.
   * @param id ID of the VPN configuration to destroy.
   * @param callback Optional. Called when the configuration is destroyed or if there is an error.
   */
  destroyConfig: (id: string, callback?: Function) => void

  /**
   * Sets the parameters for the VPN session. This should be called immediately after "connected" is received from the platform. This will succeed only when the VPN session is owned by the extension.
   * @param parameters The parameters for the VPN session.
   * @param callback Called when the parameters are set or if there is an error.
   */
  setParameters: (parameters: VpnSessionParameters, callback: Function) => void

  /**
   * Sends an IP packet through the tunnel created for the VPN session. This will succeed only when the VPN session is owned by the extension.
   * @param data The IP packet to be sent to the platform.
   * @param callback Optional. Called when the packet is sent or if there is an error.
   */
  sendPacket: (data: ArrayBuffer, callback?: Function) => void

  /**
   * Notifies the VPN session state to the platform. This will succeed only when the VPN session is owned by the extension.
   * @param state The VPN session state of the VPN client.
   * connected: VPN connection was successful.
   * failure: VPN connection failed.
   * @param callback Optional. Called when the notification is complete or if there is an error.
   */
  notifyConnectionStateChanged: (state: string, callback?: Function) => void

  /** Triggered when a message is received from the platform for a VPN configuration owned by the extension. */
  onPlatformMessage: VpnPlatformMessageEvent

  /** Triggered when an IP packet is received via the tunnel for the VPN session owned by the extension. */
  onPacketReceived: VpnPacketReceptionEvent

  /** Triggered when a configuration created by the extension is removed by the platform. */
  onConfigRemoved: VpnConfigRemovalEvent

  /** Triggered when a configuration is created by the platform for the extension. */
  onConfigCreated: VpnConfigCreationEvent

  /** Triggered when there is a UI event for the extension. UI events are signals from the platform that indicate to the app that a UI dialog needs to be shown to the user. */
  onUIEvent: VpnUiEvent
}
