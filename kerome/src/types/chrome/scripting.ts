/// /////////////////
// Scripting
/// /////////////////
/**
* Use the chrome.scripting API to execute script in different contexts.
* Permissions: "scripting", Manifest v3+
* @since Chrome 88.
*/

/* The CSS style origin for a style change. */
export type StyleOrigin = 'AUTHOR' | 'USER'

/* The JavaScript world for a script to execute within. */
export type ExecutionWorld = 'ISOLATED' | 'MAIN'

export interface InjectionResult<T> {
  /* The frame associated with the injection. */
  frameId: number
  /* The result of the script execution. */
  result: T
}

export interface InjectionTarget {
  /* Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if frameIds is specified. */
  allFrames?: boolean | undefined
  /* The IDs of specific frames to inject into. */
  frameIds?: number[] | undefined
  /* The ID of the tab into which to inject. */
  tabId: number
}

export interface CSSInjection {
  /* A string containing the CSS to inject. Exactly one of files and css must be specified. */
  css?: string | undefined
  /* The path of the CSS files to inject, relative to the extension's root directory. NOTE: Currently a maximum of one file is supported. Exactly one of files and css must be specified. */
  files?: string[] | undefined
  /* The style origin for the injection. Defaults to 'AUTHOR'. */
  origin?: StyleOrigin | undefined
  /* Details specifying the target into which to insert the CSS. */
  target: InjectionTarget
}

export type ScriptInjection<Args extends any[], Result> =
      & {
        /* Details specifying the target into which to inject the script. */
        target: InjectionTarget
        /* The JavaScript world for a script to execute within. */
        world?: ExecutionWorld
        /* Whether the injection should be triggered in the target as soon as possible. Note that this is not a guarantee that injection will occur prior to page load, as the page may have already loaded by the time the script reaches the target. */
        injectImmediately?: boolean
      }
      & (
        | {
          /* The path of the JS files to inject, relative to the extension's root directory. NOTE: Currently a maximum of one file is supported. Exactly one of files and function must be specified. */
          files: string[]
        }
        | ({
          /* A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of files and function must be specified. */
          func: () => Result
        } | {
          /* A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of files and function must be specified. */
          func: (...args: Args) => Result
          /* The arguments to carry into a provided function. This is only valid if the func parameter is specified. These arguments must be JSON-serializable. */
          args: Args
        })
      )

  type Awaited<T> = T extends PromiseLike<infer U> ? U : T

interface RegisteredContentScript {
  id: string
  allFrames?: boolean
  matchOriginAsFallback?: boolean
  css?: string[]
  excludeMatches?: string[]
  js?: string[]
  matches?: string[]
  persistAcrossSessions?: boolean
  runAt?: 'document_start' | 'document_end' | 'document_idle'
  world?: ExecutionWorld
}

interface ContentScriptFilter {
  ids?: string[]
  css?: string
  files?: string[]
  origin?: StyleOrigin
  target?: InjectionTarget
}
export default interface _ {

  /* The CSS style origin for a style change. */

  /* The JavaScript world for a script to execute within. */

  /**
   * Injects a script into a target context. The script will be run at document_end.
   * @param injection
   * The details of the script which to inject.
   * @return The `executeScript` method provides its result via callback or returned as a `Promise` (MV3 only). The resulting array contains the result of execution for each frame where the injection succeeded.
   */
  executeScript: (<Args extends any[], Result>(
    injection: ScriptInjection<Args, Result>,
  ) => Promise<Array<InjectionResult<Awaited<Result>>>>) & (<Args extends any[], Result>(
    injection: ScriptInjection<Args, Result>,
    callback: (results: Array<InjectionResult<Awaited<Result>>>) => void,
  ) => void)

  /**
   * Inserts a CSS stylesheet into a target context. If multiple frames are specified, unsuccessful injections are ignored.
   * @param injection
   * The details of the styles to insert.
   * @return The `insertCSS` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  insertCSS: ((injection: CSSInjection) => Promise<void>) & ((injection: CSSInjection, callback: () => void) => void)

  /**
   * Removes a CSS stylesheet that was previously inserted by this extension from a target context.
   * @param injection
   * The details of the styles to remove.
   * Note that the css, files, and origin properties must exactly match the stylesheet inserted through `insertCSS`.
   * Attempting to remove a non-existent stylesheet is a no-op.
   * @return This only returns a Promise when the callback parameter is not specified, and with MV3+.
   * @since Chrome 90
   */
  removeCSS: ((injection: CSSInjection) => Promise<void>) & ((injection: CSSInjection, callback: () => void) => void)

  /**
   * Registers one or more content scripts.
   * @param scripts
   */
  registerContentScripts: ((scripts: RegisteredContentScript[]) => Promise<void>) & ((scripts: RegisteredContentScript[], callback: () => void) => void)

  /**
   * Unregister one or more content scripts.
   * @param filter
   * @param callback
   */
  unregisterContentScripts: ((filter?: ContentScriptFilter) => Promise<void>) & ((callback: () => void) => void) & ((filter: ContentScriptFilter, callback: () => void) => void)

  /**
   * Returns all the content scripts registered with scripting.registerContentScripts()
   * or a subset of the registered scripts when using a filter.
   * @param filter
   */
  getRegisteredContentScripts: ((filter?: ContentScriptFilter) => Promise<RegisteredContentScript[]>) & ((callback: (scripts: RegisteredContentScript[]) => void) => void) & ((
    filter: ContentScriptFilter,
    callback: (scripts: RegisteredContentScript[]) => void,
  ) => void)

  /**
   * Updates one or more content scripts.
   * @param scripts
   */
  updateContentScripts: ((scripts: RegisteredContentScript[]) => Promise<void>) & ((scripts: RegisteredContentScript[], callback: () => void) => void)
}
