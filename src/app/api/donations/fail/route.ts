import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json(
        { message: "Order ID missing" },
        { status: 400 }
      );
    }

    await Donation.findByIdAndUpdate(order_id, {
      status: "failed",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FAIL CONFIRM ERROR", err);
    return NextResponse.json(
      { message: "Failed to mark donation as failed" },
      { status: 500 }
    );
  }
}
