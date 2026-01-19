import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    await connectDB();

    const user = await User.findById(decoded.id).select("name email role");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
