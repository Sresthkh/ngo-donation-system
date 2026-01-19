import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const donations = await Donation.find({ userId: decoded.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ donations });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
