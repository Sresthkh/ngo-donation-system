"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalRegistrations: number;
  totalDonations: number;
  pendingPayments: number;
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [stats, setStats] = useState<Stats>({
    totalRegistrations: 0,
    totalDonations: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    // 🔐 verify admin
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.role !== "admin") {
          window.location.href = "/auth/login";
          return;
        }
        setEmail(data.email);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      });

    // 📊 load dashboard stats
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalRegistrations: data.totalRegistrations,
          totalDonations: data.totalDonations,
          pendingPayments: data.pendingPayments,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p style={{ color: "white", padding: 40 }}>
        Loading admin dashboard...
      </p>
    );
  }

  return (
    <main style={bg}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <div>
            <h1 style={title}>Admin Dashboard</h1>
            <p style={subtitle}>
              Logged in as <strong>{email}</strong>
            </p>
          </div>

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

        {/* ADMIN STATS */}
        <div style={statsGrid}>
          <StatCard
            title="Total Registrations"
            value={stats.totalRegistrations.toString()}
            color="#60a5fa"
          />
          <StatCard
            title="Total Donations (₹)"
            value={stats.totalDonations.toString()}
            color="#34d399"
          />
          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments.toString()}
            color="#facc15"
          />
        </div>

        {/* ADMIN ACTIONS */}
        <div style={actionsCard}>
          <h2 style={sectionTitle}>Admin Actions</h2>

          <div style={actionGrid}>
            <ActionButton
              label="View Users"
              onClick={() => window.location.href = "/admin/users"}
            />
            <ActionButton
              label="View Donations"
              onClick={() => window.location.href = "/admin/donations"}
            />
            
          </div>
        </div>

        {/* INFO NOTE */}
        <div style={infoNote}>
          <p>
            This dashboard enables administrators to track registrations and
            donations with complete transparency. All user data is stored
            independently of donation outcomes, ensuring ethical handling of
            payments and records.
          </p>
        </div>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
        padding: 28,
        borderRadius: 24,
        borderLeft: `6px solid ${color}`,
      }}
    >
      <p style={{ opacity: 0.8 }}>{title}</p>
      <h3 style={{ fontSize: "2.2rem", fontWeight: 800 }}>
        {value}
      </h3>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      style={{
        padding: "14px 24px",
        borderRadius: 18,
        background:
          "linear-gradient(135deg,#6366f1,#8b5cf6)",
        color: "white",
        border: "none",
        fontWeight: 700,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* ================= STYLES ================= */

const bg: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, #6366f1, transparent 40%), radial-gradient(circle at bottom right, #8b5cf6, transparent 40%), linear-gradient(135deg, #020617, #0f172a)",
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
  flexWrap: "wrap",
  gap: 20,
  marginBottom: 40,
};

const title: React.CSSProperties = {
  fontSize: "3rem",
  fontWeight: 900,
};

const subtitle: React.CSSProperties = {
  marginTop: 6,
  opacity: 0.85,
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

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
  marginBottom: 40,
};

const actionsCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
  padding: 32,
  borderRadius: 26,
  marginBottom: 30,
};

const sectionTitle: React.CSSProperties = {
  fontSize: "1.7rem",
  fontWeight: 800,
  marginBottom: 20,
};

const actionGrid: React.CSSProperties = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
};

const infoNote: React.CSSProperties = {
  marginTop: 20,
  opacity: 0.8,
  fontSize: "0.95rem",
};
