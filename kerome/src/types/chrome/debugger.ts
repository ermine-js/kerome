import type * as chrome from './'

/** Debuggee identifier. Either tabId or extensionId must be specified */
export interface Debuggee {
  /** Optional. The id of the tab which you intend to debug.  */
  tabId?: number | undefined
  /**
           * Optional.
           * Since Chrome 27.
           * The id of the extension which you intend to debug. Attaching to an extension background page is only possible when 'silent-debugger-extension-api' flag is enabled on the target browser.
           */
  extensionId?: string | undefined
  /**
           * Optional.
           * Since Chrome 28.
           * The opaque id of the debug target.
           */
  targetId?: string | undefined
}

/**
       * Since Chrome 28.
       * Debug target information
       */
export interface TargetInfo {
  /** Target type. */
  type: string
  /** Target id. */
  id: string
  /**
           * Optional.
           * Since Chrome 30.
           * The tab id, defined if type == 'page'.
           */
  tabId?: number | undefined
  /**
           * Optional.
           * Since Chrome 30.
           * The extension id, defined if type = 'background_page'.
           */
  extensionId?: string | undefined
  /** True if debugger is already attached. */
  attached: boolean
  /** Target page title. */
  title: string
  /** Target URL. */
  url: string
  /** Optional. Target favicon URL.  */
  faviconUrl?: string | undefined
}

export interface DebuggerDetachedEvent
  extends chrome.events.Event<(source: Debuggee, reason: string) => void>
{}

export interface DebuggerEventEvent
  extends chrome.events.Event<(source: Debuggee, method: string, params?: Object) => void>
{}
export default interface _ {

  /**
       * Attaches debugger to the given target.
       * @param target Debugging target to which you want to attach.
       * @param requiredVersion Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained in the documentation pages.
       * @return The `attach` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
       */
  attach: ((target: Debuggee, requiredVersion: string) => Promise<void>) & ((target: Debuggee, requiredVersion: string, callback: () => void) => void)

  /**
       * Detaches debugger from the given target.
       * @param target Debugging target from which you want to detach.
       * @return The `detach` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
       */
  detach: ((target: Debuggee) => Promise<void>) & ((target: Debuggee, callback: () => void) => void)

  /**
       * Sends given command to the debugging target.
       * @param target Debugging target to which you want to send the command.
       * @param method Method name. Should be one of the methods defined by the remote debugging protocol.
       * @param commandParams Since Chrome 22.
       * JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.
       * @return The `sendCommand` method provides its result via callback or returned as a `Promise` (MV3 only).
       */
  sendCommand: ((
    target: Debuggee,
    method: string,
    commandParams?: Object,
  ) => Promise<Object>) & ((
    target: Debuggee,
    method: string,
    commandParams?: Object,
    callback?: (result?: Object) => void,
  ) => void)

  /**
       * Since Chrome 28.
       * Returns the list of available debug targets.
       * @return The `getTargets` method provides its result via callback or returned as a `Promise` (MV3 only).
       */
  getTargets: (() => Promise<TargetInfo[]>) & ((callback: (result: TargetInfo[]) => void) => void)

  /** Fired when browser terminates debugging session for the tab. This happens when either the tab is being closed or Chrome DevTools is being invoked for the attached tab. */
  onDetach: DebuggerDetachedEvent

  /** Fired whenever debugging target issues instrumentation event. */
  onEvent: DebuggerEventEvent
}
