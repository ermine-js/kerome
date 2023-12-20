import type * as chrome from '../'
/// /////////////////
// Dev Tools - Panels
/// /////////////////
/**
* Use the chrome.devtools.panels API to integrate your extension into Developer Tools window UI: create your own panels, access existing panels, and add sidebars.
* Availability: Since Chrome 18.
*/

export interface PanelShownEvent extends chrome.events.Event<(window: Window) => void> {}

export interface PanelHiddenEvent extends chrome.events.Event<() => void> {}

export interface PanelSearchEvent extends chrome.events.Event<(action: string, queryString?: string) => void> {}

/** Represents a panel created by extension. */
export interface ExtensionPanel {
  /**
       * Appends a button to the status bar of the panel.
       * @param iconPath Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed.
       * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
       * @param disabled Whether the button is disabled.
       */
  createStatusBarButton: (iconPath: string, tooltipText: string, disabled: boolean) => Button
  /** Fired when the user switches to the panel. */
  onShown: PanelShownEvent
  /** Fired when the user switches away from the panel. */
  onHidden: PanelHiddenEvent
  /** Fired upon a search action (start of a new search, search result navigation, or search being canceled). */
  onSearch: PanelSearchEvent
}

export interface ButtonClickedEvent extends chrome.events.Event<() => void> {}

/** A button created by the extension. */
export interface Button {
  /**
       * Updates the attributes of the button. If some of the arguments are omitted or null, the corresponding attributes are not updated.
       * @param iconPath Path to the new icon of the button.
       * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
       * @param disabled Whether the button is disabled.
       */
  update: (iconPath?: string | null, tooltipText?: string | null, disabled?: boolean | null) => void
  /** Fired when the button is clicked. */
  onClicked: ButtonClickedEvent
}

export interface SelectionChangedEvent extends chrome.events.Event<() => void> {}

/** Represents the Elements panel. */
export interface ElementsPanel {
  /**
       * Creates a pane within panel's sidebar.
       * @param title Text that is displayed in sidebar caption.
       * @param callback A callback invoked when the sidebar is created.
       */
  createSidebarPane: (
    title: string,
    callback?: (
      /** An ExtensionSidebarPane object for created sidebar pane */
      result: ExtensionSidebarPane,
    ) => void,
  ) => void
  /** Fired when an object is selected in the panel. */
  onSelectionChanged: SelectionChangedEvent
}

/**
   * Since Chrome 41.
   * Represents the Sources panel.
   */
export interface SourcesPanel {
  /**
       * Creates a pane within panel's sidebar.
       * @param title Text that is displayed in sidebar caption.
       * @param callback A callback invoked when the sidebar is created.
       */
  createSidebarPane: (
    title: string,
    callback?: (
      /** An ExtensionSidebarPane object for created sidebar pane. */
      result: ExtensionSidebarPane,
    ) => void,
  ) => void
  /** Fired when an object is selected in the panel. */
  onSelectionChanged: SelectionChangedEvent
}

export interface ExtensionSidebarPaneShownEvent
  extends chrome.events.Event<(window: chrome.windows.Window) => void>
{}

export interface ExtensionSidebarPaneHiddenEvent extends chrome.events.Event<() => void> {}

/** A sidebar created by the extension. */
export interface ExtensionSidebarPane {
  /**
       * Sets the height of the sidebar.
       * @param height A CSS-like size specification, such as '100px' or '12ex'.
       */
  setHeight: (height: string) => void
  /**
       * Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.
       * @param expression An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.
       * @param rootTitle An optional title for the root of the expression tree.
       * @param callback A callback invoked after the sidebar pane is updated with the expression evaluation results.
       */
  setExpression: ((expression: string, rootTitle?: string, callback?: () => void) => void) & ((expression: string, callback?: () => void) => void)
  /**
       * Sets a JSON-compliant object to be displayed in the sidebar pane.
       * @param jsonObject An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).
       * @param rootTitle An optional title for the root of the expression tree.
       * @param callback A callback invoked after the sidebar is updated with the object.
       */
  setObject: ((jsonObject: Object, rootTitle?: string, callback?: () => void) => void) & ((jsonObject: Object, callback?: () => void) => void)
  /**
       * Sets an HTML page to be displayed in the sidebar pane.
       * @param path Relative path of an extension page to display within the sidebar.
       */
  setPage: (path: string) => void
  /** Fired when the sidebar pane becomes visible as a result of user switching to the panel that hosts it. */
  onShown: ExtensionSidebarPaneShownEvent
  /** Fired when the sidebar pane becomes hidden as a result of the user switching away from the panel that hosts the sidebar pane. */
  onHidden: ExtensionSidebarPaneHiddenEvent
}
export default interface _ {

  /** Elements panel. */
  elements: ElementsPanel

  /**
   * Since Chrome 38.
   * Sources panel.
   */
  sources: SourcesPanel

  /**
   * Creates an extension panel.
   * @param title Title that is displayed next to the extension icon in the Developer Tools toolbar.
   * @param iconPath Path of the panel's icon relative to the extension directory.
   * @param pagePath Path of the panel's HTML page relative to the extension directory.
   * @param callback A function that is called when the panel is created.
   * Parameter panel: An ExtensionPanel object representing the created panel.
   */
  create: (
    title: string,
    iconPath: string,
    pagePath: string,
    callback?: (panel: ExtensionPanel) => void,
  ) => void

  /**
   * Specifies the function to be called when the user clicks a resource link in the Developer Tools window. To unset the handler, either call the method with no parameters or pass null as the parameter.
   * @param callback A function that is called when the user clicks on a valid resource link in Developer Tools window. Note that if the user clicks an invalid URL or an XHR, this function is not called.
   * Parameter resource: A devtools.inspectedWindow.Resource object for the resource that was clicked.
   */
  setOpenResourceHandler: (
    callback?: (resource: chrome.devtools.inspectedWindow.Resource) => void,
  ) => void

  /**
   * Since Chrome 38.
   * Requests DevTools to open a URL in a Developer Tools panel.
   * @param url The URL of the resource to open.
   * @param lineNumber Specifies the line number to scroll to when the resource is loaded.
   * @param callback A function that is called when the resource has been successfully loaded.
   */
  openResource: ((url: string, lineNumber: number, callback?: () => void) => void) & ((
    url: string,
    lineNumber: number,
    columnNumber: number,
    callback?: (response: unknown) => unknown,
  ) => void)

  /**
   * @since Chrome 59.
   * The name of the color theme set in user's DevTools settings.
   */
  themeName: 'default' | 'dark'
}
