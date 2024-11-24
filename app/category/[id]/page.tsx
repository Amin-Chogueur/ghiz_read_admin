"use client";
import PopUp from "@/components/PopUp";
import { useBookContext } from "@/context/BookContext";

import React, { useEffect, useState } from "react";
function Category({ params }: { params: { id: string } }) {
  const { id } = params;
  const {
    category,
    setShowPopUp,
    showPopUp,
    setCategory,
    getCategory,
    UpdateCategory,
  } = useBookContext();
  const type='category'
  const [iseUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    getCategory(id);
  }, []);
  return (
    <div className="relative h-[100vh]">
      <h1 className="text-center text-accent pt-4  text-2xl p-2">
        Update Category
      </h1>
      <div className="w-[90%] my-[50px] lg:w-[70%] flex justify-center  border rounded p-4 mx-auto">
        <div>
          {iseUpdate ? (
            <input
              className="bg-black border p-3 rounded"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          ) : (
            <h2>{category.name}</h2>
          )}
        </div>
      </div>
      <div className="flex flex-row-reverse gap-4 justify-center items-center">
        {iseUpdate ? (
          <button
            className="p-1 rounded bg-accent text-primary  font-[600]"
            onClick={() => UpdateCategory(id)}
          >
            Done
          </button>
        ) : (
          <button
            className="p-1 rounded bg-accent text-primary font-[600]"
            onClick={() => setIsUpdate(true)}
          >
            Update
          </button>
        )}

        <button
          className="p-1 rounded bg-red-600 text-accent font-[600] "
          onClick={() => setShowPopUp(true)}
        >
          Delete
        </button>
        {showPopUp ? <PopUp idToDelete={id} setShowPopUp={setShowPopUp} type={type} /> : null}
      </div>
    </div>
  );
}

export default Category;
