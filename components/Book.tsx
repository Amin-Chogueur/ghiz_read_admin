import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BookType } from "../types/interfaceses";

export default function Book({ book }: { book: BookType }) {
  return (
    <Link
      href={`/books/${book._id}`}
      className={`bg-primary  mt-4 w-[250px] h-[530px] m-auto rounded-2xl overflow-hidden `}
    >
      <div className="relative py-4 px-2 rounded-t-lg   bg-primary">
        <Image
          src={book.image}
          alt="image"
          width={200}
          height={160}
          className="rounded-md m-auto shadow-[-6px_8px_8px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="px-4 py-1 text-accent">
        <h3 className="text-center text-accent mb-3">{book.title}</h3>
        <h3>
          <span className="text-orange-500 ">Auther :</span> {book.auther}
        </h3>

        <h3>
          <span className="text-orange-500  ">Price :</span> {book.price} DA
        </h3>
        <h3>
          <span className="text-orange-500  ">Quantiy :</span> {book.quantity}
        </h3>
      </div>
    </Link>
  );
}
