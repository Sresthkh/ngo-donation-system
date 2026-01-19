"use client";

import { useEffect, useState } from "react";

type Donation = {
  _id: string;
  amount: number;
  status: "success" | "pending" | "failed";
  createdAt: string;
};

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    // 🔐 verify user + get profile
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      });

    // 💰 fetch donation history
    fetch("/api/donations/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDonations(data.donations || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p style={{ color: "white", padding: 40 }}>
        Loading dashboard...
      </p>
    );
  }

  return (
    <main style={bg}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <div>
            <h1 style={title}>User Dashboard</h1>
            <p style={subtitle}>
              Welcome back, {name}
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

        {/* USER INFO */}
        <div style={infoCard}>
          <h2 style={sectionTitle}>Your Profile</h2>

          <p>
            <strong>Name:</strong> {name}
          </p>

          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>

        {/* DONATE CTA */}
        <div style={donateCard}>
          <h2 style={sectionTitle}>Support the Cause</h2>
          <p style={{ opacity: 0.9 }}>
            Your donation helps us make a real impact.
          </p>

          <button
  style={donateBtn}
  onClick={() => {
    window.location.href = "/donate";
  }}
>
  Donate Now
</button>

        </div>

        {/* DONATION HISTORY */}
        <div style={historySection}>
          <h2 style={sectionTitle}>Donation History</h2>

          {donations.length === 0 ? (
            <p style={{ opacity: 0.7 }}>
              You have not made any donations yet.
            </p>
          ) : (
            <div style={historyGrid}>
              {donations.map((d) => (
                <div
                  key={d._id}
                  style={historyCard(d.status)}
                >
                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                    }}
                  >
                    ₹ {d.amount}
                  </p>

                  <p style={statusText(d.status)}>
                    {d.status.toUpperCase()}
                  </p>

                  <p
                    style={{
                      opacity: 0.7,
                      fontSize: "0.85rem",
                    }}
                  >
                    {new Date(d.createdAt).toDateString()}
                  </p>
                </div>
              ))}
            </div>
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
    "radial-gradient(circle at top left, #22c55e, transparent 40%), radial-gradient(circle at bottom right, #16a34a, transparent 40%), linear-gradient(135deg, #020617, #0f172a)",
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

const infoCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
  padding: 28,
  borderRadius: 24,
  marginBottom: 30,
};

const donateCard: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(34,197,94,0.35), rgba(22,163,74,0.2))",
  padding: 32,
  borderRadius: 26,
  marginBottom: 40,
};

const sectionTitle: React.CSSProperties = {
  fontSize: "1.7rem",
  fontWeight: 800,
  marginBottom: 12,
};

const donateBtn: React.CSSProperties = {
  marginTop: 18,
  padding: "14px 34px",
  borderRadius: 999,
  background: "linear-gradient(135deg,#22c55e,#4ade80)",
  border: "none",
  color: "#022c22",
  fontWeight: 800,
  fontSize: "1rem",
  cursor: "pointer",
};

const historySection: React.CSSProperties = {
  marginTop: 40,
};

const historyGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
};

const historyCard = (status: string): React.CSSProperties => ({
  background:
    status === "success"
      ? "linear-gradient(135deg, rgba(34,197,94,0.35), rgba(74,222,128,0.25))"
      : status === "pending"
      ? "linear-gradient(135deg, rgba(250,204,21,0.35), rgba(253,224,71,0.25))"
      : "linear-gradient(135deg, rgba(248,113,113,0.35), rgba(239,68,68,0.25))",
  padding: 24,
  borderRadius: 22,
  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  textAlign: "center",
});

const statusText = (status: string): React.CSSProperties => ({
  marginTop: 8,
  fontWeight: 700,
  color:
    status === "success"
      ? "#4ade80"
      : status === "pending"
      ? "#fde047"
      : "#f87171",
});
