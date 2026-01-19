import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // ✅ FETCH USER DETAILS
    const user = await User.findById(decoded.id).select(
      "_id name email role"
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ FETCH USER DONATIONS (UNCHANGED LOGIC)
    const donations = await Donation.find({
      userId: decoded.id,
    }).sort({ createdAt: -1 });

    // ✅ RETURN BOTH USER + DONATIONS
    return NextResponse.json({
      user,
      donations,
    });
  } catch (error) {
    console.error("USER DONATIONS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
