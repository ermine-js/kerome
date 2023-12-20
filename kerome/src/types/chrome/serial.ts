/// /////////////////
// Serial
/// /////////////////
/**
* Use the <code>chrome.serial</code> API to read from and write to a device connected to a serial port.
* Permissions:  "enterprise.serial"
* Since: Chrome 29
* Important: This API works only on Chrome OS.
*/

export interface DeviceInfo {
  /** The device's system path. This should be passed as the path argument to chrome.serial.connect in order to connect to this device. */
  path: string
  /** Optional. A PCI or USB vendor ID if one can be determined for the underlying device. */
  vendorId?: number | undefined
  /** Optional. A USB product ID if one can be determined for the underlying device. */
  productId?: number | undefined
  /** Optional. A human-readable display name for the underlying device if one can be queried from the host driver. */
  displayName?: number | undefined
}

export interface ConnectionInfo {
  /** The id of the serial port connection. */
  connectionId?: number | undefined
  /** Flag indicating whether the connection is blocked from firing onReceive events. */
  paused: boolean
  /** See ConnectionOptions.persistent */
  persistent: boolean
  /** See ConnectionOptions.name */
  name: string
  /** See ConnectionOptions.bufferSize */
  bufferSize: number
  /** See ConnectionOptions.receiveTimeout */
  receiveTimeout?: number | undefined
  /** See ConnectionOptions.sendTimeout */
  sendTimeout?: number | undefined
  /** Optional. See ConnectionOptions.bitrate.
       * This field may be omitted or inaccurate if a non-standard bitrate is in use, or if an error occurred while querying the underlying device. */
  bitrate?: number | undefined
  /** Optional. See ConnectionOptions.dataBits. This field may be omitted if an error occurred while querying the underlying device. */
  dataBits?: typeof DataBits[keyof typeof DataBits] | undefined
  /** Optional. See ConnectionOptions.parityBit. This field may be omitted if an error occurred while querying the underlying device. */
  parityBit?: typeof ParityBit[keyof typeof ParityBit] | undefined
  /** Optional. See ConnectionOptions.stopBits. This field may be omitted if an error occurred while querying the underlying device. */
  stopBits?: typeof StopBits[keyof typeof StopBits] | undefined
  /** Optional. Flag indicating whether or not to enable RTS/CTS hardware flow control. Defaults to false. */
  ctsFlowControl?: boolean | undefined
}

export interface ConnectionOptions {
  /** Optional. Flag indicating whether or not the connection should be left open when the application is suspended (see Manage App Lifecycle: https://developer.chrome.com/apps/app_lifecycle).
       *  The default value is "false." When the application is loaded, any serial connections previously opened with persistent=true can be fetched with getConnections. */
  persistent?: boolean | undefined
  /** Optional. An application-defined string to associate with the connection. */
  name?: string | undefined
  /** Optional. The size of the buffer used to receive data. The default value is 4096. */
  bufferSize?: number | undefined
  /** Optional. The requested bitrate of the connection to be opened.
       * For compatibility with the widest range of hardware, this number should match one of commonly-available bitrates,
       * such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200.
       * There is no guarantee, of course, that the device connected to the serial port will support the requested bitrate, even if the port itself supports that bitrate.
       * 9600 will be passed by default. */
  bitrate?: number | undefined
  /** Optional. "eight" will be passed by default. */
  dataBits?: typeof DataBits[keyof typeof DataBits] | undefined
  /** Optional. "no" will be passed by default. */
  parityBit?: typeof ParityBit[keyof typeof ParityBit] | undefined
  /** Optional. "one" will be passed by default. */
  stopBits?: typeof StopBits[keyof typeof StopBits] | undefined
  /** Optional. Flag indicating whether or not to enable RTS/CTS hardware flow control. Defaults to false. */
  ctsFlowControl?: boolean | undefined
  /** Optional. The maximum amount of time (in milliseconds) to wait for new data before raising an onReceiveError event with a "timeout" error.
       * If zero, receive timeout errors will not be raised for the connection.
       * Defaults to 0. */
  receiveTimeout?: number | undefined
  /** Optional. The maximum amount of time (in milliseconds) to wait for a send operation to complete before calling the callback with a "timeout" error.
       * If zero, send timeout errors will not be triggered.
       * Defaults to 0. */
  sendTimeout?: number | undefined
}
export default interface _ {

  DataBits: {
    SEVEN: 'seven'
    EIGHT: 'eight'
  }

  ParityBit: {
    NO: 'no'
    ODD: 'odd'
    EVEN: 'even'
  }

  StopBits: {
    ONE: 'one'
    TWO: 'two'
  }

  /**
   * @since Chrome 33.
   * @description Returns information about available serial devices on the system. The list is regenerated each time this method is called.
   * @param callback Called with the list of DeviceInfo objects.
   */
  getDevices: (callback: (ports: DeviceInfo[]) => void) => void

  /**
   * @since Chrome 33.
   * @description Connects to a given serial port.
   * @param path The system path of the serial port to open.
   * @param options Port configuration options.
   * @param callback Called when the connection has been opened.
   */
  connect: (
    path: string,
    options: ConnectionOptions,
    callback: (connectionInfo: ConnectionInfo) => void,
  ) => void

  /**
   * @since Chrome 33.
   * @description Update the option settings on an open serial port connection.
   * @param connectionId The id of the opened connection.
   * @param options Port configuration options.
   * @param callback Called when the configuration has completed.
   */
  update: (connectionId: number, options: ConnectionOptions, callback: (result: boolean) => void) => void

  /**
   * @since Chrome 33.
   * @description Disconnects from a serial port.
   * @param connectionId The id of the opened connection.
   * @param callback Called when the connection has been closed.
   */
  disconnect: (connectionId: number, callback: (result: boolean) => void) => void

  /**
   * @since Chrome 33.
   * @description Pauses or unpauses an open connection.
   * @param connectionId The id of the opened connection.
   * @param paused Flag to indicate whether to pause or unpause.
   * @param callback Called when the connection has been successfully paused or unpaused.
   */
  setPaused: (connectionId: number, paused: boolean, callback: () => void) => void

  /**
   * @since Chrome 33.
   * @description Retrieves the state of a given connection.
   * @param callback Called with connection state information when available.
   */
  getInfo: (callback: (connectionInfos: ConnectionInfo[]) => void) => void

  /**
   * @since Chrome 33.
   * @description Retrieves the list of currently opened serial port connections owned by the application.
   * @param callback Called with the list of connections when available.
   */
  getConnections: (callback: (connectionInfos: ConnectionInfo[]) => void) => void

  /**
   * @since Chrome 33.
   * @description Writes data to the given connection.
   * @param connectionId The id of the connection.
   * @param data The data to send.
   * @param callback Called when the operation has completed.
   */
  send: (connectionId: number, data: ArrayBuffer, callback: (sendInfo: object) => void) => void

  /**
   * @description Flushes all bytes in the given connection's input and output buffers.
   * @param connectionId The id of the connection.
   * @param callback
   */
  flush: (connectionId: number, callback: (result: boolean) => void) => void

  /**
   * @description Retrieves the state of control signals on a given connection.
   * @param connectionId The id of the connection.
   * @param callback Called when the control signals are available.
   */
  getControlSignals: (connectionId: number, callback: (signals: object) => void) => void

  /**
   * @description Sets the state of control signals on a given connection.
   * @param connectionId The id of the connection.
   * @param signals The set of signal changes to send to the device:
   * boolean:    (optional) dtr - DTR (Data Terminal Ready).
   * boolean:    (optional) rts - RTS (Request To Send).
   * @param callback Called once the control signals have been set.
   */
  setControlSignals: (connectionId: number, signals: object, callback: (result: boolean) => void) => void

  /**
   * @since Chrome 45.
   * @description Suspends character transmission on a given connection and places the transmission line in a break state until the clearBreak is called.
   * @param connectionId The id of the connection.
   * @param callback
   */
  setBreak: (connectionId: number, callback: (result: boolean) => void) => void

  /**
   * @since Chrome 45.
   * @description Restore character transmission on a given connection and place the transmission line in a nonbreak state.
   * @param connectionId The id of the connection.
   * @param callback
   */
  clearBreak: (connectionId: number, callback: (result: boolean) => void) => void
}
