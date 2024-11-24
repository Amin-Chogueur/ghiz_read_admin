import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminBookApp from "@/lib/models/adminModels";
import { connectToDB } from "@/lib/connectDB";

connectToDB();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;
    const user = await AdminBookApp.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "3h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
