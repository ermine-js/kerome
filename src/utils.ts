import { ExtensionRuntime } from "./types"

export const detectRuntime = (): ExtensionRuntime => {
  // detect current runtime, webpage / content script / background script / devtools page / sandbox page

  // TODO: implement detectRuntime
  // background

  // default
  return ExtensionRuntime.External
}