import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { verifyToken, isAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || !isAdmin(payload)) {
      return new Response("Forbidden", { status: 403 });
    }

    const donations = await Donation.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    let csv =
      "Name,Email,Amount,Status,Date\n";

    donations.forEach((d) => {
      csv += `"${d.userId?.name || ""}","${d.userId?.email || ""}",${d.amount},${d.status},${new Date(
        d.createdAt
      ).toISOString()}\n`;
    });

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          "attachment; filename=donations.csv",
      },
    });
  } catch (error) {
    console.error("EXPORT CSV ERROR:", error);
    return new Response("Failed to export CSV", {
      status: 500,
    });
  }
}
