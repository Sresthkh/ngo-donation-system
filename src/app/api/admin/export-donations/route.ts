import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET() {
  await connectDB();

  const donations = await Donation.find().populate(
    "userId",
    "name email"
  );

  let csv = "Name,Email,Amount,Status,Date\n";

  donations.forEach((d) => {
    csv += `${d.userId.name},${d.userId.email},${d.amount},${d.status},${d.createdAt}\n`;
  });

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=donations.csv",
    },
  });
}
