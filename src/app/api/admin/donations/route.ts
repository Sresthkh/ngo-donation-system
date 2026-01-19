import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { verifyToken, isAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload || !isAdmin(payload)) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const donations = await Donation.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      donations,
    });
  } catch (error) {
    console.error("ADMIN DONATIONS API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
