import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
// import { verifyToken } from "../../../lib/auth";

export async function GET(req) {
  const payload = verifyToken(req);

  if (!payload || payload.role !== "admin") {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 }
    );
  }

  await connectDB();

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    success: true,
    users,
  });
}
