import Book from "../models/bookModel.js";


//CURD
//Add book
export const addBook = async (req, res) => {
  try {
    await Book.create(req.body);
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
  res.json({ data: req.body });
};
//    //const data = await Book.find();
    

//update 
export const updateBook = async (req, res) => {
  try {
   const result =  await Book.findByIdAndUpdate(req.body.id, req.body);//id 
    res.status(200).json({
      status: true,
      message: "Book update successfully !",
      data : result,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Book updation faield !",
      err: err.message,
    });
  }
};


//delete
export const deleteBook = async (req,res) =>{
  try{
   const result = await Book.findByIdAndUpdate(req.query.id);
   res.json({
    status:true,
    message:'book deleted successfully !'
   })
  }catch(err){
     res.status(400).json({
      status: false,
      message: "Book delet faield !",
      err: err.message,
    });
  }
}
