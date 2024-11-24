"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useBookContext } from "../../context/BookContext";

export default function Categories() {
  const { categories, getAllCategories, books } = useBookContext();
  const route = useRouter();
  const [filter, setFilter] = useState("");

  const filteredcategory = categories.filter((category) =>
    category.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="pb-10 text-accent">
      <div className="flex  items-center justify-between mt-4 mb-8 p-4">
        <h1 className=" lg:text-2xl  sm:text-lg">
          All Category ({categories.length})
        </h1>
        <Link
          className=" bg-accent text-secondary font-[600] p-1 rounded"
          href={"/category/new"}
        >
          Create New Category
        </Link>
      </div>
      <div className="relative w-fit mx-auto">
        <IoSearchOutline className="absolute top-3 right-1 text-lg" />
        <input
          placeholder="Search..."
          className="p-2 bg-[#222] rounded outline-none w-[270px] mx-auto block mb-4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className="w-[90%]  lg:w-[60%]  mt-10 mx-auto border border-gray-300 text-center shadow-md rounded-lg">
        <thead className="bg-primary text-orange-500">
          <tr>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Books</th>
          </tr>
        </thead>
        <tbody>
          {filteredcategory.map((category, i) => {
            const numberOfBooks = books?.filter(
              (book) => book.category?.name === category.name
            ).length;

            return (
              <tr
                key={category._id}
                onClick={() => route.push(`/category/${category._id}`)}
                className="cursor-pointer hover:bg-primary"
              >
                <td className="p-4 border-b">{category.name}</td>
                <td className="p-4 border-b">{numberOfBooks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
