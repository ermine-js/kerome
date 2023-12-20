/// /////////////////
// System CPU
/// /////////////////
/**
* Use the system.cpu API to query CPU metadata.
* Permissions: "system.cpu"
* @since Chrome 32.
*/

export interface ProcessorUsage {
  /** The cumulative time used by userspace programs on this processor. */
  user: number
  /** The cumulative time used by kernel programs on this processor. */
  kernel: number
  /** The cumulative time spent idle by this processor. */
  idle: number
  /** The total cumulative time for this processor. This value is equal to user + kernel + idle. */
  total: number
}

export interface ProcessorInfo {
  /** Cumulative usage info for this logical processor. */
  usage: ProcessorUsage
}

export interface CpuInfo {
  /** The number of logical processors. */
  numOfProcessors: number
  /** The architecture name of the processors. */
  archName: string
  /** The model name of the processors. */
  modelName: string
  /**
       * A set of feature codes indicating some of the processor's capabilities.
       * The currently supported codes are "mmx", "sse", "sse2", "sse3", "ssse3", "sse4_1", "sse4_2", and "avx".
       */
  features: string[]
  /** Information about each logical processor. */
  processors: ProcessorInfo[]
}
export default interface _ {

  /** Queries basic CPU information of the system. */
  getInfo: ((callback: (info: CpuInfo) => void) => void) & (() => Promise<CpuInfo>)
}
