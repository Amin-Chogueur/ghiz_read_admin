"use client";
import { useBookContext } from "@/context/BookContext";
import React from "react";

export default function PopUp({
  idToDelete,
  setShowPopUp,
  type,
}: {
  type: string;
  idToDelete: string;
  setShowPopUp: any;
}) {
  const { deleteBook, deleteCategory } = useBookContext();

  return (
    <div className="absolute top-0 left-0 w-full h-[100%] bg-[#000000b0] flex justify-center md:items-center items-end">
      <div className="border bg-accent p-5 w-[90%] md:w-[50%] h-[200px] rounded-lg mb-[100px] ">
        <h2 className="text-red-700 text-center mb-6 text-xl">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </h2>
        <div className="flex justify-center items-start gap-3">
          <button
            className="bg-red-600 text-white px-1 rounded"
            onClick={() =>
              type === "book"
                ? deleteBook(idToDelete)
                : deleteCategory(idToDelete)
            }
          >
            Yes
          </button>
          <button
            onClick={() => setShowPopUp(false)}
            className="bg-accent text-primary px-1 rounded border border-primary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
