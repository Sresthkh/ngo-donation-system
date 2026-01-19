import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Donation from "@/models/Donation";

export async function GET() {
  try {
    await connectDB();

    const totalRegistrations = await User.countDocuments();

    const donationAgg = await Donation.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalDonations =
      donationAgg.length > 0 ? donationAgg[0].total : 0;

    const pendingPayments = await Donation.countDocuments({
      status: "pending",
    });

    return NextResponse.json({
      totalRegistrations,
      totalDonations,
      pendingPayments,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load admin stats" },
      { status: 500 }
    );
  }
}
