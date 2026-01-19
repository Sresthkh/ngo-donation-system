import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      name,
      email,
      password,
      phone,
      city,
      reason,
      role,
    } = await req.json();

    // Required field validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with optional fields
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
      phone,
      city,
      reason,
    });

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
