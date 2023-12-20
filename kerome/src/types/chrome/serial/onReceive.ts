export interface OnReceiveInfo {
  /** The connection identifier. */
  connectionId: number
  /** The data received. */
  data: ArrayBuffer
}
export default interface _ {

  /**
   * @since Chrome 33.
   * @description Event raised when data has been read from the connection.
   * @param callback
   */
  addListener: (callback: (info: OnReceiveInfo) => void) => void
}
