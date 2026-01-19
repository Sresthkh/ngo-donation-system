import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { donationId, status } = await req.json();

    if (!donationId || !["success", "failed"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid update request" },
        { status: 400 }
      );
    }

    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { status },
      { new: true }
    );

    if (!donation) {
      return NextResponse.json(
        { message: "Donation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Donation status updated",
      donation,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update donation" },
      { status: 500 }
    );
  }
}
