// Client-side video compressor placeholder
// Dashboard imports `{ compressVideoNative }` from this file.
// For now this is a safe passthrough implementation so the
// upload flow works even if native compression isn't available.

export async function compressVideoNative(file) {
  // If you want to implement real client-side compression,
  // replace this with ffmpeg.wasm or MediaRecorder-based logic.
  return file;
}

export default compressVideoNative;
