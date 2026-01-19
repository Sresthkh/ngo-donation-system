"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function DonateSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const order_id = params.get("order_id");

    if (!order_id) {
      router.replace("/user");
      return;
    }

    fetch("/api/donations/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id }),
    })
      .then(() => {
        setTimeout(() => {
          router.replace("/user");
        }, 1500);
      });
  }, [params, router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800 }}>
           Donation Successful!
        </h1>
        <p style={{ opacity: 0.8, marginTop: 12 }}>
          Thank you for supporting the cause.
        </p>
      </div>
    </div>
  );
}
