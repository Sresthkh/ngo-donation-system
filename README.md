# NGO Registration & Donation Management System

## 📌 Project Overview
This project is a full-stack web application designed for NGOs where users can register to support a cause and optionally make donations.

The core idea of this system is ethical and transparent donation handling.
User registration is independent of donation success, meaning user data is never lost even if a payment fails or is cancelled.

---

## 🎯 Problem This Project Solves
In many online donation systems:
- User data is lost if payment is not completed
- Donations are sometimes falsely marked as successful

This project avoids those issues by:
- Saving user data before any payment
- Updating donation status only after genuine payment confirmation

---

## 🚀 Key Features

### User Features
- User registration and login
- Optional donation flow
- Secure PayHere sandbox payment integration
- User dashboard showing:
  - Profile information
  - Donation history with status (success / pending / failed)

### Admin Features
- Admin login with role-based access
- Admin dashboard with statistics
- View all registered users
- View all donations with filters
- Export users and donations data as CSV files

---

## 🧠 System Architecture
- Frontend: Next.js (App Router)
- Backend: Next.js API Routes
- Database: MongoDB with Mongoose
- Authentication: JWT
- Payment Gateway: PayHere Sandbox

---

## 🗄 Database Schema

### User Collection
- name (String)
- email (String)
- password (Hashed)
- role (user / admin)
- createdAt (Date)

### Donation Collection
- userId (ObjectId)
- amount (Number)
- status (pending / success / failed)
- createdAt (Date)

---

## 💳 Donation Flow
1. Donation is created with status pending
2. User is redirected to PayHere
3. PayHere confirms payment
4. Donation status is updated to success or failed
5. No fake success logic is used

---

## 🔐 Security
- Password hashing using bcrypt
- JWT based authentication
- Role based authorization
- Environment variables stored securely

---

## ▶️ How to Run Locally

1. Clone repository
git clone https://github.com/Sresthkh/ngo-donation-system.git

2. Go to project folder

3. Install dependencies

4. Run development server

App will run on:
http://localhost:3000

---

## 👤 Author
Sresth Khandelwal
