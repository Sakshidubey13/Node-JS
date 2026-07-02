import Book from "../models/bookModule.js";

const addBook = async ()=>{
    try{
      await  Book.create()
    }catch(err){

    }
}