"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookContext } from "../context/BookContext";

export default function Home() {
  const { loading, username, getName, getAllBooksAtOnce, allBooks } =
    useBookContext();
  const [search, setSearch] = useState("");
  const totalBooks = useMemo(() => {
    return allBooks?.reduce((acu, cur) => acu + cur.quantity, 0);
  }, [allBooks]);

  const totalBooksPrice = useMemo(
    () =>
      allBooks?.reduce((acu, cur) => acu + cur.quantity * Number(cur.price), 0),
    [allBooks]
  );

  const filtredBooks = allBooks?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    getName();
    getAllBooksAtOnce();
  }, []);
  return (
    <div className="bg-secondary text-accent px-5 pt-5 pb-10 min-h-[100vh]">
      <h1 className=" my-10 text-center text-orange-600 text-3xl">
        Welcome {username} to Your Library{" "}
      </h1>
      <input
        className="p-2 outline-none bg-[#222] text-accent mb-4 mx-auto block rounded"
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <h3 className="text-2xl text-center p-5">Loading...</h3>
      ) : (
        <div className="overflow-x-auto max-w-[95%] mx-auto p-4">
          <table className="border table-auto w-full">
            <thead className="text-orange-500 text-center">
              <tr className="border">
                <td className="p-4 border">Book Title</td>
                <td className="p-4 border">Category</td>
                <td className="p-4 border">Author</td>
                <td className="p-4 border">Price</td>
                <td className="p-4 border">Quantity</td>
                <td className="p-4 border">Total</td>
              </tr>
            </thead>
            <tbody>
              {filtredBooks?.map((book, i) => (
                <tr
                  key={i}
                  className="border hover:text-orange-600 transition-colors duration-500"
                >
                  <td className="p-5 border min-w-[150px]">
                    {i + 1}/ {book.title}
                  </td>
                  <td className="p-5 border min-w-[150px]">
                    {book.category.name}
                  </td>
                  <td className="p-5 border min-w-[150px]">{book.auther}</td>
                  <td className="p-5 border text-center min-w-[100px]">
                    {book.price} DA
                  </td>
                  <td className="text-center min-w-[80px]">{book.quantity}</td>
                  <td className="p-5 border text-center min-w-[100px]">
                    {Number(book.price) * book.quantity} DA
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="text-orange-500">
                <td className="p-5 border" colSpan={4}>
                  Total:
                </td>
                <td className="text-center border">{totalBooks}</td>
                <td className="text-center">{totalBooksPrice} DA</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
