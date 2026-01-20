import { Suspense } from "react";
import CancelClient from "./CancelClient";

export default function CancelPage() {
  return (
    <Suspense
      fallback={
        <p style={{ color: "white", padding: 40 }}>
          Processing cancellation...
        </p>
      }
    >
      <CancelClient />
    </Suspense>
  );
}
