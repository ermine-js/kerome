import type * as chrome from './'
/// /////////////////
// Text to Speech Engine
/// /////////////////
/**
* Use the chrome.ttsEngine API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the tts API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.
* Permissions:  "ttsEngine"
* @since Chrome 14.
*/

export interface SpeakOptions {
  /** Optional. The language to be used for synthesis, in the form language-region. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'. */
  lang?: string | undefined
  /** Optional. The name of the voice to use for synthesis. */
  voiceName?: string | undefined
  /**
       * Optional. Gender of voice for synthesized speech.
       * One of: "male", or "female"
       */
  gender?: string | undefined
  /** Optional. Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0. */
  volume?: number | undefined
  /**
       * Optional.
       * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. This value is guaranteed to be between 0.1 and 10.0, inclusive. When a voice does not support this full range of rates, don't return an error. Instead, clip the rate to the range the voice supports.
       */
  rate?: number | undefined
  /** Optional. Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to this voice's default pitch. */
  pitch?: number | undefined
}

export interface TtsEngineSpeakEvent extends
  chrome.events.Event<
  (utterance: string, options: SpeakOptions, sendTtsEvent: (event: chrome.tts.TtsEvent) => void) => void
  >
{}
export default interface _ {

  /** Called when the user makes a call to tts.speak() and one of the voices from this extension's manifest is the first to match the options object. */
  onSpeak: TtsEngineSpeakEvent

  /** Fired when a call is made to tts.stop and this extension may be in the middle of speaking. If an extension receives a call to onStop and speech is already stopped, it should do nothing (not raise an error). If speech is in the paused state, this should cancel the paused state. */
  onStop: chrome.events.Event<() => void>

  /**
   * Optional: if an engine supports the pause event, it should pause the current utterance being spoken, if any, until it receives a resume event or stop event. Note that a stop event should also clear the paused state.
   * @since Chrome 29.
   */
  onPause: chrome.events.Event<() => void>

  /**
   * Optional: if an engine supports the pause event, it should also support the resume event, to continue speaking the current utterance, if any. Note that a stop event should also clear the paused state.
   * @since Chrome 29.
   */
  onResume: chrome.events.Event<() => void>
}
