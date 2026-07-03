import Book from "../models/bookModel.js";

export const addBook = async (res, req) => {
  try {
    await Book.create({
      title: "Power of NNow",
      author: "Eckart Tale",
      price: 250,
      descriptioin: null,
      category: "Salf Help",
      publishedYear: 2000,
    });
    res.status(201).json({
      status: true,
      message: "Book Inserted successfully !",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Book Insertion failed",
      err: err.message,
    });
  }
};

