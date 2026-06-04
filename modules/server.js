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
import addition, { div } from "./app.js";
addition(1, 2);
div(2, 2);
