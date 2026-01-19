import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.formData();

    const order_id = body.get("order_id") as string;
    const status_code = body.get("status_code") as string;

    // PayHere SUCCESS status_code = 2
    if (status_code === "2") {
      await Donation.findByIdAndUpdate(order_id, {
        status: "success",
      });
    } else {
      await Donation.findByIdAndUpdate(order_id, {
        status: "failed",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PAYHERE NOTIFY ERROR", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
