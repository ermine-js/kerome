import type * as chrome from './'
/// /////////////////
// File System Provider
/// /////////////////
/**
* Use the chrome.fileSystemProvider API to create file systems, that can be accessible from the file manager on Chrome OS.
* Availability: Since Chrome 40.
* Permissions:  "fileSystemProvider"
* Important: This API works only on Chrome OS.
*/

export interface OpenedFileInfo {
  /** A request ID to be be used by consecutive read/write and close requests. */
  openRequestId: number
  /** The path of the opened file. */
  filePath: string
  /** Whether the file was opened for reading or writing. */
  mode: string
}

export interface FileWatchersInfo {
  /** The path of the entry being observed. */
  entryPath: string
  /** Whether watching should include all child entries recursively. It can be true for directories only. */
  recursive: boolean
  /** Optional. Tag used by the last notification for the watcher.  */
  lastTag?: string | undefined
}

export interface CloudIdentifier {
  /** Identifier for the cloud storage provider (e.g. 'drive.google.com'). */
  providerName: string
  /** The provider's identifier for the given file/directory. */
  id: string
}

export interface EntryMetadata {
  /** True if it is a directory. Must be provided if requested in `options`. */
  isDirectory?: boolean
  /** Name of this entry (not full path name). Must not contain '/'. For root it must be empty. Must be provided if requested in `options`. */
  name?: string
  /** File size in bytes. Must be provided if requested in `options`. */
  size?: number
  /** The last modified time of this entry. Must be provided if requested in `options`. */
  modificationTime?: Date
  /** Optional. Mime type for the entry. Always optional, but should provided if requested in `options`. */
  mimeType?: string | undefined
  /** Optional. Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32 KB in size. Optional, but can be provided only when explicitly requested by the onGetMetadataRequested event. */
  thumbnail?: string | undefined
  /** Optional. Cloud storage representation of this entry. Must be provided if requested in `options` and the file is backed by cloud storage. For local files not backed by cloud storage, it should be undefined when requested. */
  cloudIdentifier?: CloudIdentifier | undefined
}

export interface FileSystemInfo {
  /** The identifier of the file system. */
  fileSystemId: string
  /** A human-readable name for the file system. */
  displayName: string
  /** Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files). */
  writable: boolean
  /**
       * The maximum number of files that can be opened at once. If 0, then not limited.
       * @since Since Chrome 42.
       */
  openedFilesLimit: number
  /**
       * List of currently opened files.
       * @since Since Chrome 42.
       */
  openedFiles: OpenedFileInfo[]
  /**
       * Optional.
       * Whether the file system supports the tag field for observing directories.
       * @since Since Chrome 45. Warning: this is the current Beta channel.
       */
  supportsNotifyTag?: boolean | undefined
  /**
       * List of watchers.
       * @since Since Chrome 45. Warning: this is the current Beta channel.
       */
  watchers: FileWatchersInfo[]
}

/** @since Since Chrome 45. Warning: this is the current Beta channel. */
export interface GetActionsRequestedOptions {
  /** The identifier of the file system related to this operation. */
  fileSystemId: string
  /** The unique identifier of this request. */
  requestId: number
  /** List of paths of entries for the list of actions. */
  entryPaths: string[]
}

/** @since Since Chrome 45. Warning: this is the current Beta channel. */
export interface Action {
  /** The identifier of the action. Any string or CommonActionId for common actions. */
  id: string
  /** Optional. The title of the action. It may be ignored for common actions.  */
  title?: string | undefined
}

/** @since Since Chrome 45. Warning: this is the current Beta channel. */
export interface ExecuteActionRequestedOptions {
  /** The identifier of the file system related to this operation. */
  fileSystemId: string
  /** The unique identifier of this request. */
  requestId: number
  /** The set of paths of the entries to be used for the action. */
  entryPaths: string[]
  /** The identifier of the action to be executed. */
  actionId: string
}

export interface MountOptions {
  /** The string identifier of the file system. Must be unique per each extension. */
  fileSystemId: string
  /** A human-readable name for the file system. */
  displayName: string
  /** Optional. Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).  */
  writable?: boolean | undefined
  /**
       * Optional.
       * The maximum number of files that can be opened at once. If not specified, or 0, then not limited.
       * @since Since Chrome 41.
       */
  openedFilesLimit?: number | undefined
  /**
       * Optional.
       * Whether the file system supports the tag field for observed directories.
       * @since Since Chrome 45. Warning: this is the current Beta channel.
       */
  supportsNotifyTag?: boolean | undefined
}

export interface UnmountOptions {
  /** The identifier of the file system to be unmounted. */
  fileSystemId: string
}

export interface NotificationChange {
  /** The path of the changed entry. */
  entryPath: string
  /** The type of the change which happened to the entry. */
  changeType: string
}

export interface NotificationOptions {
  /** The identifier of the file system related to this change. */
  fileSystemId: string
  /** The path of the observed entry. */
  observedPath: string
  /** Mode of the observed entry. */
  recursive: boolean
  /** The type of the change which happened to the observed entry. If it is DELETED, then the observed entry will be automatically removed from the list of observed entries. */
  changeType: string
  /** Optional. List of changes to entries within the observed directory (including the entry itself)  */
  changes?: NotificationChange[] | undefined
  /** Optional. Tag for the notification. Required if the file system was mounted with the supportsNotifyTag option. Note, that this flag is necessary to provide notifications about changes which changed even when the system was shutdown.  */
  tag?: string | undefined
}

export interface RequestedEventOptions {
  /** The identifier of the file system related to this operation. */
  fileSystemId: string
  /** The unique identifier of this request. */
  requestId: number
}

export interface EntryPathRequestedEventOptions extends RequestedEventOptions {
  /** The path of the entry to which this operation is related to. */
  entryPath: string
}

export interface MetadataRequestedEventOptions extends EntryPathRequestedEventOptions {
  /** Set to true if `is_directory` value is requested. */
  isDirectory: boolean
  /** Set to true if `name` value is requested. */
  name: boolean
  /** Set to true if `size` value is requested. */
  size: boolean
  /** Set to true if `modificationTime` value is requested. */
  modificationTime: boolean
  /** Set to true if `mimeType` value is requested. */
  mimeType: boolean
  /** Set to true if `thumbnail` is requested. */
  thumbnail: boolean
  /** Set to true if `cloudIdentifier` is requested. */
  cloudIdentifier: boolean
}

export interface DirectoryPathRequestedEventOptions extends RequestedEventOptions {
  /** The path of the directory which is to be operated on. */
  directoryPath: string
  /** Set to true if `is_directory` value is requested. */
  isDirectory: boolean
  /** Set to true if `name` value is requested. */
  name: boolean
  /** Set to true if `size` value is requested. */
  size: boolean
  /** Set to true if `modificationTime` value is requested. */
  modificationTime: boolean
  /** Set to true if `mimeType` value is requested. */
  mimeType: boolean
  /** Set to true if `thumbnail` is requested. */
  thumbnail: boolean
}

export interface FilePathRequestedEventOptions extends RequestedEventOptions {
  /** The path of the entry for the operation */
  filePath: string
}

export interface OpenFileRequestedEventOptions extends FilePathRequestedEventOptions {
  /** Whether the file will be used for reading or writing. */
  mode: string
}

export interface OpenedFileRequestedEventOptions extends RequestedEventOptions {
  /** A request ID used to open the file. */
  openRequestId: number
}

export interface OpenedFileOffsetRequestedEventOptions extends OpenedFileRequestedEventOptions {
  /** Position in the file (in bytes) to start reading from. */
  offset: number
  /** Number of bytes to be returned. */
  length: number
}

export interface CreateDirectoryRequestedEventOptions extends RequestedEventOptions {
  /** The path of the directory to be created. */
  directoryPath: string

  /** Whether the operation is recursive (for directories only). */
  recursive: boolean
}

export interface EntryPathRecursiveRequestedEventOptions extends EntryPathRequestedEventOptions {
  /** Whether the operation is recursive (for directories only). */
  recursive: boolean
}

export interface SourceTargetPathRequestedEventOptions extends RequestedEventOptions {
  /** The source path for the operation. */
  sourcePath: string
  /** The destination path for the operation. */
  targetPath: string
}

export interface FilePathLengthRequestedEventOptions extends FilePathRequestedEventOptions {
  /** Number of bytes to be retained after the operation completes. */
  length: number
}

export interface OpenedFileIoRequestedEventOptions extends OpenedFileRequestedEventOptions {
  /** Position in the file (in bytes) to start operating from. */
  offset: number
  /** Buffer of bytes to be operated on the file. */
  data: ArrayBuffer
}

export interface OperationRequestedEventOptions extends RequestedEventOptions {
  /** An ID of the request to which this operation is related. */
  operationRequestId: number
}

export interface RequestedEvent extends
  chrome.events.Event<
  (options: RequestedEventOptions, successCallback: Function, errorCallback: (error: string) => void) => void
  >
{}

export interface MetadataRequestedEvent extends
  chrome.events.Event<
  (
    options: MetadataRequestedEventOptions,
    successCallback: (metadata: EntryMetadata) => void,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface DirectoryPathRequestedEvent extends
  chrome.events.Event<
  (
    options: DirectoryPathRequestedEventOptions,
    successCallback: (entries: EntryMetadata[], hasMore: boolean) => void,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface OpenFileRequestedEvent extends
  chrome.events.Event<
  (
    options: OpenFileRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface OpenedFileRequestedEvent extends
  chrome.events.Event<
  (
    options: OpenedFileRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface OpenedFileOffsetRequestedEvent extends
  chrome.events.Event<
  (
    options: OpenedFileOffsetRequestedEventOptions,
    successCallback: (data: ArrayBuffer, hasMore: boolean) => void,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface CreateDirectoryRequestedEvent extends
  chrome.events.Event<
  (
    options: CreateDirectoryRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface EntryPathRecursiveRequestedEvent extends
  chrome.events.Event<
  (
    options: EntryPathRecursiveRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface FilePathRequestedEvent extends
  chrome.events.Event<
  (
    options: FilePathRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface SourceTargetPathRequestedEvent extends
  chrome.events.Event<
  (
    options: SourceTargetPathRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface FilePathLengthRequestedEvent extends
  chrome.events.Event<
  (
    options: FilePathLengthRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface OpenedFileIoRequestedEvent extends
  chrome.events.Event<
  (
    options: OpenedFileIoRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface OperationRequestedEvent extends
  chrome.events.Event<
  (
    options: OperationRequestedEventOptions,
    successCallback: Function,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface OptionlessRequestedEvent
  extends chrome.events.Event<(successCallback: Function, errorCallback: (error: string) => void) => void>
{}

export interface GetActionsRequested extends
  chrome.events.Event<
  (
    options: GetActionsRequestedOptions,
    successCallback: (actions: Action[]) => void,
    errorCallback: (error: string) => void,
  ) => void
  >
{}

export interface ExecuteActionRequested extends
  chrome.events.Event<
  (
    options: ExecuteActionRequestedOptions,
    successCallback: () => void,
    errorCallback: (error: string) => void,
  ) => void
  >
{}
export default interface _ {

  /**
   * Mounts a file system with the given fileSystemId and displayName. displayName will be shown in the left panel of Files.app. displayName can contain any characters including '/', but cannot be an empty string. displayName must be descriptive but doesn't have to be unique. The fileSystemId must not be an empty string.
   * Depending on the type of the file system being mounted, the source option must be set appropriately.
   * In case of an error, runtime.lastError will be set with a corresponding error code.
   * @param callback A generic result callback to indicate success or failure.
   */
  mount: (options: MountOptions, callback?: () => void) => void

  /**
   * Unmounts a file system with the given fileSystemId. It must be called after onUnmountRequested is invoked. Also, the providing extension can decide to perform unmounting if not requested (eg. in case of lost connection, or a file error).
   * In case of an error, runtime.lastError will be set with a corresponding error code.
   * @param callback A generic result callback to indicate success or failure.
   */
  unmount: (options: UnmountOptions, callback?: () => void) => void

  /**
   * Returns all file systems mounted by the extension.
   * @param callback Callback to receive the result of getAll function.
   */
  getAll: (callback: (fileSystems: FileSystemInfo[]) => void) => void

  /**
   * Returns information about a file system with the passed fileSystemId.
   * @since Since Chrome 42.
   * @param callback Callback to receive the result of get function.
   */
  get: (fileSystemId: string, callback: (fileSystem: FileSystemInfo) => void) => void

  /**
   * Notifies about changes in the watched directory at observedPath in recursive mode. If the file system is mounted with supportsNofityTag, then tag must be provided, and all changes since the last notification always reported, even if the system was shutdown. The last tag can be obtained with getAll.
   * To use, the file_system_provider.notify manifest option must be set to true.
   * Value of tag can be any string which is unique per call, so it's possible to identify the last registered notification. Eg. if the providing extension starts after a reboot, and the last registered notification's tag is equal to "123", then it should call notify for all changes which happened since the change tagged as "123". It cannot be an empty string.
   * Not all providers are able to provide a tag, but if the file system has a changelog, then the tag can be eg. a change number, or a revision number.
   * Note that if a parent directory is removed, then all descendant entries are also removed, and if they are watched, then the API must be notified about the fact. Also, if a directory is renamed, then all descendant entries are in fact removed, as there is no entry under their original paths anymore.
   * In case of an error, runtime.lastError will be set will a corresponding error code.
   * @param callback A generic result callback to indicate success or failure.
   */
  notify: (options: NotificationOptions, callback: () => void) => void

  /** Raised when unmounting for the file system with the fileSystemId identifier is requested. In the response, the unmount API method must be called together with successCallback. If unmounting is not possible (eg. due to a pending operation), then errorCallback must be called.  */
  onUnmountRequested: RequestedEvent

  /** Raised when metadata of a file or a directory at entryPath is requested. The metadata must be returned with the successCallback call. In case of an error, errorCallback must be called. */
  onGetMetadataRequested: MetadataRequestedEvent

  /** Raised when contents of a directory at directoryPath are requested. The results must be returned in chunks by calling the successCallback several times. In case of an error, errorCallback must be called. */
  onReadDirectoryRequested: DirectoryPathRequestedEvent

  /** Raised when opening a file at filePath is requested. If the file does not exist, then the operation must fail. Maximum number of files opened at once can be specified with MountOptions. */
  onOpenFileRequested: OpenFileRequestedEvent

  /** Raised when opening a file previously opened with openRequestId is requested to be closed. */
  onCloseFileRequested: OpenedFileRequestedEvent

  /** Raised when reading contents of a file opened previously with openRequestId is requested. The results must be returned in chunks by calling successCallback several times. In case of an error, errorCallback must be called. */
  onReadFileRequested: OpenedFileOffsetRequestedEvent

  /** Raised when creating a directory is requested. The operation must fail with the EXISTS error if the target directory already exists. If recursive is true, then all of the missing directories on the directory path must be created. */
  onCreateDirectoryRequested: CreateDirectoryRequestedEvent

  /** Raised when deleting an entry is requested. If recursive is true, and the entry is a directory, then all of the entries inside must be recursively deleted as well. */
  onDeleteEntryRequested: EntryPathRecursiveRequestedEvent

  /** Raised when creating a file is requested. If the file already exists, then errorCallback must be called with the "EXISTS" error code. */
  onCreateFileRequested: FilePathRequestedEvent

  /** Raised when copying an entry (recursively if a directory) is requested. If an error occurs, then errorCallback must be called. */
  onCopyEntryRequested: SourceTargetPathRequestedEvent

  /** Raised when moving an entry (recursively if a directory) is requested. If an error occurs, then errorCallback must be called. */
  onMoveEntryRequested: SourceTargetPathRequestedEvent

  /** Raised when truncating a file to a desired length is requested. If an error occurs, then errorCallback must be called. */
  onTruncateRequested: FilePathLengthRequestedEvent

  /** Raised when writing contents to a file opened previously with openRequestId is requested. */
  onWriteFileRequested: OpenedFileIoRequestedEvent

  /** Raised when aborting an operation with operationRequestId is requested. The operation executed with operationRequestId must be immediately stopped and successCallback of this abort request executed. If aborting fails, then errorCallback must be called. Note, that callbacks of the aborted operation must not be called, as they will be ignored. Despite calling errorCallback, the request may be forcibly aborted. */
  onAbortRequested: OperationRequestedEvent

  /**
   * Raised when showing a configuration dialog for fileSystemId is requested. If it's handled, the file_system_provider.configurable manfiest option must be set to true.
   * @since Since Chrome 44.
   */
  onConfigureRequested: RequestedEvent

  /**
   * Raised when showing a dialog for mounting a new file system is requested. If the extension/app is a file handler, then this event shouldn't be handled. Instead app.runtime.onLaunched should be handled in order to mount new file systems when a file is opened. For multiple mounts, the file_system_provider.multiple_mounts manifest option must be set to true.
   * @since Since Chrome 44.
   */
  onMountRequested: OptionlessRequestedEvent

  /**
   * Raised when setting a new directory watcher is requested. If an error occurs, then errorCallback must be called.
   * @since Since Chrome 45. Warning: this is the current Beta channel.
   */
  onAddWatcherRequested: EntryPathRecursiveRequestedEvent

  /**
   * Raised when the watcher should be removed. If an error occurs, then errorCallback must be called.
   * @since Since Chrome 45. Warning: this is the current Beta channel.
   */
  onRemoveWatcherRequested: EntryPathRecursiveRequestedEvent

  /**
   * Raised when a list of actions for a set of files or directories at
   * `entryPaths` is requested. All of the returned actions must
   * be applicable to each entry. If there are no such actions, an empty array
   * should be returned. The actions must be returned with the
   * `successCallback` call. In case of an error,
   * `errorCallback` must be called.
   */
  onGetActionsRequested: GetActionsRequested

  /**
   * Raised when executing an action for a set of files or directories is
   * requested. After the action is completed, `successCallback`
   * must be called. On error, `errorCallback` must be called.
   */
  onExecuteActionRequested: ExecuteActionRequested
}
