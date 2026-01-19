import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
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

    const users = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error("ADMIN USERS API ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
