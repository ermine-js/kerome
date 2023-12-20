/// /////////////////
// Text to Speech
/// /////////////////
/**
* Use the chrome.tts API to play synthesized text-to-speech (TTS). See also the related ttsEngine API, which allows an extension to implement a speech engine.
* Permissions:  "tts"
* @since Chrome 14.
*/

/** An event from the TTS engine to communicate the status of an utterance. */
export interface TtsEvent {
  /** Optional. The index of the current character in the utterance. */
  charIndex?: number | undefined
  /** Optional. The error description, if the event type is 'error'. */
  errorMessage?: string | undefined
  /**
       * The length of the next part of the utterance.
       * For example, in a word event, this is the length of the word which will be spoken next.
       * It will be set to -1 if not set by the speech engine.
       */
  length?: number | undefined
  /**
       * The type can be 'start' as soon as speech has started, 'word' when a word boundary is reached, 'sentence' when a sentence boundary is reached, 'marker' when an SSML mark element is reached, 'end' when the end of the utterance is reached, 'interrupted' when the utterance is stopped or interrupted before reaching the end, 'cancelled' when it's removed from the queue before ever being synthesized, or 'error' when any other error occurs. When pausing speech, a 'pause' event is fired if a particular utterance is paused in the middle, and 'resume' if an utterance resumes speech. Note that pause and resume events may not fire if speech is paused in-between utterances.
       * One of: "start", "end", "word", "sentence", "marker", "interrupted", "cancelled", "error", "pause", or "resume"
       */
  type:
  | 'start'
  | 'end'
  | 'word'
  | 'sentence'
  | 'marker'
  | 'interrupted'
  | 'cancelled'
  | 'error'
  | 'pause'
  | 'resume'
}

/** A description of a voice available for speech synthesis. */
export interface TtsVoice {
  /** Optional. The language that this voice supports, in the form language-region. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'. */
  lang?: string | undefined
  /**
       * Optional. This voice's gender.
       * One of: "male", or "female"
       * @deprecated since Chrome 70. Gender is deprecated and will be ignored.
       */
  gender?: string | undefined
  /** Optional. The name of the voice. */
  voiceName?: string | undefined
  /** Optional. The ID of the extension providing this voice. */
  extensionId?: string | undefined
  /** Optional. All of the callback event types that this voice is capable of sending. */
  eventTypes?: string[] | undefined
  /**
       * Optional. If true, the synthesis engine is a remote network resource. It may be higher latency and may incur bandwidth costs.
       * @since Chrome 33.
       */
  remote?: boolean | undefined
}

export interface SpeakOptions {
  /** Optional. Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0. */
  volume?: number | undefined
  /**
       * Optional.
       * If true, enqueues this utterance if TTS is already in progress. If false (the default), interrupts any current speech and flushes the speech queue before speaking this new utterance.
       */
  enqueue?: boolean | undefined
  /**
       * Optional.
       * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10.0 are strictly disallowed, but many voices will constrain the minimum and maximum rates further—for example a particular voice may not actually speak faster than 3 times normal even if you specify a value larger than 3.0.
       */
  rate?: number | undefined
  /**
       * Optional. This function is called with events that occur in the process of speaking the utterance.
       * @param event The update event from the text-to-speech engine indicating the status of this utterance.
       */
  onEvent?: ((event: TtsEvent) => void) | undefined
  /**
       * Optional.
       * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to a voice's default pitch.
       */
  pitch?: number | undefined
  /** Optional. The language to be used for synthesis, in the form language-region. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'. */
  lang?: string | undefined
  /** Optional. The name of the voice to use for synthesis. If empty, uses any available voice. */
  voiceName?: string | undefined
  /** Optional. The extension ID of the speech engine to use, if known. */
  extensionId?: string | undefined
  /**
       * Optional. Gender of voice for synthesized speech.
       * One of: "male", or "female"
       */
  gender?: string | undefined
  /** Optional. The TTS event types the voice must support. */
  requiredEventTypes?: string[] | undefined
  /** Optional. The TTS event types that you are interested in listening to. If missing, all event types may be sent. */
  desiredEventTypes?: string[] | undefined
}
export default interface _ {

  /** Checks whether the engine is currently speaking. On Mac OS X, the result is true whenever the system speech engine is speaking, even if the speech wasn't initiated by Chrome. */
  isSpeaking: (callback?: (speaking: boolean) => void) => void

  /** Stops any current speech and flushes the queue of any pending utterances. In addition, if speech was paused, it will now be un-paused for the next call to speak. */
  stop: () => void

  /** Gets an array of all available voices. */
  getVoices: (() => Promise<TtsVoice[]>) & ((callback?: (voices: TtsVoice[]) => void) => void)

  /**
   * Speaks text using a text-to-speech engine.
   * @param utterance The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters.
   * @param callback Optional. Called right away, before speech finishes. Check chrome.runtime.lastError to make sure there were no errors. Use options.onEvent to get more detailed feedback.
   */
  speak: ((utterance: string, callback?: Function) => void) & ((utterance: string, options: SpeakOptions, callback?: Function) => void)

  /**
   * Pauses speech synthesis, potentially in the middle of an utterance. A call to resume or stop will un-pause speech.
   * @since Chrome 29.
   */
  pause: () => void

  /**
   * If speech was paused, resumes speaking where it left off.
   * @since Chrome 29.
   */
  resume: () => void
}
