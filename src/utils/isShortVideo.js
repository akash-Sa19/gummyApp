export function isAShortVideo(videoDuration) {
  // Define a regular expression to match ISO 8601 format
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = videoDuration.match(regex);

  if (!matches) {
    return false; // If format is incorrect, return false
  }

  // Extract the captured groups (hours, minutes, seconds)
  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseInt(matches[3]) || 0;

  // Calculate total time in seconds
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Check if total duration is less than or equal to 60 seconds
  return totalSeconds <= 60;
}
