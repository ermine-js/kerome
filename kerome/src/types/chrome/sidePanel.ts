/// /////////////////
// SidePanel
/// /////////////////
/**
* Availability: @since Chrome 114. Manifest v3.
* https://developer.chrome.com/docs/extensions/reference/sidePanel/
* Permissions: "sidePanel"
*/

export interface GetPanelOptions {
  tabId?: number
}

export interface PanelBehavior {
  openPanelOnActionClick?: boolean
}

export interface PanelOptions {
  enabled?: boolean
  path?: string
  tabId?: number
}

export interface SidePanel {
  default_path: string
}
export default interface _ {

  getOptions: (
    options: GetPanelOptions,
    callback?: (options: PanelOptions) => void,
  ) => Promise<PanelOptions>

  getPanelBehavior: (callback?: (behavior: PanelBehavior) => void) => Promise<PanelBehavior>

  setOptions: (options: PanelOptions, callback?: () => void) => Promise<void>

  setPanelBehavior: (behavior: PanelBehavior, callback?: () => void) => Promise<void>
}
