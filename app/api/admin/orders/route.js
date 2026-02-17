import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
import { verifyToken } from "../../../../lib/auth";

export async function GET(req) {
  const payload = verifyToken(req);

  if (!payload || payload.role !== "admin") {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 }
    );
  }

  await connectDB();

  const orders = await Order.find()
    .populate("userId", "firstName lastName email phone role")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    success: true,
    orders,
  });
}
