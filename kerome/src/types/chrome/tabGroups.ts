import type * as chrome from './'
/// /////////////////
// Tab Groups
/// /////////////////
/**
* Use the chrome.tabGroups API to interact with the browser's tab grouping system. You can use this API to modify and rearrange tab groups in the browser. To group and ungroup tabs, or to query what tabs are in groups, use the chrome.tabs API.
* Permissions:  "tabGroups"
* @since Chrome 89. Manifest V3 and above.
*/

export type ColorEnum = 'grey' | 'blue' | 'red' | 'yellow' | 'green' | 'pink' | 'purple' | 'cyan' | 'orange'

export interface TabGroup {
  /** Whether the group is collapsed. A collapsed group is one whose tabs are hidden. */
  collapsed: boolean
  /** The group's color. */
  color: ColorEnum
  /** The ID of the group. Group IDs are unique within a browser session. */
  id: number
  /** Optional. The title of the group. */
  title?: string | undefined
  /** The ID of the window that contains the group. */
  windowId: number
}

export interface MoveProperties {
  /** The position to move the group to. Use -1 to place the group at the end of the window. */
  index: number
  /** Optional. The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with chrome.windows.WindowType type "normal". */
  windowId?: number | undefined
}

export interface QueryInfo {
  /** Optional. Whether the groups are collapsed. */
  collapsed?: boolean | undefined
  /** Optional. The color of the groups. */
  color?: ColorEnum | undefined
  /** Optional. Match group titles against a pattern. */
  title?: string | undefined
  /** Optional. The ID of the window that contains the group. */
  windowId?: number | undefined
}

export interface UpdateProperties {
  /** Optional. Whether the group should be collapsed. */
  collapsed?: boolean | undefined
  /** Optional. The color of the group. */
  color?: ColorEnum | undefined
  /** Optional. The title of the group. */
  title?: string | undefined
}

export interface TabGroupCreatedEvent extends chrome.events.Event<(group: TabGroup) => void> {}

export interface TabGroupMovedEvent extends chrome.events.Event<(group: TabGroup) => void> {}

export interface TabGroupRemovedEvent extends chrome.events.Event<(group: TabGroup) => void> {}

export interface TabGroupUpdated extends chrome.events.Event<(group: TabGroup) => void> {}
export default interface _ {

  /** An ID that represents the absence of a group. */
  TAB_GROUP_ID_NONE: -1

  /**
   * Retrieves details about the specified group.
   * @param groupId The ID of the tab group.
   * @param callback Called with the retrieved tab group.
   */
  get: ((groupId: number, callback: (group: TabGroup) => void) => void) & ((groupId: number) => Promise<TabGroup>)

  /**
   * Moves the group and all its tabs within its window, or to a new window.
   * @param groupId The ID of the group to move.
   * @param moveProperties Information on how to move the group.
   * @return The `move` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  move: ((groupId: number, moveProperties: MoveProperties) => Promise<TabGroup>) & ((groupId: number, moveProperties: MoveProperties, callback: (group: TabGroup) => void) => void)

  /**
   * Gets all groups that have the specified properties, or all groups if no properties are specified.
   * @param queryInfo Object with search parameters.
   * @param callback Called with retrieved tab groups.
   */
  query: ((queryInfo: QueryInfo, callback: (result: TabGroup[]) => void) => void) & ((queryInfo: QueryInfo) => Promise<TabGroup[]>)

  /**
   * Modifies the properties of a group. Properties that are not specified in updateProperties are not modified.
   * @param groupId The ID of the group to modify.
   * @param updateProperties Information on how to update the group.
   * @return The `update` method provides its result via callback or returned as a `Promise` (MV3 only).
   */
  update: ((groupId: number, updateProperties: UpdateProperties) => Promise<TabGroup>) & ((
    groupId: number,
    updateProperties: UpdateProperties,
    callback: (group: TabGroup) => void,
  ) => void)

  /** Fired when a group is created. */
  onCreated: TabGroupCreatedEvent

  /** Fired when a group is moved within a window. Move events are still fired for the individual tabs within the group, as well as for the group itself. This event is not fired when a group is moved between windows; instead, it will be removed from one window and created in another. */
  onMoved: TabGroupMovedEvent

  /** Fired when a group is closed, either directly by the user or automatically because it contained zero. */
  onRemoved: TabGroupRemovedEvent

  /** Fired when a group is updated. */
  onUpdated: TabGroupUpdated
}
