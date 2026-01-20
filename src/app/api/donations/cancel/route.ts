import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ message: "Order ID missing" }, { status: 400 });
    }

    await connectDB();

    await Donation.findByIdAndUpdate(orderId, {
      status: "failed",
    });

    return NextResponse.json({ message: "Donation marked as failed" });
  } catch {
    return NextResponse.json(
      { message: "Failed to cancel donation" },
      { status: 500 }
    );
  }
}
