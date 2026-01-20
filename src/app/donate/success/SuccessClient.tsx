"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) return;

    // ✅ mark donation as success
    fetch("/api/donations/success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    }).finally(() => {
      // redirect user after update
      setTimeout(() => {
        router.replace("/user");
      }, 2000);
    });
  }, [orderId, router]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>
          🎉 Donation Successful
        </h1>
        <p style={{ opacity: 0.8, marginTop: 12 }}>
          Thank you for supporting the cause.
        </p>
        <p style={{ opacity: 0.6, marginTop: 6 }}>
          Redirecting to your dashboard...
        </p>
      </div>
    </main>
  );
}
