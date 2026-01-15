export default function Stars({ value }) {
  const full = Math.round(value || 0);
  return <span>{"⭐".repeat(full)}</span>;
}
