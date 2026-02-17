import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
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

  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();

  const revenueAgg = await Order.aggregate([
    { $group: { _id: null, sum: { $sum: "$total" } } },
  ]);

  const totalRevenue = revenueAgg?.[0]?.sum || 0;

  return NextResponse.json({
    success: true,
    totalUsers,
    totalOrders,
    totalRevenue,
  });
}
