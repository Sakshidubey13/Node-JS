import Book from "../models/bookModel.js";

//CURD
//Add book
export const addBook = async (req, res) => {
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

//Getbook
export const getBooks = async (req, res) => {
  try {
    //the response coming from the database is
    const data = await Book.find();
    res.status(200).json({
      status: true,
      message: "Book Fetched successfully !",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Book fetching faield !",
      err: err.message,
    });
  }
};

export const testing = async (req, res) => {
  res.json({ data: req.params.action });
};
