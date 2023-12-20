import type * as chrome from './'
/// /////////////////
// Omnibox
/// /////////////////
/**
* The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.
* Manifest:  "omnibox": {...}
* @since Chrome 9.
*/

/** A suggest result. */
export interface SuggestResult {
  /** The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry. */
  content: string
  /** The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. You must escape the five predefined entities to display them as text: stackoverflow.com/a/1091953/89484 */
  description: string
  /**
       * Whether the suggest result can be deleted by the user.
       * @since Chrome 63.
       */
  deletable?: boolean | undefined
}

export interface Suggestion {
  /** The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. */
  description: string
}

/** The window disposition for the omnibox query. This is the recommended context to display results. */
export type OnInputEnteredDisposition = 'currentTab' | 'newForegroundTab' | 'newBackgroundTab'

export interface OmniboxInputEnteredEvent
  extends chrome.events.Event<(text: string, disposition: OnInputEnteredDisposition) => void>
{}

export interface OmniboxInputChangedEvent
  extends chrome.events.Event<(text: string, suggest: (suggestResults: SuggestResult[]) => void) => void>
{}

export interface OmniboxInputStartedEvent extends chrome.events.Event<() => void> {}

export interface OmniboxInputCancelledEvent extends chrome.events.Event<() => void> {}

export interface OmniboxSuggestionDeletedEvent extends chrome.events.Event<(text: string) => void> {}
export default interface _ {

  /**
   * Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
   * @param suggestion A partial SuggestResult object, without the 'content' parameter.
   */
  setDefaultSuggestion: (suggestion: Suggestion) => void

  /** User has accepted what is typed into the omnibox. */
  onInputEntered: OmniboxInputEnteredEvent

  /** User has changed what is typed into the omnibox. */
  onInputChanged: OmniboxInputChangedEvent

  /** User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events. */
  onInputStarted: OmniboxInputStartedEvent

  /** User has ended the keyword input session without accepting the input. */
  onInputCancelled: OmniboxInputCancelledEvent

  /**
   * User has deleted a suggested result
   * @since Chrome 63.
   */
  onDeleteSuggestion: OmniboxSuggestionDeletedEvent
}
