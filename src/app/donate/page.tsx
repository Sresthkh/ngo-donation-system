"use client";

import { useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState<string>("");
  const [donationId, setDonationId] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startDonation = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create donation (pending)
      const res = await fetch("/api/donations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      if (!res.ok) {
        throw new Error("Failed to create donation");
      }

      const data = await res.json();

      // 2️⃣ Get PayHere hash
      const hashRes = await fetch("/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: data.donationId,
          amount: Number(amount).toFixed(2),
          currency: "LKR",
        }),
      });

      if (!hashRes.ok) {
        throw new Error("Failed to generate hash");
      }

      const hashData = await hashRes.json();

      setDonationId(data.donationId);
      setHash(hashData.hash);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAYHERE CHECKOUT ================= */

  if (donationId && hash) {
    return (
      <main style={bg}>
        <form
          method="POST"
          action={process.env.NEXT_PUBLIC_PAYHERE_CHECKOUT_URL}
          style={card}
        >
          <h2 style={title}>Confirm Donation</h2>

          {/* Required */}
          <input
            type="hidden"
            name="merchant_id"
            value={process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID}
          />
          <input
            type="hidden"
            name="return_url"
            value={`${process.env.NEXT_PUBLIC_APP_URL}/donate/success`}
          />
          <input
            type="hidden"
            name="cancel_url"
            value={`${process.env.NEXT_PUBLIC_APP_URL}/donate/cancel`}
          />
          <input
            type="hidden"
            name="notify_url"
            value={`${process.env.NEXT_PUBLIC_NGROK_URL}/api/payhere/notify`}
          />

          {/* Order */}
          <input type="hidden" name="order_id" value={donationId} />
          <input type="hidden" name="items" value="NGO Donation" />
          <input type="hidden" name="currency" value="LKR" />
          <input
            type="hidden"
            name="amount"
            value={Number(amount).toFixed(2)}
          />

          {/* Customer (sandbox safe) */}
          <input type="hidden" name="first_name" value="Test" />
          <input type="hidden" name="last_name" value="User" />
          <input type="hidden" name="email" value="testuser@gmail.com" />
          <input type="hidden" name="phone" value="0771234567" />
          <input type="hidden" name="address" value="Colombo" />
          <input type="hidden" name="city" value="Colombo" />
          <input type="hidden" name="country" value="Sri Lanka" />

          {/* Security */}
          <input type="hidden" name="hash" value={hash} />

          <p style={{ marginTop: 12 }}>
            Amount: <strong>LKR {Number(amount).toFixed(2)}</strong>
          </p>

          <button type="submit" style={donateBtn}>
            Pay Now
          </button>
        </form>
      </main>
    );
  }

  /* ================= DONATION INPUT ================= */

  return (
    <main style={bg}>
      <div style={card}>
        <h2 style={title}>Make a Donation</h2>

        <input
          type="number"
          min={1}
          placeholder="Enter amount (LKR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={input}
        />

        <button onClick={startDonation} style={donateBtn} disabled={loading}>
          {loading ? "Preparing..." : "Donate"}
        </button>
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const bg: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  padding: 32,
  borderRadius: 20,
  width: "100%",
  maxWidth: 420,
  textAlign: "center",
};

const title: React.CSSProperties = {
  fontSize: "1.8rem",
  fontWeight: 800,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 14,
  marginTop: 20,
  borderRadius: 12,
  border: "none",
};

const donateBtn: React.CSSProperties = {
  marginTop: 24,
  width: "100%",
  padding: "14px",
  borderRadius: 14,
  background: "#22c55e",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};
