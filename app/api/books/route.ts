import { connectToDB } from "@/lib/connectDB";
import Book from "@/lib/models/bookModel";
import Category from "@/lib/models/categoryModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || ""; // Get the search query

    const perPage = 8; // Number of books per page
    // Construct the MongoDB query
    const query = search
      ? {
          title: { $regex: search, $options: "i" }, // Case-insensitive search by title
        }
      : {};

    // Count total books based on the search query
    const totalBooks = await Book.countDocuments();
    // get all categories to provide them in the api for the ghi-read website
    const categories = await Category.find({});
    const books = await Book.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage) // Skip the records of previous pages
      .limit(perPage); // Limit the number of results to perPage
    return NextResponse.json(
      {
        books,
        totalBooks,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("error fetching data", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    //verifie the if is admin
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    if ((decodedToken as any).email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { message: "Forbidden: Only admins can perform this action" },
        { status: 403 }
      );
    }
    //////create book

    const data = await req.json();
    const { title, category, image } = data;
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return NextResponse.json(
        { message: "Book already exists" },
        { status: 400 }
      );
    }
    if (!category || !image) {
      return NextResponse.json(
        { message: "Please fill out All the fields" },
        { status: 400 }
      );
    }
    const newBook = new Book(data);
    await newBook.save();
    return NextResponse.json(
      { message: "Book created successefuly" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("erro creating new Book", error);
  }
}
