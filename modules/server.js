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

//CORE MODULE => FILE SYSTEM LEARN
//THREE TYPES OF FILE SYSTEM
//fs.writeFileSync => to create a new file if it not exits
//fs.readFileSync => to read file which is already exits.
//fs.appendFileSync => to add content after exiting content in file.

import fs from "fs";

//fs.writeFileSync("hello.txt","Hello World")
//file create and hello.txt file create and if under wrriten hello world shows

//read file => hello.txt => if read text also can apply (utf-8 ) =>that can read file if text
//fs.appendFileSync("hello.txt","new line")
//const data = fs.readFileSync("hello.txt","utf-8");
//console.log(data);

fs.writeFileSync(
  "index.html",
  `<html>
    <head>
    <tittle>Hello Node.js</tittle>
    </head>
    <body>
    <h1>Hello Node JS 
    </body>
    </html>`,
);
