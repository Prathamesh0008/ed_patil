import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const order = await Order.create(body);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET() {
  await connectDB();
  const orders = await Order.find().populate("userId");
  return NextResponse.json(orders);
}