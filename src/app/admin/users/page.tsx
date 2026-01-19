"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // 🔽 EXPORT USERS CSV
  const handleExportUsers = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/admin/users/export", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users.csv";
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

    fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      roleFilter === "all" || u.role === roleFilter;

    return matchSearch && matchRole;
  });

  if (loading) {
    return (
      <p style={{ color: "white", padding: 40 }}>
        Loading users...
      </p>
    );
  }

  return (
    <main style={bg}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h1 style={title}>Registered Users</h1>

          <div style={{ display: "flex", gap: 12 }}>
            <button style={exportBtn} onClick={handleExportUsers}>
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

        {/* SEARCH + FILTER */}
        <div style={filterRow}>
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={select}
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* TABLE */}
        <div style={tableCard}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
                <th style={th}>Registered On</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td style={td}>{u.name}</td>
                  <td style={{ ...td, opacity: 0.85 }}>{u.email}</td>
                  <td style={td}>
                    <span style={roleText(u.role)}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ ...td, opacity: 0.7 }}>
                    {new Date(u.createdAt).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p style={{ opacity: 0.7, paddingTop: 20 }}>
              No users match the current filters.
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
  maxWidth: 1200,
  margin: "0 auto",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
  flexWrap: "wrap",
  gap: 12,
};

const title: React.CSSProperties = {
  fontSize: "2.6rem",
  fontWeight: 800,
};

const filterRow: React.CSSProperties = {
  display: "flex",
  gap: 14,
  marginBottom: 24,
  flexWrap: "wrap",
};

const searchInput: React.CSSProperties = {
  flex: 1,
  minWidth: 240,
  padding: 12,
  borderRadius: 12,
  border: "none",
};

const select: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "none",
};

const logoutBtn: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: 16,
  background: "transparent",
  border: "1px solid #f87171",
  color: "#f87171",
  fontWeight: 600,
  cursor: "pointer",
};

const exportBtn: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: 16,
  background: "transparent",
  border: "1px solid #4ade80",
  color: "#4ade80",
  fontWeight: 600,
  cursor: "pointer",
};

const tableCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
  borderRadius: 22,
  overflowX: "auto",
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 14px",
  textAlign: "center",
};

const th: React.CSSProperties = {
  padding: "14px 28px",
  fontWeight: 700,
  opacity: 0.8,
};

const td: React.CSSProperties = {
  padding: "16px 28px",
};

const roleText = (role: string): React.CSSProperties => ({
  fontWeight: 800,
  letterSpacing: "0.04em",
  color: role === "admin" ? "#fde047" : "#4ade80",
});
