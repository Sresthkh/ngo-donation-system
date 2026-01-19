"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      if (data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={authBg}>
      <div style={card}>
        <h1 style={title}>Welcome Back</h1>

        <p style={subtitle}>
          Login to continue supporting the NGO.
        </p>

        {error && <p style={errorText}>{error}</p>}

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={primaryBtn}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={bottomText}>
          Don&apos;t have an account?{" "}
          <span
            style={loginLink}
            onClick={() => (window.location.href = "/auth/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const authBg: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, #dc2626, transparent 40%), radial-gradient(circle at bottom right, #f87171, transparent 40%), linear-gradient(135deg, #020617, #0f172a)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  color: "white",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 480,
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(16px)",
  padding: 36,
  borderRadius: 24,
};

const title: React.CSSProperties = {
  fontSize: "2.4rem",
  fontWeight: 800,
};

const subtitle: React.CSSProperties = {
  marginTop: 8,
  opacity: 0.85,
};

const errorText: React.CSSProperties = {
  marginTop: 14,
  color: "#fca5a5",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 14,
  marginTop: 16,
  borderRadius: 14,
  border: "none",
  outline: "none",
};

const primaryBtn: React.CSSProperties = {
  marginTop: 26,
  width: "100%",
  padding: 14,
  borderRadius: 16,
  background: "linear-gradient(135deg,#dc2626,#f87171)", // 🔴 RED ACCENT
  color: "white",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const bottomText: React.CSSProperties = {
  marginTop: 22,
  textAlign: "center",
  opacity: 0.9,
};

const loginLink: React.CSSProperties = {
  color: "#f87171",
  cursor: "pointer",
  fontWeight: 600,
};
