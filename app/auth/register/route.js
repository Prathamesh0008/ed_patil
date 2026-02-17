import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { firstName, lastName, email, phone, password } = body;

    if (!firstName || !lastName || !password || (!email && !phone)) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const role =
      email === "edwebshop18@gmail.com" ? "admin" : "user";

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashed,
      role,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (e) {
    console.log("REGISTER ERROR:", e);
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
