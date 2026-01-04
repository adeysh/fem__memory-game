export default function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins)}:${String(secs).padStart(2, "0")}`;
}
