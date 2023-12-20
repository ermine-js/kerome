import type * as chrome from './'
/// /////////////////
// Bookmarks
/// /////////////////
/**
* Use the chrome.bookmarks API to create, organize, and otherwise manipulate bookmarks. Also see Override Pages, which you can use to create a custom Bookmark Manager page.
* Availability: Since Chrome 5.
* Permissions:  "bookmarks"
*/

/** A node (either a bookmark or a folder) in the bookmark tree. Child nodes are ordered within their parent folder. */
export interface BookmarkTreeNode {
  /** Optional. The 0-based position of this node within its parent folder.  */
  index?: number | undefined
  /** Optional. When this node was created, in milliseconds since the epoch (new Date(dateAdded)).  */
  dateAdded?: number | undefined
  /** The text displayed for the node. */
  title: string
  /** Optional. The URL navigated to when a user clicks the bookmark. Omitted for folders.   */
  url?: string | undefined
  /** Optional. When the contents of this folder last changed, in milliseconds since the epoch.   */
  dateGroupModified?: number | undefined
  /** The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted.  */
  id: string
  /** Optional. The id of the parent folder. Omitted for the root node.   */
  parentId?: string | undefined
  /** Optional. An ordered list of children of this node.  */
  children?: BookmarkTreeNode[] | undefined
  /**
       * Optional.
       * Since Chrome 37.
       * Indicates the reason why this node is unmodifiable. The managed value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default).
       */
  unmodifiable?: 'managed' | undefined
}

export interface BookmarkRemoveInfo {
  index: number
  parentId: string
  node: BookmarkTreeNode
}

export interface BookmarkMoveInfo {
  index: number
  oldIndex: number
  parentId: string
  oldParentId: string
}

export interface BookmarkChangeInfo {
  url?: string | undefined
  title: string
}

export interface BookmarkReorderInfo {
  childIds: string[]
}

export interface BookmarkRemovedEvent
  extends chrome.events.Event<(id: string, removeInfo: BookmarkRemoveInfo) => void>
{}

export interface BookmarkImportEndedEvent extends chrome.events.Event<() => void> {}

export interface BookmarkMovedEvent extends chrome.events.Event<(id: string, moveInfo: BookmarkMoveInfo) => void> {}

export interface BookmarkImportBeganEvent extends chrome.events.Event<() => void> {}

export interface BookmarkChangedEvent
  extends chrome.events.Event<(id: string, changeInfo: BookmarkChangeInfo) => void>
{}

export interface BookmarkCreatedEvent
  extends chrome.events.Event<(id: string, bookmark: BookmarkTreeNode) => void>
{}

export interface BookmarkChildrenReordered
  extends chrome.events.Event<(id: string, reorderInfo: BookmarkReorderInfo) => void>
{}

export interface BookmarkSearchQuery {
  query?: string | undefined
  url?: string | undefined
  title?: string | undefined
}

export interface BookmarkCreateArg {
  /** Optional. Defaults to the Other Bookmarks folder.  */
  parentId?: string | undefined
  index?: number | undefined
  title?: string | undefined
  url?: string | undefined
}

export interface BookmarkDestinationArg {
  parentId?: string | undefined
  index?: number | undefined
}

export interface BookmarkChangesArg {
  title?: string | undefined
  url?: string | undefined
}
export default interface _ {

  /** @deprecated since Chrome 38. Bookmark write operations are no longer limited by Chrome. */
  MAX_WRITE_OPERATIONS_PER_HOUR: number

  /** @deprecated since Chrome 38. Bookmark write operations are no longer limited by Chrome. */
  MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number

  /**
   * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
   * @param query A string of words and quoted phrases that are matched against bookmark URLs and titles.
   */
  search: ((query: string, callback: (results: BookmarkTreeNode[]) => void) => void) & ((query: string) => Promise<BookmarkTreeNode[]>) & ((query: BookmarkSearchQuery, callback: (results: BookmarkTreeNode[]) => void) => void) & ((query: BookmarkSearchQuery) => Promise<BookmarkTreeNode[]>)

  /**
   * Retrieves the entire Bookmarks hierarchy.
   */
  getTree: ((callback: (results: BookmarkTreeNode[]) => void) => void) & (() => Promise<BookmarkTreeNode[]>)

  /**
   * Retrieves the recently added bookmarks.
   * @param numberOfItems The maximum number of items to return.
   */
  getRecent: ((numberOfItems: number, callback: (results: BookmarkTreeNode[]) => void) => void) & ((numberOfItems: number) => Promise<BookmarkTreeNode[]>)

  /**
   * Retrieves the specified BookmarkTreeNode.
   * @param id A single string-valued id
   */
  get: ((id: string, callback: (results: BookmarkTreeNode[]) => void) => void) & ((id: string) => Promise<BookmarkTreeNode[]>) & ((idList: string[], callback: (results: BookmarkTreeNode[]) => void) => void) & ((idList: string[]) => Promise<BookmarkTreeNode[]>)

  /**
   * Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.
   * @return The `create` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  create: ((bookmark: BookmarkCreateArg) => Promise<BookmarkTreeNode>) & ((bookmark: BookmarkCreateArg, callback: (result: BookmarkTreeNode) => void) => void)

  /**
   * Moves the specified BookmarkTreeNode to the provided location.
   * @return The `move` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  move: ((
    id: string,
    destination: BookmarkDestinationArg,
  ) => Promise<BookmarkTreeNode>) & ((
    id: string,
    destination: BookmarkDestinationArg,
    callback: (result: BookmarkTreeNode) => void,
  ) => void)

  /**
   * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. Note: Currently, only 'title' and 'url' are supported.
   * @return The `update` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  update: ((
    id: string,
    changes: BookmarkChangesArg,
  ) => Promise<BookmarkTreeNode>) & ((
    id: string,
    changes: BookmarkChangesArg,
    callback: (result: BookmarkTreeNode) => void,
  ) => void)

  /**
   * Removes a bookmark or an empty bookmark folder.
   * @return The `remove` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  remove: ((id: string) => Promise<void>) & ((id: string, callback: Function) => void)

  /**
   * Retrieves the children of the specified BookmarkTreeNode id.
   */
  getChildren: ((id: string, callback: (results: BookmarkTreeNode[]) => void) => void) & ((id: string) => Promise<BookmarkTreeNode[]>)

  /**
   * Since Chrome 14.
   * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
   * @param id The ID of the root of the subtree to retrieve.
   */
  getSubTree: ((id: string, callback: (results: BookmarkTreeNode[]) => void) => void) & ((id: string) => Promise<BookmarkTreeNode[]>)

  /**
   * Recursively removes a bookmark folder.
   * @return The `removeTree` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
   */
  removeTree: ((id: string) => Promise<void>) & ((id: string, callback: Function) => void)

  /** Fired when a bookmark or folder is removed. When a folder is removed recursively, a single notification is fired for the folder, and none for its contents. */
  onRemoved: BookmarkRemovedEvent

  /** Fired when a bookmark import session is ended. */
  onImportEnded: BookmarkImportEndedEvent

  /** Fired when a bookmark import session is begun. Expensive observers should ignore onCreated updates until onImportEnded is fired. Observers should still handle other notifications immediately. */
  onImportBegan: BookmarkImportBeganEvent

  /** Fired when a bookmark or folder changes. Note: Currently, only title and url changes trigger this. */
  onChanged: BookmarkChangedEvent

  /** Fired when a bookmark or folder is moved to a different parent folder. */
  onMoved: BookmarkMovedEvent

  /** Fired when a bookmark or folder is created. */
  onCreated: BookmarkCreatedEvent

  /** Fired when the children of a folder have changed their order due to the order being sorted in the UI. This is not called as a result of a move(). */
  onChildrenReordered: BookmarkChildrenReordered
}
