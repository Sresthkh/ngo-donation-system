import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  await connectDB();

  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = auth.split(" ")[1];
  const payload = jwt.verify(token, JWT_SECRET) as { id: string };

  const { amount } = await req.json();

  const donation = await Donation.create({
    userId: payload.id,
    amount,
    status: "pending",
    paymentGateway: "payhere",
  });

  return NextResponse.json({
    donationId: donation._id.toString(),
  });
}
