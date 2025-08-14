export const formatLastSeen = (lastSeen) => {
  const now = new Date();
  const seenTime = new Date(lastSeen);
  console.log(seenTime);
  const diffMs = now - seenTime;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMinutes < 1) return "Last seen recently";
  if (diffMinutes < 60)
    return `Last seen ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `Last seen ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7)
    return `Last seen ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffWeeks < 5)
    return `Last seen ${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  return `Last seen ${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
};
