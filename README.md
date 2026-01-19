# NGO Registration & Donation Management System

## What is this project?
This project is a full-stack web application that allows users to register with an NGO and optionally make donations.
The main focus of this system is ethical donation handling.

User registration is always saved, even if the donation fails or is cancelled.

---

## Why this project?
Many systems falsely mark donations as successful.
This project avoids that problem by updating donation status only after payment confirmation.

---

## Features
- User registration and login
- Optional donation flow
- PayHere sandbox payment integration
- User dashboard with donation history
- Admin dashboard for monitoring users and donations
- CSV export for users and donations
- Secure backend APIs

---

## Technology Used
- Frontend: Next.js (App Router)
- Backend: Next.js API routes
- Database: MongoDB with Mongoose
- Authentication: JWT
- Payment Gateway: PayHere Sandbox

---

## How payment works (Important)
1. Donation is first saved as `pending`
2. User is redirected to PayHere
3. If payment is successful → status becomes `success`
4. If payment is cancelled or failed → status becomes `failed`
5. No fake payment confirmation is used

---

## How to run locally
1. Install dependencies
```bash
npm install
