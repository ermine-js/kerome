import type * as chrome from '../'
/// /////////////////
// Input - IME
/// /////////////////
/**
* Use the chrome.input.ime API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.
* Permissions:  "input"
* @since Chrome 21.
*/

/** See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent */
export interface KeyboardEvent {
  /**
       * Optional.
       * Whether or not the SHIFT key is pressed.
       */
  shiftKey?: boolean | undefined
  /**
       * Optional.
       * Whether or not the ALT key is pressed.
       */
  altKey?: boolean | undefined
  /**
       * Optional.
       * Whether or not the ALTGR key is pressed.
       * @since Chrome 79.
       */
  altgrKey?: boolean | undefined
  /**
       * Optional.
       * The ID of the request. Use the requestId param from the onKeyEvent event instead.
       * @deprecated since Chrome 79.
       */
  requestId?: string | undefined
  /** Value of the key being pressed */
  key: string
  /**
       * Optional.
       * Whether or not the CTRL key is pressed.
       */
  ctrlKey?: boolean | undefined
  /** One of keyup or keydown. */
  type: string
  /**
       * Optional.
       * The extension ID of the sender of this keyevent.
       * @since Chrome 34.
       */
  extensionId?: string | undefined
  /**
       * Optional.
       * Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state.
       * @since Chrome 26.
       */
  code: string
  /**
       * Optional.
       * The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed.
       * @since Chrome 37.
       */
  keyCode?: number | undefined
  /**
       * Optional.
       * Whether or not the CAPS_LOCK is enabled.
       * @since Chrome 29.
       */
  capsLock?: boolean | undefined
}

/**
   * The auto-capitalize type of the text field.
   * @since Chrome 69.
   */
export type AutoCapitalizeType = 'characters' | 'words' | 'sentences'

/** Describes an input Context */
export interface InputContext {
  /** This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called. */
  contextID: number
  /** Type of value this text field edits, (Text, Number, URL, etc) */
  type: string
  /**
       * Whether the text field wants auto-correct.
       * @since Chrome 40.
       */
  autoCorrect: boolean
  /**
       * Whether the text field wants auto-complete.
       * @since Chrome 40.
       */
  autoComplete: boolean
  /**
       * Whether the text field wants spell-check.
       * @since Chrome 40.
       */
  spellCheck: boolean
  /**
       * The auto-capitalize type of the text field.
       * @since Chrome 69.
       */
  autoCapitalize: AutoCapitalizeType
  /**
       * Whether text entered into the text field should be used to improve typing suggestions for the user.
       * @since Chrome 68.
       */
  shouldDoLearning: boolean
}

/**
   * A menu item used by an input method to interact with the user from the language menu.
   * @since Chrome 30.
   */
export interface MenuItem {
  /** String that will be passed to callbacks referencing this MenuItem. */
  id: string
  /** Optional. Text displayed in the menu for this item. */
  label?: string | undefined
  /** Optional. The type of menu item. */
  style?: string | undefined
  /** Optional. Indicates this item is visible. */
  visible?: boolean | undefined
  /** Indicates this item should be drawn with a check. */
  checked?: boolean | undefined
  /** Indicates this item is enabled. */
  enabled?: boolean | undefined
}

export interface ImeParameters {
  /** MenuItems to use. */
  items: MenuItem[]
  /** ID of the engine to use */
  engineID: string
}

export interface CommitTextParameters {
  /** The text to commit */
  text: string
  /** ID of the context where the text will be committed */
  contextID: number
}

export interface CandidateUsage {
  /** The title string of details description. */
  title: string
  /** The body string of detail description. */
  body: string
}

export interface CandidateTemplate {
  /** The candidate */
  candidate: string
  /** The candidate's id */
  id: number
  /**
       * Optional.
       * The id to add these candidates under
       */
  parentId?: number | undefined
  /**
       * Optional.
       * Short string displayed to next to the candidate, often the shortcut key or index
       */
  label?: string | undefined
  /**
       * Optional.
       * Additional text describing the candidate
       */
  annotation?: string | undefined
  /**
       * Optional.
       * The usage or detail description of word.
       */
  usage?: CandidateUsage | undefined
}

export interface CandidatesParameters {
  /** ID of the context that owns the candidate window. */
  contextID: number
  /** List of candidates to show in the candidate window */
  candidates: CandidateTemplate[]
}

export interface CompositionParameterSegment {
  /** Index of the character to start this segment at */
  start: number
  /** Index of the character to end this segment after. */
  end: number
  /** The type of the underline to modify this segment. */
  style: string
}

export interface CompositionParameters {
  /** ID of the context where the composition text will be set */
  contextID: number
  /** Text to set */
  text: string
  /** Optional. List of segments and their associated types. */
  segments?: CompositionParameterSegment[] | undefined
  /** Position in the text of the cursor. */
  cursor: number
  /** Optional. Position in the text that the selection starts at. */
  selectionStart?: number | undefined
  /** Optional. Position in the text that the selection ends at. */
  selectionEnd?: number | undefined
}

export interface MenuItemParameters {
  items: Object[]
  engineId: string
}

/** Type of the assistive window. */
export type AssistiveWindowType = 'undo'

/** ID of a button in an assistive window. */
export type AssistiveWindowButton = 'undo' | 'addToDictionary'

/** Properties of an assistive window. */
export interface AssistiveWindowProperties {
  type: AssistiveWindowType
  visible: boolean
  announceString?: string | undefined
}

export interface CandidateWindowParameterProperties {
  /**
       * Optional.
       * True to show the cursor, false to hide it.
       */
  cursorVisible?: boolean | undefined
  /**
       * Optional.
       * True if the candidate window should be rendered vertical, false to make it horizontal.
       */
  vertical?: boolean | undefined
  /**
       * Optional.
       * The number of candidates to display per page.
       */
  pageSize?: number | undefined
  /**
       * Optional.
       * True to display the auxiliary text, false to hide it.
       */
  auxiliaryTextVisible?: boolean | undefined
  /**
       * Optional.
       * Text that is shown at the bottom of the candidate window.
       */
  auxiliaryText?: string | undefined
  /**
       * Optional.
       * True to show the Candidate window, false to hide it.
       */
  visible?: boolean | undefined
  /**
       * Optional.
       * Where to display the candidate window.
       * @since Chrome 28.
       */
  windowPosition?: string | undefined
  /**
       * Optional.
       * The index of the current chosen candidate out of total candidates.
       * @since Chrome 84.
       */
  currentCandidateIndex?: number | undefined
  /**
       * Optional.
       * The total number of candidates for the candidate window.
       * @since Chrome 84.
       */
  totalCandidates?: number | undefined
}

export interface CandidateWindowParameter {
  /** ID of the engine to set properties on. */
  engineID: string
  properties: CandidateWindowParameterProperties
}

export interface ClearCompositionParameters {
  /** ID of the context where the composition will be cleared */
  contextID: number
}

export interface CursorPositionParameters {
  /** ID of the candidate to select. */
  candidateID: number
  /** ID of the context that owns the candidate window. */
  contextID: number
}

export interface SendKeyEventParameters {
  /** ID of the context where the key events will be sent, or zero to send key events to non-input field. */
  contextID: number
  /** Data on the key event. */
  keyData: KeyboardEvent[]
}

export interface DeleteSurroundingTextParameters {
  /** ID of the engine receiving the event. */
  engineID: string
  /** ID of the context where the surrounding text will be deleted. */
  contextID: number
  /** The offset from the caret position where deletion will start. This value can be negative. */
  offset: number
  /** The number of characters to be deleted */
  length: number
}

export interface SurroundingTextInfo {
  /** The text around cursor. */
  text: string
  /** The ending position of the selection. This value indicates caret position if there is no selection. */
  focus: number
  /** The beginning position of the selection. This value indicates caret position if is no selection. */
  anchor: number
}

export interface AssistiveWindowButtonClickedDetails {
  /** The ID of the button clicked. */
  buttonID: AssistiveWindowButton
  /** The type of the assistive window. */
  windowType: AssistiveWindowType
}

export interface BlurEvent extends chrome.events.Event<(contextID: number) => void> {}

export interface AssistiveWindowButtonClickedEvent
  extends chrome.events.Event<(details: AssistiveWindowButtonClickedDetails) => void>
{}

export interface CandidateClickedEvent
  extends chrome.events.Event<(engineID: string, candidateID: number, button: string) => void>
{}

export interface KeyEventEvent
  extends chrome.events.Event<(engineID: string, keyData: KeyboardEvent, requestId: string) => void>
{}

export interface DeactivatedEvent extends chrome.events.Event<(engineID: string) => void> {}

export interface InputContextUpdateEvent extends chrome.events.Event<(context: InputContext) => void> {}

export interface ActivateEvent extends chrome.events.Event<(engineID: string, screen: string) => void> {}

export interface FocusEvent extends chrome.events.Event<(context: InputContext) => void> {}

export interface MenuItemActivatedEvent extends chrome.events.Event<(engineID: string, name: string) => void> {}

export interface SurroundingTextChangedEvent
  extends chrome.events.Event<(engineID: string, surroundingInfo: SurroundingTextInfo) => void>
{}

export interface InputResetEvent extends chrome.events.Event<(engineID: string) => void> {}
export default interface _ {

  /**
   * Adds the provided menu items to the language menu when this IME is active.
   */
  setMenuItems: (parameters: ImeParameters, callback?: () => void) => void

  /**
   * Commits the provided text to the current input.
   * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.
   */
  commitText: (parameters: CommitTextParameters, callback?: (success: boolean) => void) => void

  /**
   * Sets the current candidate list. This fails if this extension doesn't own the active IME
   * @param callback Called when the operation completes.
   */
  setCandidates: (parameters: CandidatesParameters, callback?: (success: boolean) => void) => void

  /**
   * Set the current composition. If this extension does not own the active IME, this fails.
   * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.
   */
  setComposition: (parameters: CompositionParameters, callback?: (success: boolean) => void) => void

  /**
   * Updates the state of the MenuItems specified
   * @param callback Called when the operation completes
   */
  updateMenuItems: (parameters: MenuItemParameters, callback?: () => void) => void

  /**
   * Shows/Hides an assistive window with the given properties.
   * @param parameters
   * @param callback Called when the operation completes.
   */
  setAssistiveWindowProperties: (
    parameters: {
      contextID: number
      properties: chrome.input.ime.AssistiveWindowProperties
    },
    callback?: (success: boolean) => void,
  ) => void

  /**
   * Highlights/Unhighlights a button in an assistive window.
   * @param parameters
   * @param callback Called when the operation completes. On failure, chrome.runtime.lastError is set.
   */
  setAssistiveWindowButtonHighlighted: (
    parameters: {
      contextID: number
      buttonID: chrome.input.ime.AssistiveWindowButton
      windowType: chrome.input.ime.AssistiveWindowType
      announceString?: string | undefined
      highlighted: boolean
    },
    callback?: () => void,
  ) => void

  /**
   * Sets the properties of the candidate window. This fails if the extension doesn't own the active IME
   * @param callback Called when the operation completes.
   */
  setCandidateWindowProperties: (
    parameters: CandidateWindowParameter,
    callback?: (success: boolean) => void,
  ) => void

  /**
   * Clear the current composition. If this extension does not own the active IME, this fails.
   * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.
   */
  clearComposition: (
    parameters: ClearCompositionParameters,
    callback?: (success: boolean) => void,
  ) => void

  /**
   * Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.
   * @param callback Called when the operation completes
   */
  setCursorPosition: (
    parameters: CursorPositionParameters,
    callback?: (success: boolean) => void,
  ) => void

  /**
   * Sends the key events. This function is expected to be used by virtual keyboards. When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.
   * @since Chrome 33.
   * @param callback Called when the operation completes.
   */
  sendKeyEvents: (parameters: SendKeyEventParameters, callback?: () => void) => void

  /**
   * Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing.
   * @since Chrome 34.
   */
  hideInputView: () => void

  /**
   * Deletes the text around the caret.
   * @since Chrome 27.
   */
  deleteSurroundingText: (parameters: DeleteSurroundingTextParameters, callback?: () => void) => void

  /**
   * Indicates that the key event received by onKeyEvent is handled. This should only be called if the onKeyEvent listener is asynchronous.
   * @since Chrome 25.
   * @param requestId Request id of the event that was handled. This should come from keyEvent.requestId
   * @param response True if the keystroke was handled, false if not
   */
  keyEventHandled: (requestId: string, response: boolean) => void

  /** This event is sent when focus leaves a text box. It is sent to all extensions that are listening to this event, and enabled by the user. */
  onBlur: BlurEvent

  /** This event is sent when a button in an assistive window is clicked. */
  onAssistiveWindowButtonClicked: AssistiveWindowButtonClickedEvent

  /** This event is sent if this extension owns the active IME. */
  onCandidateClicked: CandidateClickedEvent

  /** This event is sent if this extension owns the active IME. */
  onKeyEvent: KeyEventEvent

  /** This event is sent when an IME is deactivated. It signals that the IME will no longer be receiving onKeyPress events. */
  onDeactivated: DeactivatedEvent

  /** This event is sent when the properties of the current InputContext change, such as the type. It is sent to all extensions that are listening to this event, and enabled by the user. */
  onInputContextUpdate: InputContextUpdateEvent

  /** This event is sent when an IME is activated. It signals that the IME will be receiving onKeyPress events. */
  onActivate: ActivateEvent

  /** This event is sent when focus enters a text box. It is sent to all extensions that are listening to this event, and enabled by the user. */
  onFocus: FocusEvent

  /** Called when the user selects a menu item */
  onMenuItemActivated: MenuItemActivatedEvent

  /**
   * Called when the editable string around caret is changed or when the caret position is moved. The text length is limited to 100 characters for each back and forth direction.
   * @since Chrome 27.
   */
  onSurroundingTextChanged: SurroundingTextChangedEvent

  /**
   * This event is sent when chrome terminates ongoing text input session.
   * @since Chrome 29.
   */
  onReset: InputResetEvent
}
