import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
import { verifyToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const payload = verifyToken(req);

    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const { items, subtotal, shipping, tax, total } = body;

    const order = await Order.create({
      userId: payload.userId,
      items: items || [],
      subtotal: subtotal || 0,
      shipping: shipping || 0,
      tax: tax || 0,
      total: total || 0,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      orderId: order._id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
