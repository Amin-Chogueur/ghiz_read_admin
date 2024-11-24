"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React, {
  FormEvent,
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { BookType, CategoryType, FormDataType } from "../types/interfaceses";
import { useRouter } from "next/navigation";

const BookContext = createContext<
  | {
      loading: boolean;
      books: BookType[];
      allBooks: BookType[];
      categories: CategoryType[];
      formData: FormDataType;
      book: BookType;
      totalBooks: number;
      search: string;
      pageToLoad: string;
      name: string;
      showPopUp: boolean;
      setPageToLoad: React.Dispatch<React.SetStateAction<string>>;
      setSearch: React.Dispatch<React.SetStateAction<string>>;
      setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
      category: CategoryType;
      setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
      setName: React.Dispatch<React.SetStateAction<string>>;
      setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
      setBook: React.Dispatch<React.SetStateAction<BookType>>;
      getBook: (bookId: string) => Promise<void>;
      deleteBook: (bookId: string) => Promise<void>;
      updateBook: (e: FormEvent, bookId: string) => Promise<void>;
      handleSubmitNewCategory: (e: React.FormEvent) => Promise<void>;
      handleSubmitNewBook: (e: React.FormEvent) => Promise<void>;
      getBooks: () => Promise<void>;
      getAllBooksAtOnce: () => Promise<void>;
      getAllCategories: () => Promise<void>;
      getCategory: (id: string) => Promise<void>;
      UpdateCategory: (id: string) => Promise<void>;
      deleteCategory: (id: string) => Promise<void>;
      getName: () => Promise<void>;
      username: string;
    }
  | undefined
>(undefined);

export default function BookProvider({ children }: { children: ReactNode }) {
  const route = useRouter();
  const [pageToLoad, setPageToLoad] = useState("1");
  const [search, setSearch] = useState<string>("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [name, setName] = useState("");
  const [books, setBooks] = useState<BookType[]>([]);
  const [allBooks, setAlBooks] = useState<BookType[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [category, setCategory] = useState<CategoryType>({ _id: "", name: "" });
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    price: "",
    auther: "",
    category: "",
    image: "",
    quantity: 0,
    numberOfPages: "",
  });
  const [book, setBook] = useState<BookType>({
    title: "",
    description: "",
    price: "",
    auther: "",
    image: "",
    quantity: 0,
    _id: "",
    numberOfPages: "",
    category: { _id: "", name: "" },
  });

  async function getCategory(id: string) {
    try {
      const res = await axios.get(`/api/categories/${id}`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function UpdateCategory(id: string) {
    try {
      const res = await axios.post(`/api/categories/${id}`, category);
      toast.success(res.data.message);
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      route.push("/category");
    }
  }
  async function deleteCategory(id: string) {
    try {
      const res = await axios.delete(`/api/categories/${id}`);
      toast.success(res.data.message);
      setShowPopUp(false);
    } catch (error) {
      console.log(error);
    } finally {
      route.push("/category");
    }
  }
  async function handleSubmitNewCategory(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/categories", { name });
      toast.success(res.data.message);
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the category.");
      }
    } finally {
      setName("");
      route.push("/category");
    }
  }
  async function getName() {
    try {
      setLoading(true);
      const res = await axios.get("/api/signup");
      const { username } = res.data[0];
      setUsername(username);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function getBook(bookId: string) {
    try {
      setLoading(true);
      const res = await axios.get(`/api/books/${bookId}`);
      setBook(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBook(bookId: string) {
    try {
      const res = await axios.delete(`/api/books/${bookId}`);
      route.push("/books");
      toast.success(res.data.message);
      setShowPopUp(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateBook(e: FormEvent, bookId: string) {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (category) => category.name === book.category?.name
      );

      const updatedBook = {
        ...book,
        category: selectedCategory?._id,
      };
      const res = await axios.patch(`/api/books/${bookId}`, updatedBook);
      toast.success(res.data.message);
      route.push("/books");
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      console.error(error);
    }
  }

  async function handleSubmitNewBook(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/books", formData);
      route.push("/books");
      toast.success(res.data.message);
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the Book.");
      }
    } finally {
      setFormData({
        title: "",
        description: "",
        price: "",
        auther: "",
        category: "",
        image: "",
        quantity: 0,
        numberOfPages: "",
      });
    }
  }

  async function getAllCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBooks() {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/books?page=${pageToLoad}&search=${search}`
      );
      const { books, totalBooks } = res.data;
      setBooks(books);
      setTotalBooks(totalBooks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function getAllBooksAtOnce() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/home`);
      const allBooksAtOnce = res.data;
      setAlBooks(allBooksAtOnce);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getBooks();
    getAllCategories();
  }, [pageToLoad, search]);

  return (
    <BookContext.Provider
      value={{
        loading,
        books,
        totalBooks,
        categories,
        formData,
        book,
        category,
        showPopUp,
        setPageToLoad,
        setSearch,
        search,
        pageToLoad,
        setShowPopUp,
        setCategory,
        setFormData,
        setBook,
        getBook,
        deleteBook,
        updateBook,
        handleSubmitNewBook,
        getBooks,
        getAllBooksAtOnce,
        allBooks,
        getAllCategories,
        getCategory,
        UpdateCategory,
        deleteCategory,
        getName,
        username,
        name,
        setName,
        handleSubmitNewCategory,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

// Custom hook for using the BookContext
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};
