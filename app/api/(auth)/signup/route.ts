import bcryptjs from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB";
import AdminBookApp from "@/lib/models/adminModels";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export async function GET() {
  await connectToDB();
  try {
    const data = await AdminBookApp.find({});
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Ensure the database is connected
    await connectToDB();

    // Parse the request data
    const data = await req.json();
    const { username, email, password } = data;

    // Validate required fields
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { message: "Error: you are not the owner of this web site" },
        { status: 400 }
      );
    }
    // Check if user already exists
    const isExist = await AdminBookApp.findOne({ email });
    if (isExist) {
      return NextResponse.json(
        { message: "Error: user already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save the new user
    const newAdmin = new AdminBookApp({
      username,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();

    return NextResponse.json({ message: "Signup successful" }, { status: 200 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Error in signup" }, { status: 500 });
  }
}
