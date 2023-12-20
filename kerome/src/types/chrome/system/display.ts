import type * as chrome from '../'
/// /////////////////
// System Display //
/// /////////////////
/**
* Use the system.display API to query display metadata.
* Permissions: 'system.display'
* @since Chrome 30.
*/

export interface Bounds {
  /**  The x-coordinate of the upper-left corner. */
  left: number
  /**  The y-coordinate of the upper-left corner. */
  top: number
  /** The width of the display in pixels. */
  width: number
  /** The height of the display in pixels. */
  height: number
}

export interface Insets {
  /** The x-axis distance from the left bound. */
  left: number
  /** The y-axis distance from the top bound. */
  top: number
  /** The x-axis distance from the right bound. */
  right: number
  /** The y-axis distance from the bottom bound. */
  bottom: number
}

/**
   * @since Chrome 57
   */
export interface Point {
  /** The x-coordinate of the point. */
  x: number
  /** The y-coordinate of the point. */
  y: number
}

/**
   * @since Chrome 57
   */
export interface TouchCalibrationPair {
  /** The coordinates of the display point. */
  displayPoint: Point
  /** The coordinates of the touch point corresponding to the display point. */
  touchPoint: Point
}

/**
   * @since Chrome 52
   */
export interface DisplayMode {
  /** The display mode width in device independent (user visible) pixels. */
  width: number

  /** The display mode height in device independent (user visible) pixels. */
  height: number

  /** The display mode width in native pixels. */
  widthInNativePixels: number

  /** The display mode height in native pixels. */
  heightInNativePixels: number

  /**
       * @deprecated Deprecated since Chrome 70. Use `displayZoomFactor`
       * @description The display mode UI scale factor.
       */
  uiScale: number

  /** The display mode device scale factor. */
  deviceScaleFactor: number

  /**
       * The display mode refresh rate in hertz.
       * @since Chrome 67
       */
  refreshRate: number

  /** True if the mode is the display's native mode. */
  isNative: boolean

  /** True if the display mode is currently selected. */
  isSelected: boolean
}

/**
   * @since Chrome 53
   */
export interface DisplayLayout {
  /** The unique identifier of the display. */
  id: string
  /** The unique identifier of the parent display. Empty if this is the root. */
  parentId: string
  /**
       * The layout position of this display relative to the parent.
       * This will be ignored for the root.
       * @see enum
       */
  position: typeof DisplayPosition[keyof typeof DisplayPosition]
  /** The offset of the display along the connected edge. 0 indicates that the topmost or leftmost corners are aligned. */
  offset: number
}

/**
   * The pairs of point used to calibrate the display.
   */
export interface TouchCalibrationPairs {
  /** First pair of touch and display point required for touch calibration. */
  pair1: TouchCalibrationPair
  /** Second pair of touch and display point required for touch calibration. */
  pair2: TouchCalibrationPair
  /** Third pair of touch and display point required for touch calibration. */
  pair3: TouchCalibrationPair
  /** Fourth pair of touch and display point required for touch calibration. */
  pair4: TouchCalibrationPair
}

/**
   * Representation of info data to be used in chrome.system.display.setDisplayProperties()
   */
export interface DisplayPropertiesInfo {
  /**
       * requires(CrOS) Chrome OS only.
       * @description
       * If set to true, changes the display mode to unified desktop.
       * If set to false, unified desktop mode will be disabled.
       * This is only valid for the primary display.
       * If provided, mirroringSourceId must not be provided and other properties may not apply.
       * This is has no effect if not provided.
       * @see `enableUnifiedDesktop` for details
       * @since Chrome 59
       */
  isUnified?: boolean | undefined

  /**
       * requires(CrOS) Chrome OS only.
       * @deprecated Deprecated since Chrome 68. Use ´setMirrorMode´
       * @see setMirrorMode
       * @description
       * If set and not empty, enables mirroring for this display.
       * Otherwise disables mirroring for this display.
       * This value should indicate the id of the source display to mirror,
       * which must not be the same as the id passed to setDisplayProperties.
       * If set, no other property may be set.
       */
  mirroringSourceId?: string | undefined

  /**
       * If set to true, makes the display primary.
       * No-op if set to false.
       */
  isPrimary?: boolean | undefined

  /**
       * If set, sets the display's overscan insets to the provided values.
       * Note that overscan values may not be negative or larger than a half of the screen's size.
       * Overscan cannot be changed on the internal monitor. It's applied after isPrimary parameter.
       */
  overscan?: Insets | undefined

  /**
       * If set, updates the display's rotation.
       * Legal values are [0, 90, 180, 270].
       * The rotation is set clockwise, relative to the display's vertical position.
       * It's applied after overscan parameter.
       */
  rotation?: 0 | 90 | 180 | 270 | undefined

  /**
       * If set, updates the display's logical bounds origin along x-axis.
       * Applied together with boundsOriginY, if boundsOriginY is set.
       * Note that, when updating the display origin, some constraints will be applied,
       * so the final bounds origin may be different than the one set.
       * The final bounds can be retrieved using getInfo. The bounds origin is applied
       * after rotation. The bounds origin cannot be changed on the primary display.
       * Note that is also invalid to set bounds origin values if isPrimary is also set
       * (as isPrimary parameter is applied first).
       */
  boundsOriginX?: number | undefined

  /**
       * If set, updates the display's logical bounds origin along y-axis.
       * @see boundsOriginX
       */
  boundsOriginY?: number | undefined

  /**
       * If set, updates the display mode to the mode matching this value.
       * @since Chrome 52
       */
  displayMode?: DisplayMode | undefined

  /**
       * @since Chrome 65.
       * @description
       * If set, updates the zoom associated with the display.
       * This zoom performs re-layout and repaint thus resulting
       * in a better quality zoom than just performing
       * a pixel by pixel stretch enlargement.
       */
  displayZoomFactor?: number | undefined
}

/**
   * Options affecting how the information is returned.
   * @since Chrome 59
   */
export interface DisplayInfoFlags {
  /**
       * If set to true, only a single DisplayUnitInfo will be returned by getInfo when in unified desktop mode.
       * @see enableUnifiedDesktop
       * @default false
       */
  singleUnified?: boolean | undefined
}

/** Information about display properties. */
export interface DisplayInfo {
  /** The unique identifier of the display. */
  id: string
  /** The user-friendly name (e.g. 'HP LCD monitor'). */
  name: string
  /**
       * requires(CrOS Kiosk app) Only available in Chrome OS Kiosk apps
       */
  edid?: {
    /**
           * 3 character manufacturer code.
           */
    manufacturerId: string
    /**
           * 2 byte manufacturer-assigned code.
           */
    productId: string
    /**
           * Year of manufacturer.
           */
    yearOfManufacture?: string | undefined
  } | undefined
  /**
       * requires(CrOS) Only working properly on Chrome OS.
       * Identifier of the display that is being mirrored on the display unit.
       * If mirroring is not in progress, set to an empty string
       * Currently exposed only on ChromeOS.
       * Will be empty string on other platforms.
       */
  mirroringSourceId: string
  /**
       * requires(CrOS) Only available on Chrome OS.
       * Identifiers of the displays to which the source display is being mirrored.
       * Empty if no displays are being mirrored. This will be set to the same value
       * for all displays.
       * ❗ This must not include *mirroringSourceId*. ❗
       */
  mirroringDestinationIds: string[]
  /** True if this is the primary display. */
  isPrimary: boolean
  /** True if this is an internal display. */
  isInternal: boolean
  /** True if this display is enabled. */
  isEnabled: boolean
  /** The number of pixels per inch along the x-axis. */
  dpiX: number
  /** The number of pixels per inch along the y-axis. */
  dpiY: number
  /** The display's clockwise rotation in degrees relative to the vertical position. Currently exposed only on ChromeOS. Will be set to 0 on other platforms. */
  rotation: number
  /** The display's logical bounds. */
  bounds: Bounds
  /** The display's insets within its screen's bounds. Currently exposed only on ChromeOS. Will be set to empty insets on other platforms. */
  overscan: Insets
  /** The usable work area of the display within the display bounds. The work area excludes areas of the display reserved for OS, for example taskbar and launcher. */
  workArea: Bounds
  /**
       * requires(CrOS) Only available on Chrome OS.
       * The list of available display modes.
       * The current mode will have isSelected=true.
       * Only available on Chrome OS.
       * Will be set to an empty array on other platforms.
       */
  modes: DisplayMode[]
  /** True if this display has a touch input device associated with it. */
  hasTouchSupport: boolean
  /** A list of zoom factor values that can be set for the display. */
  availableDisplayZoomFactors: number[]
  /**
       * The ratio between the display's current and default zoom.
       * For example, value 1 is equivalent to 100% zoom, and value 1.5 is equivalent to 150% zoom.
       */
  displayZoomFactor: number
}

export interface MirrorModeInfo {
  /**
       * The mirror mode that should be set.
       * **off**
       * Use the default mode (extended or unified desktop).
       * **normal**
       * The default source display will be mirrored to all other displays.
       * **mixed**
       * The specified source display will be mirrored to the provided destination displays. All other connected displays will be extended.
       */
  mode?: 'off' | 'normal' | 'mixed' | undefined
}

export interface MirrorModeInfoMixed extends MirrorModeInfo {
  mode: 'mixed'
  mirroringSourceId?: string | undefined
  /** The ids of the mirroring destination displays. */
  mirroringDestinationIds?: string[] | undefined
}
export default interface _ {

  DisplayPosition: {
    TOP: 'top'
    RIGHT: 'right'
    BOTTOM: 'bottom'
    LEFT: 'left'
  }

  MirrorMode: {
    OFF: 'off'
    NORMAL: 'normal'
    MIXED: 'mixed'
  }

  /**
   * Requests the information for all attached display devices.
   * @param callback The callback to invoke with the results.
   */
  getInfo: ((callback: (info: DisplayInfo[]) => void) => void) & (() => Promise<DisplayInfo[]>) & ((flags: DisplayInfoFlags, callback: (info: DisplayInfo[]) => void) => void) & ((flags: DisplayInfoFlags) => Promise<DisplayInfo[]>)

  /**
   * requires(CrOS Kiosk apps | WebUI) This is only available to Chrome OS Kiosk apps and Web UI.
   * @description Requests the layout info for all displays.
   * @since Chrome 53
   * @param callback The callback to invoke with the results.
   */
  getDisplayLayout: ((callback: (layouts: DisplayLayout[]) => void) => void) & (() => Promise<DisplayLayout[]>)

  /**
   * requires(CrOS Kiosk apps | WebUI) This is only available to Chrome OS Kiosk apps and Web UI.
   * @description
   * Updates the properties for the display specified by **id**,
   * according to the information provided in **info**.
   * On failure, runtime.lastError will be set.
   * @param id The display's unique identifier.
   * @param info The information about display properties that should be changed. A property will be changed only if a new value for it is specified in |info|.
   * @return The `setDisplayProperties` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters. To find out whether the function succeeded, runtime.lastError should be queried.
   */
  setDisplayProperties: ((id: string, info: DisplayPropertiesInfo) => Promise<void>) & ((id: string, info: DisplayPropertiesInfo, callback: () => void) => void)

  /**
   * requires(CrOS Kiosk apps | WebUI) This is only available to Chrome OS Kiosk apps and Web UI.
   * @description
   * Set the layout for all displays.
   * Any display not included will use the default layout.
   * If a layout would overlap or be otherwise invalid it will be adjusted to a valid layout.
   * After layout is resolved, an onDisplayChanged event will be triggered.
   * @since Chrome 53
   * @param layouts The layout information, required for all displays except the primary display.
   * @return The `setDisplayLayout` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters. To find out whether the function succeeded, runtime.lastError should be queried.
   */
  setDisplayLayout: ((layouts: DisplayLayout[]) => Promise<void>) & ((layouts: DisplayLayout[], callback: () => void) => void)

  /**
   * requires(CrOS Kiosk apps | WebUI) This is only available to Chrome OS Kiosk apps and Web UI.
   * @description
   * Enables/disables the unified desktop feature.
   * Note that this simply enables the feature, but will not change the actual desktop mode.
   * (That is, if the desktop is in mirror mode, it will stay in mirror mode)
   * @since Chrome 46
   * @param enabled True if unified desktop should be enabled.
   */
  enableUnifiedDesktop: (enabled: boolean) => void

  /**
   * Starts overscan calibration for a display.
   * This will show an overlay on the screen indicating the current overscan insets.
   * If overscan calibration for display **id** is in progress this will reset calibration.
   * @since Chrome 53
   * @param id The display's unique identifier.
   */
  overscanCalibrationStart: (id: string) => void

  /**
   * Adjusts the current overscan insets for a display.
   * Typically this should etiher move the display along an axis (e.g. left+right have the same value)
   * or scale it along an axis (e.g. top+bottom have opposite values).
   * Each Adjust call is cumulative with previous calls since Start.
   * @since Chrome 53
   * @param id The display's unique identifier.
   * @param delta The amount to change the overscan insets.
   */
  overscanCalibrationAdjust: (id: string, delta: Insets) => void

  /**
   * Resets the overscan insets for a display to the last saved value (i.e before Start was called).
   * @since Chrome 53
   * @param id The display's unique identifier.
   */
  overscanCalibrationReset: (id: string) => void

  /**
   * Complete overscan adjustments for a display by saving the current values and hiding the overlay.
   * @since Chrome 53
   * @param id The display's unique identifier.
   */
  overscanCalibrationComplete: (id: string) => void

  /**
   * Displays the native touch calibration UX for the display with **id** as display id.
   * This will show an overlay on the screen with required instructions on how to proceed.
   * The callback will be invoked in case of successful calibraion only.
   * If the calibration fails, this will throw an error.
   * @since Chrome 57
   * @param id The display's unique identifier.
   * @param callback Optional callback to inform the caller that the touch calibration has ended. The argument of the callback informs if the calibration was a success or not.
   */
  showNativeTouchCalibration: ((id: string, callback: (success: boolean) => void) => void) & ((id: string) => Promise<boolean>)

  /**
   * Starts custom touch calibration for a display.
   * This should be called when using a custom UX for collecting calibration data.
   * If another touch calibration is already in progress this will throw an error.
   * @since Chrome 57
   * @param id The display's unique identifier.
   */
  startCustomTouchCalibration: (id: string) => void

  /**
   * Sets the touch calibration pairs for a display.
   * These **pairs** would be used to calibrate the touch screen for display with **id** called in startCustomTouchCalibration().
   * Always call **startCustomTouchCalibration** before calling this method.
   * If another touch calibration is already in progress this will throw an error.
   * @since Chrome 57
   * @param pairs The pairs of point used to calibrate the display.
   * @param bounds Bounds of the display when the touch calibration was performed. |bounds.left| and |bounds.top| values are ignored.
   * @throws Error
   */
  completeCustomTouchCalibration: (pairs: TouchCalibrationPairs, bounds: Bounds) => void

  /**
   * Resets the touch calibration for the display and brings it back to its default state by clearing any touch calibration data associated with the display.
   * @since Chrome 57
   * @param id The display's unique identifier.
   */
  clearTouchCalibration: (id: string) => void

  /**
   * requires(CrOS Kiosk app) Chrome OS Kiosk apps only
   * @since Chrome 65.
   * @description
   * Sets the display mode to the specified mirror mode.
   * Each call resets the state from previous calls.
   * Calling setDisplayProperties() will fail for the
   * mirroring destination displays.
   */
  setMirrorMode: ((info: MirrorModeInfo | MirrorModeInfoMixed, callback: () => void) => void) & ((info: MirrorModeInfo | MirrorModeInfoMixed) => Promise<void>)

  /**
   * Fired when anything changes to the display configuration.
   */
  onDisplayChanged: chrome.events.Event<() => void>
}
