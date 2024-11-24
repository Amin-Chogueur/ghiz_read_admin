import { connectToDB } from "@/lib/connectDB";
import Book from "@/lib/models/bookModel";

import { NextResponse } from "next/server";

connectToDB();

export async function GET() {
  try {
    const allBooksAtOnce = await Book.find().populate("category", "name");
    return NextResponse.json(allBooksAtOnce, { status: 200 });
  } catch (error) {
    return NextResponse.json("error fetching data", { status: 500 });
  }
}
