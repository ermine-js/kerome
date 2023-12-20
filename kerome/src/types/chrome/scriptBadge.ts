import type * as chrome from './'
/// /////////////////
// Script Badge
/// /////////////////

export interface GetPopupDetails {
  tabId: number
}

export interface AttentionDetails {
  tabId: number
}

export interface SetPopupDetails {
  tabId: number
  popup: string
}

export interface ScriptBadgeClickedEvent extends chrome.events.Event<(tab: chrome.tabs.Tab) => void> {}
export default interface _ {

  getPopup: (details: GetPopupDetails, callback: Function) => void

  getAttention: (details: AttentionDetails) => void

  setPopup: (details: SetPopupDetails) => void

  onClicked: ScriptBadgeClickedEvent
}
