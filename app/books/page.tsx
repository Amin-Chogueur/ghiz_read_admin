"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import dynamic from "next/dynamic";
import { useBookContext } from "../../context/BookContext";
import Pagination from "@/components/Pagination";

const Book = dynamic(() => import("../../components/Book"), { ssr: false });

function Books() {
  const { totalBooks, loading, books, getBooks, setSearch } = useBookContext();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div className=" text-white p-4  min-h-full ">
      <div className="flex  items-center justify-between mt-4 mb-8">
        <h1 className="text-accent lg:text-2xl  sm:text-lg">
          All Books ({totalBooks})
        </h1>
        <Link
          className=" bg-accent text-primary font-[600] p-1 rounded"
          href={"/books/new"}
        >
          Create New Book
        </Link>
      </div>
      <div className="relative w-fit mx-auto flex">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value.trimStart())}
          placeholder="Search By Title..."
          className="p-2 bg-[#222] rounded outline-none w-[270px] h-12 mx-auto block  mb-4"
        />
        <p
          onClick={() => setSearch(filter)}
          className="bg-orange-600 p-2 cursor-pointer h-12 rounded flex justify-center items-center"
        >
          {" "}
          <IoSearchOutline className=" text-lg" />
        </p>
      </div>

      {loading ? (
        <h2 className="text-center mt-10 text-2xl">Loading...</h2>
      ) : books.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4   gap-5 text-left capitalize py-6">
          {books.length > 0 ? (
            books?.map((book, i) => <Book key={i} book={book} />)
          ) : (
            <h2 className=" text-center text-2xl ">
              There is no book match this title or auther name!
            </h2>
          )}
        </div>
      ) : null}
      <Pagination />
    </div>
  );
}
export default dynamic(() => Promise.resolve(Books), { ssr: false });

