type Status = "pending" | "success" | "failed";

export default function StatusBadge({ status }: { status: Status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700",
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
