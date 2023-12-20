/// /////////////////
// Platform Keys
/// /////////////////
/**
* Use the chrome.platformKeys API to access client certificates managed by the platform. If the user or policy grants the permission, an extension can use such a certficate in its custom authentication protocol. E.g. this allows usage of platform managed certificates in third party VPNs (see chrome.vpnProvider).
* Permissions:  "platformKeys"
* Important: This API works only on Chrome OS.
* @since Chrome 45.
*/

export interface Match {
  /** The DER encoding of a X.509 certificate. */
  certificate: ArrayBuffer
  /** The  KeyAlgorithm of the certified key. This contains algorithm parameters that are inherent to the key of the certificate (e.g. the key length). Other parameters like the hash function used by the sign function are not included. */
  keyAlgorithm: KeyAlgorithm
}

export interface ClientCertificateSelectRequestDetails {
  /** This field is a list of the types of certificates requested, sorted in order of the server's preference. Only certificates of a type contained in this list will be retrieved. If certificateTypes is the empty list, however, certificates of any type will be returned. */
  certificateTypes: string[]
  /** List of distinguished names of certificate authorities allowed by the server. Each entry must be a DER-encoded X.509 DistinguishedName. */
  certificateAuthorities: ArrayBuffer[]
}

export interface ClientCertificateSelectDetails {
  /** Only certificates that match this request will be returned. */
  request: ClientCertificateSelectRequestDetails
  /**
       * Optional.
       * If given, the selectClientCertificates operates on this list. Otherwise, obtains the list of all certificates from the platform's certificate stores that are available to this extensions. Entries that the extension doesn't have permission for or which doesn't match the request, are removed.
       */
  clientCerts?: ArrayBuffer[] | undefined
  /** If true, the filtered list is presented to the user to manually select a certificate and thereby granting the extension access to the certificate(s) and key(s). Only the selected certificate(s) will be returned. If is false, the list is reduced to all certificates that the extension has been granted access to (automatically or manually). */
  interactive: boolean
}

export interface ServerCertificateVerificationDetails {
  /** Each chain entry must be the DER encoding of a X.509 certificate, the first entry must be the server certificate and each entry must certify the entry preceding it. */
  serverCertificateChain: ArrayBuffer[]
  /** The hostname of the server to verify the certificate for, e.g. the server that presented the serverCertificateChain. */
  hostname: string
}

export interface ServerCertificateVerificationResult {
  /** The result of the trust verification: true if trust for the given verification details could be established and false if trust is rejected for any reason. */
  trusted: boolean
  /**
       * If the trust verification failed, this array contains the errors reported by the underlying network layer. Otherwise, this array is empty.
       * Note: This list is meant for debugging only and may not contain all relevant errors. The errors returned may change in future revisions of this API, and are not guaranteed to be forwards or backwards compatible.
       */
  debug_errors: string[]
}
export default interface _ {

  /**
   * This function filters from a list of client certificates the ones that are known to the platform, match request and for which the extension has permission to access the certificate and its private key. If interactive is true, the user is presented a dialog where they can select from matching certificates and grant the extension access to the certificate. The selected/filtered client certificates will be passed to callback.
   * Parameter matches: The list of certificates that match the request, that the extension has permission for and, if interactive is true, that were selected by the user.
   */
  selectClientCertificates: (
    details: ClientCertificateSelectDetails,
    callback: (matches: Match[]) => void,
  ) => void

  /**
   * Passes the key pair of certificate for usage with platformKeys.subtleCrypto to callback.
   * @param certificate The certificate of a Match returned by selectClientCertificates.
   * @param parameters Determines signature/hash algorithm parameters additionally to the parameters fixed by the key itself. The same parameters are   accepted as by WebCrypto's importKey function, e.g. RsaHashedImportParams for a RSASSA-PKCS1-v1_5 key. For RSASSA-PKCS1-v1_5 keys, additionally the parameters { 'hash': { 'name': 'none' } } are supported. The sign function will then apply PKCS#1 v1.5 padding and but not hash the given data.
   * @param callback The public and private CryptoKey of a certificate which can only be used with platformKeys.subtleCrypto.
   * Optional parameter privateKey: Might be null if this extension does not have access to it.
   */
  getKeyPair: (
    certificate: ArrayBuffer,
    parameters: Object,
    callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void,
  ) => void

  /**
   * Passes the key pair of publicKeySpkiDer for usage with platformKeys.subtleCrypto to callback.
   * @param publicKeySpkiDer A DER-encoded X.509 SubjectPublicKeyInfo, obtained e.g. by calling WebCrypto's exportKey function with format="spki".
   * @param parameters Provides signature and hash algorithm parameters, in addition to those fixed by the key itself. The same parameters are accepted as by WebCrypto's importKey function, e.g. RsaHashedImportParams for a RSASSA-PKCS1-v1_5 key. For RSASSA-PKCS1-v1_5 keys, we need to also pass a "hash" parameter { "hash": { "name": string } }. The "hash" parameter represents the name of the hashing algorithm to be used in the digest operation before a sign. It is possible to pass "none" as the hash name, in which case the sign function will apply PKCS#1 v1.5 padding and but not hash the given data.
   * Currently, this function only supports the "RSASSA-PKCS1-v1_5" algorithm with one of the hashing algorithms "none", "SHA-1", "SHA-256", "SHA-384", and "SHA-512".
   * @param callback The public and private CryptoKey of a certificate which can only be used with platformKeys.subtleCrypto.
   * Optional parameter privateKey: Might be null if this extension does not have access to it.
   * @since Chrome 85.
   */
  getKeyPairBySpki: (
    publicKeySpkiDer: ArrayBuffer,
    parameters: Object,
    callback: (publicKey: CryptoKey, privateKey: CryptoKey | null) => void,
  ) => void

  /** An implementation of WebCrypto's  SubtleCrypto that allows crypto operations on keys of client certificates that are available to this extension. */
  subtleCrypto: () => SubtleCrypto

  /**
   * Checks whether details.serverCertificateChain can be trusted for details.hostname according to the trust settings of the platform. Note: The actual behavior of the trust verification is not fully specified and might change in the future. The API implementation verifies certificate expiration, validates the certification path and checks trust by a known CA. The implementation is supposed to respect the EKU serverAuth and to support subject alternative names.
   */
  verifyTLSServerCertificate: (
    details: ServerCertificateVerificationDetails,
    callback: (result: ServerCertificateVerificationResult) => void,
  ) => void
}
