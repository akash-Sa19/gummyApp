export function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B"; // Convert to Billions (e.g. 1.2B)
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Convert to Millions (e.g. 2M)
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Convert to Thousands (e.g. 1K)
  }
  return num.toString(); // If less than 1000, return the original number
}
