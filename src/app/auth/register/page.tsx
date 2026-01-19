"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // ONLY BACKEND-STORED FIELDS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Name, email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/auth/login");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={bg}>
      <div style={card}>
        <h1 style={title}>Create Your Account</h1>

        <p style={subtitle}>
          Register to support an NGO.  
          Your registration is saved even without donation.
        </p>

        {error && <p style={errorText}>{error}</p>}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

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
          onClick={handleRegister}
          disabled={loading}
          style={primaryBtn}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p style={bottomText}>
          Already have an account?{" "}
          <span
            style={loginLink}
            onClick={() => router.push("/auth/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const bg: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, #f97316, transparent 40%), radial-gradient(circle at bottom right, #fb923c, transparent 40%), linear-gradient(135deg, #020617, #0f172a)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 24px",
  color: "white",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 460,
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(16px)",
  padding: 36,
  borderRadius: 24,
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
};

const title: React.CSSProperties = {
  fontSize: "2.4rem",
  fontWeight: 800,
};

const subtitle: React.CSSProperties = {
  marginTop: 10,
  fontSize: "1rem",
  opacity: 0.9,
  lineHeight: 1.5,
};

const errorText: React.CSSProperties = {
  marginTop: 14,
  color: "#f87171",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 14,
  marginTop: 16,
  borderRadius: 14,
  border: "none",
  outline: "none",
  fontSize: "1rem",
};

const primaryBtn: React.CSSProperties = {
  marginTop: 28,
  width: "100%",
  padding: 14,
  borderRadius: 18,
  background: "linear-gradient(135deg,#f97316,#fb923c)", // ORANGE ACCENT
  color: "white",
  border: "none",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
};

const bottomText: React.CSSProperties = {
  marginTop: 22,
  textAlign: "center",
  opacity: 0.9,
};

const loginLink: React.CSSProperties = {
  color: "#fdba74", // soft orange
  cursor: "pointer",
  fontWeight: 600,
};
