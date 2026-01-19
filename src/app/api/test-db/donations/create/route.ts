import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const { amount } = await req.json();
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid donation amount" },
        { status: 400 }
      );
    }

    const donation = await Donation.create({
      userId: decoded.id,
      amount,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Donation attempt created", donation },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to create donation" },
      { status: 500 }
    );
  }
}
