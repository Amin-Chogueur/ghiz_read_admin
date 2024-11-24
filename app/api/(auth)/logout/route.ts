import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.redirect(
      new URL("/login", "https://ghiz-read-admin.vercel.app")
    ); // Redirect to homepage

    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });
    console.log("Logout successful");
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Logout failed", success: false });
  }
}
