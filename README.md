# NGO Registration & Donation Management System

## 📌 Project Overview
This project is a full-stack web application designed for NGOs where users can register to support a cause and optionally make donations.

The key principle of this system is **ethical and transparent donation handling**.

✔ User registration is saved **independently of donation success**  
✔ No donation is marked successful without real payment confirmation  

---

## 🎯 Problem Statement
Many online donation platforms suffer from:
- User data loss when payment fails
- Fake or forced payment success logic

This project solves these issues by:
- Saving user registration before payment
- Tracking donation status honestly (`pending / success / failed`)
- Updating payment status only after gateway confirmation

---

## 🚀 Features

### 👤 User Features
- User registration & login
- Optional donation flow
- PayHere sandbox payment integration
- User dashboard with:
  - Profile information
  - Donation history with real payment status

### 🛡 Admin Features
- Role-based admin authentication
- Admin dashboard with statistics
- View all registered users
- View all donations with filters
- Export users & donations as CSV
- Secure admin-only APIs

---

## 🧠 System Architecture
- **Frontend:** Next.js (App Router, Client Components)
- **Backend:** Next.js API Routes
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Payment Gateway:** PayHere (Sandbox)

---

## 🗄 Database Schema

### User Collection
- `name` (String)
- `email` (String)
- `password` (Hashed using bcrypt)
- `role` (`user` / `admin`)
- `createdAt` (Date)

### Donation Collection
- `userId` (ObjectId → User)
- `amount` (Number)
- `status` (`pending` / `success` / `failed`)
- `createdAt` (Date)

---

## 💳 Donation & Payment Flow (IMPORTANT)

1. User initiates donation
2. Donation entry is created with status **pending**
3. User is redirected to PayHere checkout
4. PayHere processes payment
5. System updates donation status:
   - `success` → payment confirmed
   - `failed` → payment cancelled / declined
6. No fake success is used

> ⚠️ Ethical Rule:  
> A donation is never marked successful without confirmation.

---

## 🔐 Authentication & Security
- Passwords hashed using bcrypt
- JWT used for authentication
- Role-based route protection
- Admin-only APIs secured
- Environment variables protected via `.env.local`

---

## 👤 Admin Access Details

This project uses **role-based authentication**.

Only users with role `"admin"` can:
- Access `/admin`
- View users & donations
- Export data

---

## 🧪 Default Admin Credentials (For Testing)


admin:first@gmail.com
password:first







