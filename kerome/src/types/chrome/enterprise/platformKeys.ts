/// /////////////////
// Enterprise Platform Keys
/// /////////////////
/**
* Use the chrome.enterprise.platformKeys API to generate hardware-backed keys and to install certificates for these keys. The certificates will be managed by the platform and can be used for TLS authentication, network access or by other extension through chrome.platformKeys.
* Availability: Since Chrome 37.
* Permissions:  "enterprise.platformKeys"
* Important: This API works only on Chrome OS.
* Note:  This API is only for extensions pre-installed by policy.
*/

export interface Token {
  /**
       * Uniquely identifies this Token.
       * Static IDs are "user" and "system", referring to the platform's user-specific and the system-wide hardware token, respectively. Any other tokens (with other identifiers) might be returned by enterprise.platformKeys.getTokens.
       */
  id: string
  /**
       * Implements the WebCrypto's SubtleCrypto interface. The cryptographic operations, including key generation, are hardware-backed.
       * Only non-extractable RSASSA-PKCS1-V1_5 keys with modulusLength up to 2048 and ECDSA with namedCurve P-256 can be generated. Each key can be used for signing data at most once.
       * Keys generated on a specific Token cannot be used with any other Tokens, nor can they be used with window.crypto.subtle. Equally, Key objects created with window.crypto.subtle cannot be used with this interface.
       */
  subtleCrypto: SubtleCrypto
  /**
       * Implements the WebCrypto's SubtleCrypto interface. The cryptographic operations, including key generation, are software-backed.
       * Protection of the keys, and thus implementation of the non-extractable property, is done in software, so the keys are less protected than hardware-backed keys.
       * Only non-extractable RSASSA-PKCS1-V1_5 keys with modulusLength up to 2048 can be generated. Each key can be used for signing data at most once.
       * Keys generated on a specific Token cannot be used with any other Tokens, nor can they be used with window.crypto.subtle. Equally, Key objects created with window.crypto.subtle cannot be used with this interface.
       * @since Chrome 97.
       */
  softwareBackedSubtleCrypto: SubtleCrypto
}
export default interface _ {

  /**
   * Returns the available Tokens. In a regular user's session the list will always contain the user's token with id "user". If a system-wide TPM token is available, the returned list will also contain the system-wide token with id "system". The system-wide token will be the same for all sessions on this device (device in the sense of e.g. a Chromebook).
   * @param callback Invoked by getTokens with the list of available Tokens.
   * Parameter tokens: The list of available tokens.
   */
  getTokens: (callback: (tokens: Token[]) => void) => void

  /**
   * Returns the list of all client certificates available from the given token. Can be used to check for the existence and expiration of client certificates that are usable for a certain authentication.
   * @param tokenId The id of a Token returned by getTokens.
   * @param callback Called back with the list of the available certificates.
   * Parameter certificates: The list of certificates, each in DER encoding of a X.509 certificate.
   */
  getCertificates: (tokenId: string, callback: (certificates: ArrayBuffer[]) => void) => void

  /**
   * Imports certificate to the given token if the certified key is already stored in this token. After a successful certification request, this function should be used to store the obtained certificate and to make it available to the operating system and browser for authentication.
   * @param tokenId The id of a Token returned by getTokens.
   * @param certificate The DER encoding of a X.509 certificate.
   * @param callback Called back when this operation is finished.
   */
  importCertificate: (tokenId: string, certificate: ArrayBuffer, callback?: () => void) => void

  /**
   * Removes certificate from the given token if present. Should be used to remove obsolete certificates so that they are not considered during authentication and do not clutter the certificate choice. Should be used to free storage in the certificate store.
   * @param tokenId The id of a Token returned by getTokens.
   * @param certificate The DER encoding of a X.509 certificate.
   * @param callback Called back when this operation is finished.
   */
  removeCertificate: (tokenId: string, certificate: ArrayBuffer, callback?: () => void) => void

  /**
   * Challenges a hardware-backed Enterprise Machine Key and emits the response as part of a remote attestation protocol. Only useful on Chrome OS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses. A successful verification by the Verified Access Web API is a strong signal of all of the following:
   *
   * * The current device is a legitimate Chrome OS device.
   * * The current device is managed by the domain specified during verification.
   * * The current signed-in user is managed by the domain specified during verification.
   * * The current device state complies with enterprise device policy. For example, a policy may specify that the device must not be in developer mode.
   * * Any device identity emitted by the verification is tightly bound to the hardware of the current device.
   *
   * This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise device policy. The Enterprise Machine Key does not reside in the "system" token and is not accessible by any other API.
   * @param challenge A challenge as emitted by the Verified Access Web API.
   * @param registerKey If set, the current Enterprise Machine Key is registered with the "system" token and relinquishes the Enterprise Machine Key role. The key can then be associated with a certificate and used like any other signing key. This key is 2048-bit RSA. Subsequent calls to this function will then generate a new Enterprise Machine Key. Since Chrome 59.
   * @param callback Called back with the challenge response.
   * @since Chrome 50.
   */
  challengeMachineKey: ((
    challenge: ArrayBuffer,
    registerKey: boolean,
    callback: (response: ArrayBuffer) => void,
  ) => void) & ((challenge: ArrayBuffer, callback: (response: ArrayBuffer) => void) => void)

  /**
   * Challenges a hardware-backed Enterprise User Key and emits the response as part of a remote attestation protocol. Only useful on Chrome OS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses. A successful verification by the Verified Access Web API is a strong signal of all of the following:
   *
   * * The current device is a legitimate Chrome OS device.
   * * The current device is managed by the domain specified during verification.
   * * The current signed-in user is managed by the domain specified during verification.
   * * The current device state complies with enterprise user policy. For example, a policy may specify that the device must not be in developer mode.
   * * The public key emitted by the verification is tightly bound to the hardware of the current device and to the current signed-in user.
   *
   * This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise user policy. The Enterprise User Key does not reside in the "user" token and is not accessible by any other API.
   * @param challenge A challenge as emitted by the Verified Access Web API.
   * @param registerKey If set, the current Enterprise User Key is registered with the "user" token and relinquishes the Enterprise User Key role. The key can then be associated with a certificate and used like any other signing key. This key is 2048-bit RSA. Subsequent calls to this function will then generate a new Enterprise User Key.
   * @param callback Called back with the challenge response.
   * @since Chrome 50.
   */
  challengeUserKey: (
    challenge: ArrayBuffer,
    registerKey: boolean,
    callback: (response: ArrayBuffer) => void,
  ) => void
}
