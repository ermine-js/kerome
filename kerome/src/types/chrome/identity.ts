import type * as chrome from './'
/// /////////////////
// Identity
/// /////////////////
/**
* Use the chrome.identity API to get OAuth2 access tokens.
* Permissions:  "identity"
* @since Chrome 29.
*/

/** @since Chrome 32. */
export interface AccountInfo {
  /** A unique identifier for the account. This ID will not change for the lifetime of the account. */
  id: string
}

/** @since Chrome 84. */
export enum AccountStatus {
  SYNC = 'SYNC',
  ANY = 'ANY',
}

export interface ProfileDetails {
  /**
       * Optional.
       * A status of the primary account signed into a profile whose ProfileUserInfo should be returned. Defaults to SYNC account status.
       */
  accountStatus?: AccountStatus | undefined
}

export interface TokenDetails {
  /**
       * Optional.
       * Fetching a token may require the user to sign-in to Chrome, or approve the application's requested scopes. If the interactive flag is true, getAuthToken will prompt the user as necessary. When the flag is false or omitted, getAuthToken will return failure any time a prompt would be required.
       */
  interactive?: boolean | undefined
  /**
       * Optional.
       * The account ID whose token should be returned. If not specified, the primary account for the profile will be used.
       * account is only supported when the "enable-new-profile-management" flag is set.
       * @since Chrome 37.
       */
  account?: AccountInfo | undefined
  /**
       * Optional.
       * A list of OAuth2 scopes to request.
       * When the scopes field is present, it overrides the list of scopes specified in manifest.json.
       * @since Chrome 37.
       */
  scopes?: string[] | undefined
}

export interface UserInfo {
  /** An email address for the user account signed into the current profile. Empty if the user is not signed in or the identity.email manifest permission is not specified. */
  email: string
  /** A unique identifier for the account. This ID will not change for the lifetime of the account. Empty if the user is not signed in or (in M41+) the identity.email manifest permission is not specified. */
  id: string
}

export interface TokenInformation {
  /** The specific token that should be removed from the cache. */
  token: string
}

export interface WebAuthFlowOptions {
  /** The URL that initiates the auth flow. */
  url: string
  /**
       * Optional.
       * Whether to launch auth flow in interactive mode.
       * Since some auth flows may immediately redirect to a result URL, launchWebAuthFlow hides its web view until the first navigation either redirects to the final URL, or finishes loading a page meant to be displayed.
       * If the interactive flag is true, the window will be displayed when a page load completes. If the flag is false or omitted, launchWebAuthFlow will return with an error if the initial navigation does not complete the flow.
       */
  interactive?: boolean | undefined
}

export interface SignInChangeEvent extends chrome.events.Event<(account: AccountInfo, signedIn: boolean) => void> {}

export interface GetAuthTokenResult {
  /**
       * Optional.
       * A list of OAuth2 scopes granted to the extension.
       */
  grantedScopes?: string[]
  /**
       * Optional.
       * The specific token associated with the request.
       */
  token?: string
}
export default interface _ {

  /**
   * Resets the state of the Identity API:
   *
   *  * Removes all OAuth2 access tokens from the token cache
   *  * Removes user's account preferences
   *  * De-authorizes the user from all auth flows
   * If `callback` is not provided, the function returns a Promise when the state has been cleared.
   * @since Chrome 87.
   * @param callback Called when the state has been cleared.
   */
  clearAllCachedAuthTokens: (() => Promise<void>) & ((callback: () => void) => void)

  /**
   * Retrieves a list of AccountInfo objects describing the accounts present on the profile.
   * getAccounts is only supported on dev channel.
   * Dev channel only.
   */
  getAccounts: (() => Promise<AccountInfo[]>) & ((callback: (accounts: AccountInfo[]) => void) => void)

  /**
   * Gets an OAuth2 access token using the client ID and scopes specified in the oauth2 section of manifest.json.
   * The Identity API caches access tokens in memory, so it's ok to call getAuthToken non-interactively any time a token is required. The token cache automatically handles expiration.
   * For a good user experience it is important interactive token requests are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests, or Chrome sign in screens if they are not signed in, with with no context. In particular, do not use getAuthToken interactively when your app is first launched.
   * If `callback` is not provided, the function returns a Promise that resolves with the token.
   * @param details Token options.
   * @param callback Called with an OAuth2 access token as specified by the manifest, or undefined if there was an error.
   */
  getAuthToken: ((details: TokenDetails) => Promise<GetAuthTokenResult>) & ((
    details: TokenDetails,
    callback: (token?: string, grantedScopes?: string[]) => void,
  ) => void)

  /**
   * Retrieves email address and obfuscated gaia id of the user signed into a profile.
   * This API is different from identity.getAccounts in two ways. The information returned is available offline, and it only applies to the primary account for the profile.
   * @since Chrome 37.
   */
  getProfileUserInfo: ((callback: (userInfo: UserInfo) => void) => void) & ((details: ProfileDetails, callback: (userInfo: UserInfo) => void) => void) & ((details: ProfileDetails) => Promise<UserInfo>)

  /**
   * Removes an OAuth2 access token from the Identity API's token cache.
   * If an access token is discovered to be invalid, it should be passed to removeCachedAuthToken to remove it from the cache. The app may then retrieve a fresh token with getAuthToken.
   * If `callback` is not provided, the function returns a Promise when the state has been removed from the cache.
   * @param details Token information.
   * @param callback Called when the token has been removed from the cache.
   */
  removeCachedAuthToken: ((details: TokenInformation) => Promise<void>) & ((details: TokenInformation, callback: () => void) => void)

  /**
   * Starts an auth flow at the specified URL.
   * This method enables auth flows with non-Google identity providers by launching a web view and navigating it to the first URL in the provider's auth flow. When the provider redirects to a URL matching the pattern https://<app-id>.chromiumapp.org/*, the window will close, and the final redirect URL will be passed to the callback function.
   * For a good user experience it is important interactive auth flows are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests with no context. In particular, do not launch an interactive auth flow when your app is first launched.
   * @param details WebAuth flow options.
   * @param callback Optional. Called with the URL redirected back to your application.
   */
  launchWebAuthFlow: ((details: WebAuthFlowOptions, callback: (responseUrl?: string) => void) => void) & ((details: WebAuthFlowOptions) => Promise<string | undefined>)

  /**
   * Generates a redirect URL to be used in launchWebAuthFlow.
   * The generated URLs match the pattern https://<app-id>.chromiumapp.org/*.
   * @since Chrome 33.
   * @param path Optional. The path appended to the end of the generated URL.
   */
  getRedirectURL: (path?: string) => string

  /**
   * Fired when signin state changes for an account on the user's profile.
   * @since Chrome 33.
   */
  onSignInChanged: SignInChangeEvent
}
