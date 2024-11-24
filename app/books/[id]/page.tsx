"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import BookForm from "@/components/bookForm";
import { useBookContext } from "@/context/BookContext";
import PopUp from "@/components/PopUp";

export default function Book({ params }: { params: { id: string } }) {
  const bookId = params.id;
  const {
    categories,
    loading,
    book,
    setShowPopUp,
    showPopUp,
    setBook,
    getBook,
    updateBook,
  } = useBookContext();
  const [isUpdate, setIsUpdate] = useState(false);

  function handleImageUpload(url: string) {
    setBook((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  }

  function handleRemoveImage() {
    setBook((prevFormData) => ({
      ...prevFormData,
      image: "",
    }));
  }
  const type = "book";
  useEffect(() => {
    getBook(bookId);
  }, []);
  return (
    <div className="relative">
      <div className={`mx-auto  rounded p-6 leading-10`}>
        <h1 className="text-accent text-2xl text-center mb-10">Update Book</h1>
        {loading ? (
          <h2 className="text-2xl text-center">Loading...</h2>
        ) : !isUpdate ? (
          <div className="lg:grid lg:grid-cols-2 ">
            <div className="mx-auto lg:mx-0 w-fit">
              <Image
                src={book.image}
                alt="image"
                width={300}
                height={200}
                className="mx-auto lg:mx-0 mb-5"
              />
              <div className="hidden lg:block">
                <h3>
                  <span className="text-orange-500 ">Author :</span>{" "}
                  {book.auther}
                </h3>
                <h3>
                  <span className="text-orange-500 ">Category:</span>{" "}
                  {book.category?.name}
                </h3>
                <h3>
                  <span className="text-orange-500 ">Number Of Pages:</span>{" "}
                  {book.numberOfPages}
                </h3>
                <h3>
                  <span className="text-orange-500 ">Quantiy :</span>{" "}
                  {book.quantity}
                </h3>

                <h3>
                  <span className="text-orange-500 ">Price :</span> {book.price}{" "}
                  DA
                </h3>
              </div>
            </div>
            <div className=" lg:ml-[-80px]">
              <h3 className="text-lg lg:text-2xl mb-3">
                <span className="text-orange-500">Title :</span> {book.title}
              </h3>
              <p>
                <span className="text-orange-500 ">Description :</span>{" "}
                {book.description}
              </p>
              <div className="block lg:hidden">
                <h3>
                  <span className="text-orange-500 ">Author :</span>{" "}
                  {book.auther}
                </h3>
                <h3>
                  <span className="text-orange-500 ">Category:</span>{" "}
                  {book.category?.name}
                </h3>
                <h3>
                  <span className="text-orange-500 ">Number Of Pages:</span>{" "}
                  {book.numberOfPages}
                </h3>
                <h3>
                  <span className="text-orange-500 ">Quantiy :</span>{" "}
                  {book.quantity}
                </h3>

                <h3>
                  <span className="text-orange-500 ">Price :</span> {book.price}{" "}
                  DA
                </h3>
              </div>
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setShowPopUp(true)}
                  className="bg-red-700 p-1 rounded text-accent font-[600]"
                >
                  DELETE
                </button>
                {showPopUp ? (
                  <PopUp
                    idToDelete={bookId}
                    setShowPopUp={setShowPopUp}
                    type={type}
                  />
                ) : null}
                <button
                  className="bg-accent p-1 rounded text-primary font-[600]"
                  onClick={() => {
                    setIsUpdate((prev) => !prev);
                    console.log(book);
                  }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <BookForm
            updateBook={(e) => updateBook(e, bookId)}
            book={book}
            setBook={setBook}
            handleRemoveImage={handleRemoveImage}
            handleImageUpload={handleImageUpload}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}
