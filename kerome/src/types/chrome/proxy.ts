import type * as chrome from './'
/// /////////////////
// Proxy
/// /////////////////
/**
* Use the chrome.proxy API to manage Chrome's proxy settings. This API relies on the ChromeSetting prototype of the type API for getting and setting the proxy configuration.
* Permissions:  "proxy"
* @since Chrome 13.
*/

/** An object holding proxy auto-config information. Exactly one of the fields should be non-empty. */
export interface PacScript {
  /** Optional. URL of the PAC file to be used. */
  url?: string | undefined
  /** Optional. If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false. */
  mandatory?: boolean | undefined
  /** Optional. A PAC script. */
  data?: string | undefined
}

/** An object encapsulating a complete proxy configuration. */
export interface ProxyConfig {
  /** Optional. The proxy rules describing this configuration. Use this for 'fixed_servers' mode. */
  rules?: ProxyRules | undefined
  /** Optional. The proxy auto-config (PAC) script for this configuration. Use this for 'pac_script' mode. */
  pacScript?: PacScript | undefined
  /**
       * 'direct' = Never use a proxy
       * 'auto_detect' = Auto detect proxy settings
       * 'pac_script' = Use specified PAC script
       * 'fixed_servers' = Manually specify proxy servers
       * 'system' = Use system proxy settings
       */
  mode: string
}

/** An object encapsulating a single proxy server's specification. */
export interface ProxyServer {
  /** The URI of the proxy server. This must be an ASCII hostname (in Punycode format). IDNA is not supported, yet. */
  host: string
  /** Optional. The scheme (protocol) of the proxy server itself. Defaults to 'http'. */
  scheme?: string | undefined
  /** Optional. The port of the proxy server. Defaults to a port that depends on the scheme. */
  port?: number | undefined
}

/** An object encapsulating the set of proxy rules for all protocols. Use either 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp' and 'fallbackProxy'. */
export interface ProxyRules {
  /** Optional. The proxy server to be used for FTP requests. */
  proxyForFtp?: ProxyServer | undefined
  /** Optional. The proxy server to be used for HTTP requests. */
  proxyForHttp?: ProxyServer | undefined
  /** Optional. The proxy server to be used for everything else or if any of the specific proxyFor... is not specified. */
  fallbackProxy?: ProxyServer | undefined
  /** Optional. The proxy server to be used for all per-URL requests (that is http, https, and ftp). */
  singleProxy?: ProxyServer | undefined
  /** Optional. The proxy server to be used for HTTPS requests. */
  proxyForHttps?: ProxyServer | undefined
  /** Optional. List of servers to connect to without a proxy server. */
  bypassList?: string[] | undefined
}

export interface ErrorDetails {
  /** Additional details about the error such as a JavaScript runtime error. */
  details: string
  /** The error description. */
  error: string
  /** If true, the error was fatal and the network transaction was aborted. Otherwise, a direct connection is used instead. */
  fatal: boolean
}

export interface ProxyErrorEvent extends chrome.events.Event<(details: ErrorDetails) => void> {}
export default interface _ {

  settings: chrome.types.ChromeSetting

  /** Notifies about proxy errors. */
  onProxyError: ProxyErrorEvent
}
