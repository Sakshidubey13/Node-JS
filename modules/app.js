//first single value import aand export

//const sum = (a, b) => {
//  console.log("addotion is ", a + b);
//};
//
//module.exports = sum ;

//multiple  value export and import
//const sum = (a, b) => {
//  console.log("addotion is ", a + b);
//};
//
//const div =(a,b) =>{
//    console.log("division is ", a/b);
//}
//
//module.exports = {sum,div};

//mordern way export
const sum = (a, b) => {
  console.log("addotion is ", a + b);
};

export const div = (a, b) => {
  console.log("division is ", a / b);
};

export default sum;
