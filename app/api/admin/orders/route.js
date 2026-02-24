import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Order from "../../../../models/Order";

export async function GET() {
  await connectDB();
  const orders = await Order.find().populate("userId");
  return NextResponse.json(orders);
}