/**
 * Validate audio file extension
 * @param filename Name of the file
 * @returns true if valid audio extension
 */
export function isValidAudioFile(filename: string): boolean {
  const allowedExtensions = ['.wav', '.mp3']
  const ext = '.' + filename.split('.').pop()?.toLowerCase()
  return allowedExtensions.includes(ext)
}
