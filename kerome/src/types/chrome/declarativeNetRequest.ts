import type * as chrome from './'

/** This describes the HTTP request method of a network request.  */
export enum RequestMethod {
  CONNECT = 'connect',
  DELETE = 'delete',
  GET = 'get',
  HEAD = 'head',
  OPTIONS = 'options',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
}

/** This describes the resource type of the network request. */
export enum ResourceType {
  MAIN_FRAME = 'main_frame',
  SUB_FRAME = 'sub_frame',
  STYLESHEET = 'stylesheet',
  SCRIPT = 'script',
  IMAGE = 'image',
  FONT = 'font',
  OBJECT = 'object',
  XMLHTTPREQUEST = 'xmlhttprequest',
  PING = 'ping',
  CSP_REPORT = 'csp_report',
  MEDIA = 'media',
  WEBSOCKET = 'websocket',
  OTHER = 'other',
}

/** Describes the kind of action to take if a given RuleCondition matches. */
export enum RuleActionType {
  BLOCK = 'block',
  REDIRECT = 'redirect',
  ALLOW = 'allow',
  UPGRADE_SCHEME = 'upgradeScheme',
  MODIFY_HEADERS = 'modifyHeaders',
  ALLOW_ALL_REQUESTS = 'allowAllRequests',
}

/** Describes the reason why a given regular expression isn't supported. */
export enum UnsupportedRegexReason {
  SYNTAX_ERROR = 'syntaxError',
  MEMORY_LIMIT_EXCEEDED = 'memoryLimitExceeded',
}

/** TThis describes whether the request is first or third party to the frame in which it originated.
   * A request is said to be first party if it has the same domain (eTLD+1) as the frame in which the request originated.
   */
export enum DomainType {
  FIRST_PARTY = 'firstParty',
  THIRD_PARTY = 'thirdParty',
}

/** This describes the possible operations for a "modifyHeaders" rule. */
export enum HeaderOperation {
  APPEND = 'append',
  SET = 'set',
  REMOVE = 'remove',
}

export interface RequestDetails {
  /** The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens.
       * If the document of a (sub-)frame is loaded (type is main_frame or sub_frame), frameId indicates the ID of this frame, not the ID of the outer frame.
       * Frame IDs are unique within a tab.
       */
  frameId: number

  /** The origin where the request was initiated.
       * This does not change through redirects.
       * If this is an opaque origin, the string 'null' will be used.
       */
  initiator?: string | undefined

  /** Standard HTTP method. */
  method: string

  /** ID of frame that wraps the frame which sent the request.
       * Set to -1 if no parent frame exists.
       */
  partentFrameId: number

  /** The ID of the request.
       * Request IDs are unique within a browser session.
       */
  requestId: string

  /** The ID of the tab in which the request takes place.
       * Set to -1 if the request isn't related to a tab.
       */
  tabId: number

  /** The resource type of the request. */
  type: ResourceType

  /** The URL of the request. */
  url: string
}

export interface Rule {
  /** The action to take if this rule is matched. */
  action: RuleAction

  /** The condition under which this rule is triggered. */
  condition: RuleCondition

  /** An id which uniquely identifies a rule.
       * Mandatory and should be >= 1.
       */
  id: number

  /** Rule priority.
       * Defaults to 1.
       * When specified, should be >= 1.
       */
  priority?: number | undefined
}

export interface RuleAction {
  /** Describes how the redirect should be performed.
       * Only valid for redirect rules.
       */
  redirect?: Redirect | undefined

  /** The request headers to modify for the request.
       * Only valid if RuleActionType is "modifyHeaders".
       */
  requestHeaders?: ModifyHeaderInfo[] | undefined

  /** The response headers to modify for the request.
       * Only valid if RuleActionType is "modifyHeaders".
       */
  responseHeaders?: ModifyHeaderInfo[] | undefined

  /** The type of action to perform. */
  type: RuleActionType
}

export interface RuleCondition {
  /**
       * Specifies whether the network request is first-party or third-party to the domain from which it originated.
       * If omitted, all requests are accepted.
       */
  domainType?: DomainType | undefined

  /**
       * @deprecated since Chrome 101. Use initiatorDomains instead.

       * The rule will only match network requests originating from the list of domains.
       * If the list is omitted, the rule is applied to requests from all domains.
       * An empty list is not allowed.
       *
       * Notes:
       * Sub-domains like "a.example.com" are also allowed.
       * The entries must consist of only ascii characters.
       * Use punycode encoding for internationalized domains.
       * This matches against the request initiator and not the request url.
       */
  domains?: string[] | undefined

  /**
       * @deprecated since Chrome 101. Use excludedInitiatorDomains instead
       *
       * The rule will not match network requests originating from the list of excludedDomains.
       * If the list is empty or omitted, no domains are excluded.
       * This takes precedence over domains.
       *
       * Notes:
       * Sub-domains like "a.example.com" are also allowed.
       * The entries must consist of only ascii characters.
       * Use punycode encoding for internationalized domains.
       * This matches against the request initiator and not the request url.
       */
  excludedDomains?: string[] | undefined

  /**
       * The rule will only match network requests originating from the list of initiatorDomains.
       * If the list is omitted, the rule is applied to requests from all domains.
       * An empty list is not allowed.
       *
       * Notes:
       * Sub-domains like "a.example.com" are also allowed.
       * The entries must consist of only ascii characters.
       * Use punycode encoding for internationalized domains.
       * This matches against the request initiator and not the request url.
       */
  initiatorDomains?: string[] | undefined

  /**
       * The rule will not match network requests originating from the list of excludedInitiatorDomains.
       * If the list is empty or omitted, no domains are excluded.
       * This takes precedence over initiatorDomains.
       *
       * Notes:
       * Sub-domains like "a.example.com" are also allowed.
       * The entries must consist of only ascii characters.
       * Use punycode encoding for internationalized domains.
       * This matches against the request initiator and not the request url.
       */
  excludedInitiatorDomains?: string[] | undefined

  /**
       * The rule will only match network requests when the domain matches one from the list of requestDomains.
       * If the list is omitted, the rule is applied to requests from all domains.
       * An empty list is not allowed.
       *
       * Notes:
       * Sub-domains like "a.example.com" are also allowed.
       * The entries must consist of only ascii characters.
       * Use punycode encoding for internationalized domains.
       */
  requestDomains?: string[] | undefined

  /**
       * The rule will not match network requests when the domains matches one from the list of excludedRequestDomains.
       * If the list is empty or omitted, no domains are excluded.
       * This takes precedence over requestDomains.
       *
       * Notes:
       * Sub-domains like "a.example.com" are also allowed.
       * The entries must consist of only ascii characters.
       * Use punycode encoding for internationalized domains.
       */
  excludedRequestDomains?: string[] | undefined

  /**
       * List of request methods which the rule won't match.
       * Only one of requestMethods and excludedRequestMethods should be specified.
       * If neither of them is specified, all request methods are matched.
       */
  excludedRequestMethods?: RequestMethod[] | undefined

  /**
       * List of resource types which the rule won't match.
       * Only one of {@link chrome.declarativeNetRequest.RuleCondition.resourceTypes}
       * and {@link chrome.declarativeNetRequest.RuleCondition.excludedResourceTypes} should be specified.
       * If neither of them is specified, all resource types except "main_frame" are blocked.
       */
  excludedResourceTypes?: ResourceType[] | undefined

  /**
       * List of {@link chrome.tabs.Tab.id} which the rule should not match.
       * An ID of {@link chrome.tabs.TAB_ID_NONE} excludes requests which don't originate from a tab.
       * Only supported for session-scoped rules.
       */
  excludedTabIds?: number[] | undefined

  /**
       * Whether the urlFilter or regexFilter (whichever is specified) is case sensitive.
       * Default is true.
       */
  isUrlFilterCaseSensitive?: boolean | undefined

  /**
       * Regular expression to match against the network request url.
       * This follows the RE2 syntax.
       *
       * Note: Only one of urlFilter or regexFilter can be specified.
       *
       * Note: The regexFilter must be composed of only ASCII characters.
       * This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.
       */
  regexFilter?: string | undefined

  /**
       * List of HTTP request methods which the rule can match. An empty list is not allowed.
       * Note: Specifying a {@link chrome.declarativeNetRequest.RuleCondition.requestMethods} rule condition will also exclude non-HTTP(s) requests,
       * whereas specifying {@link chrome.declarativeNetRequest.RuleCondition.excludedRequestMethods} will not.
       */
  requestMethods?: RequestMethod[]

  /**
       * List of {@link chrome.tabs.Tab.id} which the rule should not match.
       * An ID of {@link chrome.tabs.TAB_ID_NONE} excludes requests which don't originate from a tab.
       * An empty list is not allowed. Only supported for session-scoped rules.
       */
  tabIds?: number[] | undefined

  /**
       * The pattern which is matched against the network request url.
       * Supported constructs:
       *
       * '*' : Wildcard: Matches any number of characters.
       *
       * '|' : Left/right anchor: If used at either end of the pattern, specifies the beginning/end of the url respectively.
       *
       * '||' : Domain name anchor: If used at the beginning of the pattern, specifies the start of a (sub-)domain of the URL.
       *
       * '^' : Separator character: This matches anything except a letter, a digit or one of the following: _ - . %.
       * This can also match the end of the URL.
       *
       * Therefore urlFilter is composed of the following parts: (optional Left/Domain name anchor) + pattern + (optional Right anchor).
       *
       * If omitted, all urls are matched. An empty string is not allowed.
       *
       * A pattern beginning with || is not allowed. Use instead.
       *
       * Note: Only one of urlFilter or regexFilter can be specified.
       *
       * Note: The urlFilter must be composed of only ASCII characters.
       * This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.
       * For example, when the request url is http://abc.рф?q=ф, the urlFilter will be matched against the url http://abc.xn--p1ai/?q=%D1%84.
       */
  urlFilter?: string | undefined

  /**
       * List of resource types which the rule can match.
       * An empty list is not allowed.
       *
       * Note: this must be specified for allowAllRequests rules and may only include the sub_frame and main_frame resource types.
       */
  resourceTypes?: ResourceType[] | undefined
}

export interface MatchedRule {
  /** A matching rule's ID. */
  ruleId: number

  /** ID of the Ruleset this rule belongs to.
       * For a rule originating from the set of dynamic rules, this will be equal to DYNAMIC_RULESET_ID.
       */
  rulesetId: string
}

export interface MatchedRuleInfo {
  rule: MatchedRule

  /** The tabId of the tab from which the request originated if the tab is still active. Else -1. */
  tabId: number

  /** The time the rule was matched.
       * Timestamps will correspond to the Javascript convention for times, i.e. number of milliseconds since the epoch.
       */
  timeStamp: number
}

export interface MatchedRulesFilter {
  /** If specified, only matches rules after the given timestamp. */
  minTimeStamp?: number | undefined

  /** If specified, only matches rules for the given tab.
       * Matches rules not associated with any active tab if set to -1.
       */
  tabId?: number | undefined
}

export interface ModifyHeaderInfo {
  /** The name of the header to be modified. */
  header: string

  /** The operation to be performed on a header. */
  operation: HeaderOperation

  /** The new value for the header.
       * Must be specified for append and set operations.
       */
  value?: string | undefined
}

export interface QueryKeyValue {
  key: string
  value: string
}

export interface QueryTransform {
  /** The list of query key-value pairs to be added or replaced. */
  addOrReplaceParams?: QueryKeyValue[] | undefined

  /** The list of query keys to be removed. */
  removeParams?: string[] | undefined
}

export interface URLTransform {
  /** The new fragment for the request.
       * Should be either empty, in which case the existing fragment is cleared; or should begin with '#'.
       */
  fragment?: string | undefined

  /** The new host for the request. */
  host?: string | undefined

  /** The new password for the request. */
  password?: string | undefined

  /** The new path for the request.
       * If empty, the existing path is cleared.
       */
  path?: string | undefined

  /** The new port for the request.
       * If empty, the existing port is cleared.
       */
  port?: string | undefined

  /** The new query for the request.
       * Should be either empty, in which case the existing query is cleared; or should begin with '?'.
       */
  query?: string | undefined

  /** Add, remove or replace query key-value pairs. */
  queryTransform?: QueryTransform | undefined

  /** The new scheme for the request.
       * Allowed values are "http", "https", "ftp" and "chrome-extension".
       */
  scheme?: string | undefined

  /** The new username for the request. */
  username?: string | undefined
}

export interface RegexOptions {
  /** Whether the regex specified is case sensitive.
       * Default is true.
       */
  isCaseSensitive?: boolean | undefined

  /** The regular expression to check. */
  regex: string

  /** Whether the regex specified requires capturing.
       * Capturing is only required for redirect rules which specify a regexSubstitution action.
       * The default is false.
       */
  requireCapturing?: boolean | undefined
}

export interface IsRegexSupportedResult {
  isSupported: boolean

  /** Specifies the reason why the regular expression is not supported.
       * Only provided if isSupported is false.
       */
  reason?: UnsupportedRegexReason | undefined
}

export interface TabActionCountUpdate {
  /** The amount to increment the tab's action count by.
       * Negative values will decrement the count
       */
  increment: number

  /** The tab for which to update the action count. */
  tabId: number
}

export interface ExtensionActionOptions {
  /** Whether to automatically display the action count for a page as the extension's badge text.
       * This preference is persisted across sessions.
       */
  displayActionCountAsBadgeText?: boolean | undefined

  /** Details of how the tab's action count should be adjusted. */
  tabUpdate?: TabActionCountUpdate | undefined
}

export interface Redirect {
  /** Path relative to the extension directory.
       * Should start with '/'.
       */
  extensionPath?: string | undefined

  /** Substitution pattern for rules which specify a regexFilter.
       * The first match of regexFilter within the url will be replaced with this pattern.
       * Within regexSubstitution, backslash-escaped digits (\1 to \9) can be used to insert the corresponding capture groups.
       * \0 refers to the entire matching text.
       */
  regexSubstitution?: string | undefined

  /** Url transformations to perform. */
  transform?: URLTransform | undefined

  /** The redirect url.
       * Redirects to JavaScript urls are not allowed.
       */
  url?: string | undefined
}

export interface UpdateRuleOptions {
  /** Rules to add. */
  addRules?: Rule[] | undefined

  /**
       * IDs of the rules to remove.
       * Any invalid IDs will be ignored.
       */
  removeRuleIds?: number[] | undefined
}

export interface UpdateRulesetOptions {
  /** The set of ids corresponding to a static Ruleset that should be disabled. */
  disableRulesetIds?: string[] | undefined

  /** The set of ids corresponding to a static Ruleset that should be enabled. */
  enableRulesetIds?: string[] | undefined
}

export interface MatchedRuleInfoDebug {
  /** Details about the request for which the rule was matched. */
  request: RequestDetails

  rule: MatchedRule
}

export interface Ruleset {
  /** Whether the ruleset is enabled by default. */
  enabled: boolean

  /** A non-empty string uniquely identifying the ruleset.
       * IDs beginning with '_' are reserved for internal use.
       */
  id: string

  /** The path of the JSON ruleset relative to the extension directory. */
  path: string
}

export interface RulesMatchedDetails {
  /** Rules matching the given filter. */
  rulesMatchedInfo: MatchedRuleInfo[]
}

/** The rule that has been matched along with information about the associated request. */
export interface RuleMatchedDebugEvent extends chrome.events.Event<(info: MatchedRuleInfoDebug) => void> {}
export default interface _ {

  /** Ruleset ID for the dynamic rules added by the extension. */
  DYNAMIC_RULESET_ID: string

  /** Time interval within which MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL getMatchedRules calls can be made, specified in minutes.
   * Additional calls will fail immediately and set runtime.lastError.
   * Note: getMatchedRules calls associated with a user gesture are exempt from the quota.
   */
  GETMATCHEDRULES_QUOTA_INTERVAL: number

  /** The minimum number of static rules guaranteed to an extension across its enabled static rulesets.
   * Any rules above this limit will count towards the global rule limit.
   */
  GUARANTEED_MINIMUM_STATIC_RULES: number

  /** The number of times getMatchedRules can be called within a period of GETMATCHEDRULES_QUOTA_INTERVAL. */
  MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL: number

  /** The maximum number of combined dynamic and session scoped rules an extension can add. */
  MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES: number

  /** The maximum number of regular expression rules that an extension can add.
   * This limit is evaluated separately for the set of dynamic rules and those specified in the rule resources file.
   */
  MAX_NUMBER_OF_REGEX_RULES: number

  /** The maximum number of static Rulesets an extension can specify as part of the "rule_resources" manifest key. */
  MAX_NUMBER_OF_STATIC_RULESETS: number

  /** Ruleset ID for the session-scoped rules added by the extension. */
  SESSION_RULESET_ID: string

  /** Returns the number of static rules an extension can enable before the global static rule limit is reached. */
  getAvailableStaticRuleCount: ((callback: (count: number) => void) => void) & (() => Promise<number>)

  /** Returns the current set of dynamic rules for the extension.
   *
   * @param callback Called with the set of dynamic rules.
   * An error might be raised in case of transient internal errors.
   */
  getDynamicRules: ((callback: (rules: Rule[]) => void) => void) & (() => Promise<Rule[]>)

  /** Returns the ids for the current set of enabled static rulesets.
   *
   * @param callback Called with a list of ids, where each id corresponds to an enabled static Ruleset. */
  getEnabledRulesets: ((callback: (rulesetIds: string[]) => void) => void) & (() => Promise<string[]>)

  /** Returns all rules matched for the extension.
   * Callers can optionally filter the list of matched rules by specifying a filter.
   * This method is only available to extensions with the declarativeNetRequestFeedback permission or having the activeTab permission granted for the tabId specified in filter.
   * Note: Rules not associated with an active document that were matched more than five minutes ago will not be returned.
   *
   * @param filter An object to filter the list of matched rules.
   * @param callback Called once the list of matched rules has been fetched.
   * In case of an error, runtime.lastError will be set and no rules will be returned.
   * This can happen for multiple reasons, such as insufficient permissions, or exceeding the quota.
   */
  getMatchedRules: ((
    filter: MatchedRulesFilter | undefined,
    callback: (details: RulesMatchedDetails) => void,
  ) => void) & ((filter: MatchedRulesFilter | undefined) => Promise<RulesMatchedDetails>) & ((callback: (details: RulesMatchedDetails) => void) => void) & (() => Promise<RulesMatchedDetails>)

  /** Returns the current set of session scoped rules for the extension.
   *
   * @param callback Called with the set of session scoped rules.
   */
  getSessionRules: ((callback: (rules: Rule[]) => void) => void) & (() => Promise<Rule[]>)

  /** Checks if the given regular expression will be supported as a regexFilter rule condition.
   *
   * @param regexOptions The regular expression to check.
   * @param callback Called with details consisting of whether the regular expression is supported and the
   * reason if not.
   */
  isRegexSupported: ((
    regexOptions: RegexOptions,
    callback: (result: IsRegexSupportedResult) => void,
  ) => void) & ((regexOptions: RegexOptions) => Promise<IsRegexSupportedResult>)

  /** Configures if the action count for tabs should be displayed as the extension action's badge text and provides a way for that action count to be incremented. */
  setExtensionActionOptions: ((options: ExtensionActionOptions, callback: Function) => void) & ((options: ExtensionActionOptions) => Promise<void>)

  /** Modifies the current set of dynamic rules for the extension.
   * The rules with IDs listed in options.removeRuleIds are first removed, and then the rules given in options.addRules are added.
   *
   * Notes:
   * This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
   * These rules are persisted across browser sessions and across extension updates.
   * Static rules specified as part of the extension package can not be removed using this function.
   * MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES is the maximum number of combined dynamic and session rules an extension can add.
   *
   * @param callback Called once the update is complete or has failed.
   * In case of an error, runtime.lastError will be set and no change will be made to the rule set.
   * This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, internal errors, and others.
   */
  updateDynamicRules: ((options: UpdateRuleOptions, callback: Function) => void) & ((options: UpdateRuleOptions) => Promise<void>)

  /** Updates the set of enabled static rulesets for the extension.
   * The rulesets with IDs listed in options.disableRulesetIds are first removed, and then the rulesets listed in options.enableRulesetIds are added.
   *
   * Note that the set of enabled static rulesets is persisted across sessions but not across extension updates, i.e. the rule_resources manifest key will determine the set of enabled static rulesets on each extension update.
   *
   * @param callback Called once the update is complete.
   * In case of an error, runtime.lastError will be set and no change will be made to set of enabled rulesets.
   * This can happen for multiple reasons, such as invalid ruleset IDs, rule count limit exceeded, or internal errors.
   */
  updateEnabledRulesets: ((options: UpdateRulesetOptions, callback: Function) => void) & ((options: UpdateRulesetOptions) => Promise<void>)

  /** Modifies the current set of session scoped rules for the extension.
   * The rules with IDs listed in options.removeRuleIds are first removed, and then the rules given in options.addRules are added.
   *
   * Notes:
   * This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
   * These rules are not persisted across sessions and are backed in memory.
   * MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES is the maximum number of combined dynamic and session rules an extension can add.
   *
   * @param callback Called once the update is complete or has failed.
   * In case of an error, runtime.lastError will be set and no change will be made to the rule set.
   * This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, and others.
   */
  updateSessionRules: ((options: UpdateRuleOptions, callback: Function) => void) & ((options: UpdateRuleOptions) => Promise<void>)

  /** Fired when a rule is matched with a request.
   * Only available for unpacked extensions with the declarativeNetRequestFeedback permission as this is intended to be used for debugging purposes only. */
  onRuleMatchedDebug: RuleMatchedDebugEvent
}
