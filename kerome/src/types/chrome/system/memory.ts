/// /////////////////
// System Memory
/// /////////////////
/**
* The chrome.system.memory API.
* Permissions:  "system.memory"
* @since Chrome 32.
*/

export interface MemoryInfo {
  /** The total amount of physical memory capacity, in bytes. */
  capacity: number
  /** The amount of available capacity, in bytes. */
  availableCapacity: number
}
export default interface _ {

  /** Get physical memory information. */
  getInfo: ((callback: (info: MemoryInfo) => void) => void) & (() => Promise<MemoryInfo>)
}
