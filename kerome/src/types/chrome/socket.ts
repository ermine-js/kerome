/// /////////////////
// Socket
/// /////////////////

export interface CreateInfo {
  socketId: number
}

export interface AcceptInfo {
  resultCode: number
  socketId?: number | undefined
}

export interface ReadInfo {
  resultCode: number
  data: ArrayBuffer
}

export interface WriteInfo {
  bytesWritten: number
}

export interface RecvFromInfo {
  resultCode: number
  data: ArrayBuffer
  port: number
  address: string
}

export interface SocketInfo {
  socketType: string
  localPort?: number | undefined
  peerAddress?: string | undefined
  peerPort?: number | undefined
  localAddress?: string | undefined
  connected: boolean
}

export interface NetworkInterface {
  name: string
  address: string
}
export default interface _ {

  create: (type: string, options?: Object, callback?: (createInfo: CreateInfo) => void) => void

  destroy: (socketId: number) => void

  connect: (socketId: number, hostname: string, port: number, callback: (result: number) => void) => void

  bind: (socketId: number, address: string, port: number, callback: (result: number) => void) => void

  disconnect: (socketId: number) => void

  read: (socketId: number, bufferSize?: number, callback?: (readInfo: ReadInfo) => void) => void

  write: (socketId: number, data: ArrayBuffer, callback?: (writeInfo: WriteInfo) => void) => void

  recvFrom: (
    socketId: number,
    bufferSize?: number,
    callback?: (recvFromInfo: RecvFromInfo) => void,
  ) => void

  sendTo: (
    socketId: number,
    data: ArrayBuffer,
    address: string,
    port: number,
    callback?: (writeInfo: WriteInfo) => void,
  ) => void

  listen: (
    socketId: number,
    address: string,
    port: number,
    backlog?: number,
    callback?: (result: number) => void,
  ) => void

  accept: (socketId: number, callback?: (acceptInfo: AcceptInfo) => void) => void

  setKeepAlive: (
    socketId: number,
    enable: boolean,
    delay?: number,
    callback?: (result: boolean) => void,
  ) => void

  setNoDelay: (socketId: number, noDelay: boolean, callback?: (result: boolean) => void) => void

  getInfo: (socketId: number, callback: (result: SocketInfo) => void) => void

  getNetworkList: (callback: (result: NetworkInterface[]) => void) => void
}
