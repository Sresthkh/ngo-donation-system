import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { order_id, amount } = await req.json();

  const merchant_id = process.env.PAYHERE_MERCHANT_ID!;
  const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET!;

  // 🔴 IMPORTANT: amount must be 2-decimal string
  const formattedAmount = Number(amount).toFixed(2);

  const secretHash = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();

  const hash = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        formattedAmount +
        "LKR" +
        secretHash
    )
    .digest("hex")
    .toUpperCase();

  return NextResponse.json({
    hash,
    amount: formattedAmount,
  });
}
