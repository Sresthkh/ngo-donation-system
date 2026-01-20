"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CancelClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      router.replace("/user");
      return;
    }

    // 🔴 Mark donation as FAILED
    fetch("/api/donations/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    })
      .finally(() => {
        // ⏩ Redirect user after update
        setTimeout(() => {
          router.replace("/user");
        }, 1500);
      });
  }, [searchParams, router]);

  return (
    <p style={{ color: "white", padding: 40 }}>
      Payment cancelled. Redirecting to dashboard...
    </p>
  );
}
