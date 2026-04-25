import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    await connectDB();

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
      role: email.includes("admin") ? "admin" : "student",
    });

    return NextResponse.json({ message: "Account created successfully" });
  } catch {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}