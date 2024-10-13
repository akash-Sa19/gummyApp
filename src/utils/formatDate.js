export function formatDate(isoDateStr) {
  const date = new Date(isoDateStr);

  // Format the date to the desired format
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
