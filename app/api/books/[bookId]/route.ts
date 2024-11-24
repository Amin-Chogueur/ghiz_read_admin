import { connectToDB } from "@/lib/connectDB";
import Book from "@/lib/models/bookModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;
    const res = await Book.findById(bookId).populate("category", "name");
    if (!res) {
      return NextResponse.json("Oops! there is no user with this id", {
        status: 500,
      });
    }
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json("error fetching data", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
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

    ///delete book
    const { bookId } = params;
    const res = await Book.findByIdAndDelete(bookId);
    return NextResponse.json(
      { message: "Book deleted successfuly" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { err: "error while delete Book" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
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
    ///update book
    const { bookId } = params;
    const book = await req.json();
    await Book.findByIdAndUpdate(bookId, book);
    return NextResponse.json(
      { message: "Book updated successfuly" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error when update Book" },
      { status: 500 }
    );
  }
}
