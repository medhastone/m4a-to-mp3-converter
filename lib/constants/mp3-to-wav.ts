export interface FaqItem {
  question: string;
  answer: string;
}

export const MP3_TO_WAV_FAQS: FaqItem[] = [
  {
    question: 'How to turn MP3 to WAV without losing quality?',
    answer:
      'To turn MP3 to WAV without generational quality loss, our in-browser tool decompresses the lossy MPEG-1 Layer III audio stream into raw uncompressed 16-bit or 24-bit Linear PCM audio samples. While the conversion cannot restore harmonic frequencies discarded during the initial lossy MP3 compression, transcoding to WAV prevents any further compression artifacts during mixing, timeline editing, and audio plugin mastering in your DAW.',
  },
  {
    question: 'Does converting an MP3 to a WAV file improve its sound quality?',
    answer:
      'In pure psychoacoustics, converting an MP3 to a WAV file does not artificially restore high-frequency spectral information above the MP3 low-pass cutoff (typically 16 kHz to 20 kHz). However, converting to uncompressed WAV format significantly improves production performance: it eliminates decoder jitter, eliminates CPU decoding latency, and prevents compounding generational loss when adding EQ, compression, saturation, and reverb plugins.',
  },
  {
    question: 'Can I convert MP3 to 24 bit WAV for music production?',
    answer:
      'Yes. Our online MP3 to WAV converter provides dedicated studio options to convert MP3 to 24 bit WAV (and 32-bit float). Exporting in 24-bit Linear PCM offers 144 dB of theoretical dynamic range, ensuring seamless timeline drop-in compatibility with modern digital audio workstations like FL Studio, Ableton Live, Logic Pro, and Pro Tools without sample format mismatch warnings.',
  },
  {
    question: 'Is this MP3 to WAV freeware safe for confidential client audio?',
    answer:
      'Yes, 100%. When you convert MP3 to WAV freeware using our client-side WebAssembly engine, no audio data is transmitted over the network. Unlike conventional cloud converters (CloudConvert, Zamzar) that transfer your tracks to third-party cloud servers, our in-browser tool operates entirely inside your local device memory (RAM), guaranteeing complete privacy for commercial client recordings, voice memos, and unreleased stems.',
  },
  {
    question: 'Can I mass convert MP3 to WAV in bulk for free?',
    answer:
      'Yes. You can mass convert MP3 to WAV batches simultaneously. There are zero file size caps, no daily conversion limits, and no email sign-up gates. Drag and drop dozens of audio stems or voice tracks, configure your desired bit depth, and download individual files or a single bundled ZIP archive in seconds.',
  },
  {
    question: 'Why is the converted WAV file so much larger than the original MP3?',
    answer:
      'An MP3 file uses perceptual psychoacoustic coding to shrink audio data down to 128 kbps – 320 kbps (roughly 2.4 MB per minute). When you convert file to WAV format, the audio stream is decompressed into uncompressed Linear PCM at 1,411 kbps (for 16-bit / 44.1 kHz) or up to 4,608 kbps (for 24-bit / 96 kHz), requiring approximately 10.5 MB per minute of audio. This larger footprint delivers sample-accurate precision and zero-latency playback.',
  },
];
