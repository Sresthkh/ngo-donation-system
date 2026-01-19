"use client";

import { useEffect, useState } from "react";

type Donation = {
  _id: string;
  amount: number;
  status: "success" | "pending" | "failed";
  createdAt: string;
  userId: {
    name: string;
    email: string;
  };
};

export default function AdminDonationsPage() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // export csv
  const handleExport = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/admin/donations/export", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "donations.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch("/api/admin/donations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDonations(data.donations || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredDonations = donations.filter((d) => {
    const matchSearch =
      d.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.userId?.email?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || d.status === statusFilter;

    const matchMin =
      minAmount === "" || d.amount >= Number(minAmount);

    const matchMax =
      maxAmount === "" || d.amount <= Number(maxAmount);

    return matchSearch && matchStatus && matchMin && matchMax;
  });

  if (loading) {
    return (
      <p style={{ color: "white", padding: 40 }}>
        Loading donations...
      </p>
    );
  }

  return (
    <main style={bg}>
      <div style={container}>
        {/* PAGE HEADER */}
        <div style={pageHeader}>
          <div>
            <h1 style={title}>Donations</h1>
            <p style={subtitle}>
              Monitor all donation transactions and payment statuses
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button style={exportBtn} onClick={handleExport}>
              Export CSV
            </button>

            <button
              style={logoutBtn}
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* FILTER CARD */}
        <div style={filterCard}>
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={select}
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <input
            type="number"
            placeholder="Min ₹"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            style={amountInput}
          />

          <input
            type="number"
            placeholder="Max ₹"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            style={amountInput}
          />
        </div>

        {/* TABLE CARD */}
        <div style={tableCard}>
          <table style={table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredDonations.map((d) => (
                <tr key={d._id}>
                  <td>{d.userId?.name || "—"}</td>
                  <td style={{ opacity: 0.85 }}>
                    {d.userId?.email || "—"}
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    ₹ {d.amount}
                  </td>
                  <td>
                    <span style={statusBadge(d.status)}>
                      {d.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ opacity: 0.7 }}>
                    {new Date(d.createdAt).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDonations.length === 0 && (
            <p style={{ padding: 20, opacity: 0.7 }}>
              No donations match the selected filters.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const bg: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, #1e3a8a, transparent 40%)," +
    "radial-gradient(circle at bottom right, #312e81, transparent 40%)," +
    "linear-gradient(135deg, #020617, #0f172a)",
  padding: "70px 24px",
  color: "white",
};


const container: React.CSSProperties = {
  maxWidth: 1300,
  margin: "0 auto",
};

const pageHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexWrap: "wrap",
  gap: 16,
  marginBottom: 32,
};

const title: React.CSSProperties = {
  fontSize: "2.6rem",
  fontWeight: 800,
};

const subtitle: React.CSSProperties = {
  marginTop: 6,
  opacity: 0.75,
};

const filterCard: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(14px)",
  padding: 20,
  borderRadius: 18,
  marginBottom: 28,
};

const searchInput: React.CSSProperties = {
  flex: 1,
  minWidth: 220,
  padding: 12,
  borderRadius: 10,
  border: "none",
};

const select: React.CSSProperties = {
  padding: 12,
  borderRadius: 10,
  border: "none",
};

const amountInput: React.CSSProperties = {
  width: 120,
  padding: 12,
  borderRadius: 10,
  border: "none",
};

const tableCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(14px)",
  borderRadius: 20,
  overflowX: "auto",
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
};

const logoutBtn: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: 14,
  background: "transparent",
  border: "1px solid #f87171",
  color: "#f87171",
  fontWeight: 600,
  cursor: "pointer",
};

const exportBtn: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: 14,
  background: "transparent",
  border: "1px solid #4ade80",
  color: "#4ade80",
  fontWeight: 600,
  cursor: "pointer",
};

const statusBadge = (status: string): React.CSSProperties => ({
  fontSize: "0.8rem",
  fontWeight: 800,
  letterSpacing: "0.04em",
  color:
    status === "success"
      ? "#4ade80"
      : status === "pending"
      ? "#fde047"
      : "#f87171",
});
