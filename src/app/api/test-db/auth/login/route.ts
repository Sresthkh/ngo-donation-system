import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword, generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return NextResponse.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
