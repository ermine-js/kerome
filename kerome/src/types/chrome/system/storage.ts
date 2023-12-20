import type * as chrome from '../'
/// /////////////////
// System Storage
/// /////////////////
/**
* Use the chrome.system.storage API to query storage device information and be notified when a removable storage device is attached and detached.
* Permissions:  "system.storage"
* @since Chrome 30.
*/

export interface StorageUnitInfo {
  /** The transient ID that uniquely identifies the storage device. This ID will be persistent within the same run of a single application. It will not be a persistent identifier between different runs of an application, or between different applications. */
  id: string
  /** The name of the storage unit. */
  name: string
  /**
       * The media type of the storage unit.
       * fixed: The storage has fixed media, e.g. hard disk or SSD.
       * removable: The storage is removable, e.g. USB flash drive.
       * unknown: The storage type is unknown.
       */
  type: string
  /** The total amount of the storage space, in bytes. */
  capacity: number
}

export interface StorageCapacityInfo {
  /** A copied |id| of getAvailableCapacity function parameter |id|. */
  id: string
  /** The available capacity of the storage device, in bytes. */
  availableCapacity: number
}

export interface SystemStorageAttachedEvent extends chrome.events.Event<(info: StorageUnitInfo) => void> {}

export interface SystemStorageDetachedEvent extends chrome.events.Event<(id: string) => void> {}
export default interface _ {

  /** Get the storage information from the system. The argument passed to the callback is an array of StorageUnitInfo objects. */
  getInfo: ((callback: (info: StorageUnitInfo[]) => void) => void) & (() => Promise<StorageUnitInfo[]>)

  /**
   * Ejects a removable storage device.
   * @param callback
   * Parameter result: success: The ejection command is successful -- the application can prompt the user to remove the device; in_use: The device is in use by another application. The ejection did not succeed; the user should not remove the device until the other application is done with the device; no_such_device: There is no such device known. failure: The ejection command failed.
   */
  ejectDevice: ((id: string, callback: (result: string) => void) => void) & ((id: string) => Promise<string>)

  /**
   * Get the available capacity of a specified |id| storage device. The |id| is the transient device ID from StorageUnitInfo.
   * @since Dev channel only.
   */
  getAvailableCapacity: ((id: string, callback: (info: StorageCapacityInfo) => void) => void) & ((id: string) => Promise<StorageCapacityInfo>)

  /** Fired when a new removable storage is attached to the system. */
  onAttached: SystemStorageAttachedEvent

  /** Fired when a removable storage is detached from the system. */
  onDetached: SystemStorageDetachedEvent
}
