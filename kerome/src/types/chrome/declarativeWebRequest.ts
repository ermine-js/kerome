import type * as chrome from './'
/// /////////////////
// Declarative Web Request
/// /////////////////

export interface HeaderFilter {
  nameEquals?: string | undefined
  valueContains?: string | string[] | undefined
  nameSuffix?: string | undefined
  valueSuffix?: string | undefined
  valuePrefix?: string | undefined
  nameContains?: string | string[] | undefined
  valueEquals?: string | undefined
  namePrefix?: string | undefined
}

export interface AddResponseHeader {
  name: string
  value: string
}

export interface RemoveResponseCookie {
  filter: ResponseCookie
}

export interface RemoveResponseHeader {
  name: string
  value?: string | undefined
}

export interface RequestMatcher {
  contentType?: string[] | undefined
  url?: chrome.events.UrlFilter | undefined
  excludeContentType?: string[] | undefined
  excludeResponseHeader?: HeaderFilter[] | undefined
  resourceType?: string | undefined
  responseHeaders?: HeaderFilter[] | undefined
}

export interface IgnoreRules {
  lowerPriorityThan: number
}

export interface RedirectToEmptyDocument {}

export interface RedirectRequest {
  redirectUrl: string
}

export interface ResponseCookie {
  domain?: string | undefined
  name?: string | undefined
  expires?: string | undefined
  maxAge?: number | undefined
  value?: string | undefined
  path?: string | undefined
  httpOnly?: string | undefined
  secure?: string | undefined
}

export interface AddResponseCookie {
  cookie: ResponseCookie
}

export interface EditResponseCookie {
  filter: ResponseCookie
  modification: ResponseCookie
}

export interface CancelRequest {}

export interface RemoveRequestHeader {
  name: string
}

export interface EditRequestCookie {
  filter: RequestCookie
  modification: RequestCookie
}

export interface SetRequestHeader {
  name: string
  value: string
}

export interface RequestCookie {
  name?: string | undefined
  value?: string | undefined
}

export interface RedirectByRegEx {
  to: string
  from: string
}

export interface RedirectToTransparentImage {}

export interface AddRequestCookie {
  cookie: RequestCookie
}

export interface RemoveRequestCookie {
  filter: RequestCookie
}

export interface RequestedEvent extends chrome.events.Event<Function> {}
export default interface _ {

  onRequest: RequestedEvent
}
