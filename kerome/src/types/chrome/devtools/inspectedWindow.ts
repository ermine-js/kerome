import type * as chrome from '../'
/// /////////////////
// Dev Tools - Inspected Window
/// /////////////////
/**
* Use the chrome.devtools.inspectedWindow API to interact with the inspected window: obtain the tab ID for the inspected page, evaluate the code in the context of the inspected window, reload the page, or obtain the list of resources within the page.
* Availability: Since Chrome 18.
*/

/** A resource within the inspected page, such as a document, a script, or an image. */
export interface Resource {
  /** The URL of the resource. */
  url: string
  /**
       * Gets the content of the resource.
       * @param callback A function that receives resource content when the request completes.
       */
  getContent: (
    callback: (
      /** Content of the resource (potentially encoded) */
      content: string,
      /** Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported. */
      encoding: string,
    ) => void,
  ) => void
  /**
       * Sets the content of the resource.
       * @param content New content of the resource. Only resources with the text type are currently supported.
       * @param commit True if the user has finished editing the resource, and the new content of the resource should be persisted; false if this is a minor change sent in progress of the user editing the resource.
       * @param callback A function called upon request completion.
       */
  setContent: (
    content: string,
    commit: boolean,
    callback?: (
      /**
               * Set to undefined if the resource content was set successfully; describes error otherwise.
               */
      error?: Object,
    ) => void,
  ) => void
}

export interface ReloadOptions {
  /** Optional. If specified, the string will override the value of the User-Agent HTTP header that's sent while loading the resources of the inspected page. The string will also override the value of the navigator.userAgent property that's returned to any scripts that are running within the inspected page.  */
  userAgent?: string | undefined
  /** Optional. When true, the loader will ignore the cache for all inspected page resources loaded before the load event is fired. The effect is similar to pressing Ctrl+Shift+R in the inspected window or within the Developer Tools window.  */
  ignoreCache?: boolean | undefined
  /** Optional. If specified, the script will be injected into every frame of the inspected page immediately upon load, before any of the frame's scripts. The script will not be injected after subsequent reloads—for example, if the user presses Ctrl+R.  */
  injectedScript?: string | undefined
  /**
       * Optional.
       * If specified, this script evaluates into a function that accepts three string arguments: the source to preprocess, the URL of the source, and a function name if the source is an DOM event handler. The preprocessorerScript function should return a string to be compiled by Chrome in place of the input source. In the case that the source is a DOM event handler, the returned source must compile to a single JS function.
       * @deprecated Deprecated since Chrome 41. Please avoid using this parameter, it will be removed soon.
       */
  preprocessorScript?: string | undefined
}

export interface EvaluationExceptionInfo {
  /** Set if the error occurred on the DevTools side before the expression is evaluated. */
  isError: boolean
  /** Set if the error occurred on the DevTools side before the expression is evaluated. */
  code: string
  /** Set if the error occurred on the DevTools side before the expression is evaluated. */
  description: string
  /** Set if the error occurred on the DevTools side before the expression is evaluated, contains the array of the values that may be substituted into the description string to provide more information about the cause of the error. */
  details: any[]
  /** Set if the evaluated code produces an unhandled exception. */
  isException: boolean
  /** Set if the evaluated code produces an unhandled exception. */
  value: string
}

export interface ResourceAddedEvent extends chrome.events.Event<(resource: Resource) => void> {}

export interface ResourceContentCommittedEvent
  extends chrome.events.Event<(resource: Resource, content: string) => void>
{}

export interface EvalOptions {
  /** If specified, the expression is evaluated on the iframe whose URL matches the one specified. By default, the expression is evaluated in the top frame of the inspected page. */
  frameURL?: string | undefined
  /** Evaluate the expression in the context of the content script of the calling extension, provided that the content script is already injected into the inspected page. If not, the expression is not evaluated and the callback is invoked with the exception parameter set to an object that has the isError field set to true and the code field set to E_NOTFOUND. */
  useContentScriptContext?: boolean | undefined
  /** Evaluate the expression in the context of a content script of an extension that matches the specified origin. If given, contextSecurityOrigin overrides the 'true' setting on userContentScriptContext. */
  contextSecurityOrigin?: string | undefined
}
export default interface _ {

  /** The ID of the tab being inspected. This ID may be used with chrome.tabs.* API. */
  tabId: number

  /** Reloads the inspected page. */
  reload: (reloadOptions?: ReloadOptions) => void

  /**
   * Evaluates a JavaScript expression in the context of the main frame of the inspected page. The expression must evaluate to a JSON-compliant object, otherwise an exception is thrown. The eval function can report either a DevTools-side error or a JavaScript exception that occurs during evaluation. In either case, the result parameter of the callback is undefined. In the case of a DevTools-side error, the isException parameter is non-null and has isError set to true and code set to an error code. In the case of a JavaScript error, isException is set to true and value is set to the string value of thrown object.
   * @param expression An expression to evaluate.
   * @param callback A function called when evaluation completes.
   * Parameter result: The result of evaluation.
   * Parameter exceptionInfo: An object providing details if an exception occurred while evaluating the expression.
   */
  eval: (<T>(
    expression: string,
    callback?: (result: T, exceptionInfo: EvaluationExceptionInfo) => void,
  ) => void) & (<T>(
    expression: string,
    options?: EvalOptions,
    callback?: (result: T, exceptionInfo: EvaluationExceptionInfo) => void,
  ) => void)

  /**
   * Retrieves the list of resources from the inspected page.
   * @param callback A function that receives the list of resources when the request completes.
   */
  getResources: (callback: (resources: Resource[]) => void) => void

  /** Fired when a new resource is added to the inspected page. */
  onResourceAdded: ResourceAddedEvent

  /** Fired when a new revision of the resource is committed (e.g. user saves an edited version of the resource in the Developer Tools). */
  onResourceContentCommitted: ResourceContentCommittedEvent
}
