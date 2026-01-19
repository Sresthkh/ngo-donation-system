import { connectDB } from "@/lib/db";
import User from "@/models/User";
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

    const users = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 });

    let csv = "Name,Email,Role,Registered On\n";

    users.forEach((u) => {
      csv += `"${u.name}","${u.email}",${u.role},${new Date(
        u.createdAt
      ).toISOString()}\n`;
    });

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          "attachment; filename=users.csv",
      },
    });
  } catch (error) {
    console.error("EXPORT USERS CSV ERROR:", error);
    return new Response("Failed to export users", {
      status: 500,
    });
  }
}
