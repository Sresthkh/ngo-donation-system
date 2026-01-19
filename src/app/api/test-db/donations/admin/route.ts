import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const donations = await Donation.find().populate("userId", "name email");

    const totalAmount = donations
      .filter((d) => d.status === "success")
      .reduce((sum, d) => sum + d.amount, 0);

    return NextResponse.json({
      donations,
      totalAmount,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch admin donations" },
      { status: 500 }
    );
  }
}
