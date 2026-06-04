//first way 0import export for single value
//const sum = require("./app.js");
//
//sum(10, 30);

//sencond way import and export for multiple value
//1st mmethod const app = require("./app.js");
//app.sum(10, 20);
//app.div(40, 20);

const { sum, div } = require("./app.js");

sum(10, 20);
div(40, 20);
