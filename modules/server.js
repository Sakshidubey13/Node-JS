//first way 0import for single value
//const sum = require("./app.js");
//
//sum(10, 30);

//sencond way import  for multiple value
//1st mmethod const app = require("./app.js");
//app.sum(10, 20);
//app.div(40, 20);

//2nd method const { sum, div } = require("./app.js");
//
//sum(10, 20);
//div(40, 20);

//morder way import
//type": "module" package.json only this can be change it mandatory

//import addition, { div } from "./app.js";
//addition(1, 2);
//div(2, 2);

//1. file system module
//CORE MODULE => FILE SYSTEM LEARN
//THREE TYPES OF FILE SYSTEM
//fs.writeFileSync => to create a new file if it not exits
//fs.readFileSync => to read file which is already exits.
//fs.appendFileSync => to add content after exiting content in file.

//import fs from "fs";

//fs.writeFileSync("hello.txt","Hello World")
//file create and hello.txt file create and if under wrriten hello world shows

//read file => hello.txt => if read text also can apply (utf-8 ) =>that can read file if text
//fs.appendFileSync("hello.txt","new line")
//const data = fs.readFileSync("hello.txt","utf-8");
//console.log(data);
//
//fs.writeFileSync(
//  "index.html",
//  `<html>
//    <head>
//    <tittle>Hello Node.js</tittle>
//    </head>
//    <body>
//    <h1>Hello Node JS </h1>
//    </body>
//    </html>`,
//);

//fs.writeFileSync("bill.pdf","this is bill")

//2. path module
//that perfrom can change only  package.json =>  "type": "commonjs" this apply only
//const path = require("path");
//console.log(path.basename(__filename));

//3. http (hyper text transfer protocoal) => 1.crete => createServer , 2.start =>listen
//also can be change only package.json in ("type": "module")  that is must important can't run the code this change cannot be apply it
//import http from "http";
//1. Create
//req => hold all data comes from client : client => server
//res => hold all data which send from the server : server
// => client
//const server = http.createServer((req, res) => {
//  res.writeHead(200, { "content-type": "text/plain" }); //head define
//  res.end("Hello from Node server !!"); //res send
//});
//
////2. start
//server.listen(3000, () => {
//  console.log("server started succesfully");
//});

//<<<<<<< HEAD
//import chalk from "chalk";
//console.log(chalk.green("Success!!"));
//console.log(chalk.red("Failed!!"));
//console.log(chalk.yellow("Hii"));
//console.log(chalk.blue("Node"))


    


