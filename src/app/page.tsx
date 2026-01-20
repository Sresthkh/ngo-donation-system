"use client";

import { useRouter } from "next/navigation";

export default function AuthLandingPage() {
  const router = useRouter();

  return (
    <div style={bg}>
      {/* HERO SECTION */}
      <div style={container}>
        <h1 style={title}>
          Join a Cause. <br /> Make an Impact.
        </h1>

        <p style={subtitle}>
          This platform allows you to register with an NGO and optionally
          donate. Your registration is always saved — even if a donation
          is not completed.
        </p>

        <div style={ctaRow}>
          <button
            style={primaryBtn}
            onClick={() => router.push("/auth/register")}
          >
            Get Started
          </button>

          <button
            style={secondaryBtn}
            onClick={() => router.push("/auth/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* INFO SECTION */}
      <div style={infoGrid}>
        <InfoCard
          title="Independent Registration"
          text="Your data is stored safely even if you choose not to donate."
        />
        <InfoCard
          title="Transparent Donations"
          text="All donation attempts are tracked with clear success, pending or failed states."
        />
        <InfoCard
          title="Ethical Payment Handling"
          text="No fake or forced payment success is used in this system."
        />
        <InfoCard
          title="Admin Accountability"
          text="Admins can monitor registrations and donation records accurately."
        />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div style={card}>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 600 }}>
        {title}
      </h3>
      <p style={{ marginTop: 10, opacity: 0.85 }}>
        {text}
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const bg: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, #9333ea, transparent 40%), radial-gradient(circle at bottom right, #fb7185, transparent 40%), linear-gradient(135deg, #020617, #0f172a)",
  color: "white",
  padding: "80px 24px",
};

const container: React.CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  textAlign: "center",
};

const title: React.CSSProperties = {
  fontSize: "3.2rem",
  fontWeight: 800,
  lineHeight: 1.1,
};

const subtitle: React.CSSProperties = {
  marginTop: 20,
  fontSize: "1.2rem",
  opacity: 0.9,
};

const ctaRow: React.CSSProperties = {
  marginTop: 40,
  display: "flex",
  justifyContent: "center",
  gap: 20,
  flexWrap: "wrap",
};

const primaryBtn: React.CSSProperties = {
  padding: "14px 32px",
  borderRadius: 18,
  background: "linear-gradient(135deg,#6366f1,#ec4899)",
  color: "white",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "1rem",
};

const secondaryBtn: React.CSSProperties = {
  padding: "14px 32px",
  borderRadius: 18,
  background: "transparent",
  color: "white",
  border: "1px solid white",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "1rem",
};

const infoGrid: React.CSSProperties = {
  marginTop: 100,
  maxWidth: 1100,
  marginLeft: "auto",
  marginRight: "auto",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(14px)",
  padding: 28,
  borderRadius: 20,
};
