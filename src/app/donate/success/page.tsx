import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <p style={{ color: "white", padding: 40 }}>
          Processing payment...
        </p>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
