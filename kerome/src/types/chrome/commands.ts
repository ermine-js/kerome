import type * as chrome from './'
/// /////////////////
// Commands
/// /////////////////
/**
* Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.
* Availability: Since Chrome 25.
* Manifest:  "commands": {...}
*/

export interface Command {
  /** Optional. The name of the Extension Command  */
  name?: string | undefined
  /** Optional. The Extension Command description  */
  description?: string | undefined
  /** Optional. The shortcut active for this command, or blank if not active.  */
  shortcut?: string | undefined
}

export interface CommandEvent extends chrome.events.Event<(command: string, tab: chrome.tabs.Tab) => void> {}
export default interface _ {

  /**
   * Returns all the registered extension commands for this extension and their shortcut (if active).
   * @return The `getAll` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  getAll: (() => Promise<Command[]>) & ((callback: (commands: Command[]) => void) => void)

  /** Fired when a registered command is activated using a keyboard shortcut. */
  onCommand: CommandEvent
}
