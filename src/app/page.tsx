"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>NGO Donation System</h1>
      <p>Register to support a cause. Donation is optional.</p>

      <Link href="/auth/login">Login</Link>
      <br />
      <Link href="/auth/register">Register</Link>
    </main>
  );
}
