//we cannot redaclare a new variable with the same name that const has
//immutable variable means that it cannot be changed or modified
const test = 'test'; // no primitive type can be modified (Boolean Null Undefined Number String Symbol)
const numbers = [1,2,3,4]; // objects can be modified

//can reassign, can not redeclare
let number = 5;
number = 6; // no problem
let number = 3; // syntax error

var a = 1;
if(a == 1){
    var b = 2;
}
b; // == 2

if(a == 1){
    let c = 2;
}
c; // is not defined

/*
    HOISTING:
    Javascript under the hood hoists the variables inside the function
    which means it moves all the variable declarations to the top of the function
*/
//what we see:
function hello(){
    return test;
    var test = 'test';
}
hello(); //undefined

//what js does:
function hello(){
    var test;
    return test;
    test = 'test';
}

//what we see with let:
function hello(){
    return test;
    let test = 'test';
}
hello(); //referenceerror
//js also hoists let variables but they end up in the TDZ(Temporal Dead Zone) and we cannot acces their value
//let limits the variable to the block in which it is used( block is anything inside {}, for example if,for,while,catch,try.. )
for(var i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i);
	},1000)
}
//i == 5, 5 times

for(let i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i);
	},1000)
}
// i == 0,1,2,3,4

var firstname = 'borna';
var lastname = 'sunjic';
console.log('ja sam ' + firstname + ' ' + lastname);


//template strings:
var firstname = 'borna';
var lastname = 'sunjic';
console.log('ja sam ' + firstname + ' ' + lastname); //ja sam borna sunjic
console.log(`ja sam ${firstname} ${lastname}`); //ja sam borna sunjic
console.log(`
test
multiline
test
multiline`); // every word in new line


/*
    arrow functions:
    arrow functions do not get their own 'this' keyword
    value of the keyword this equals whatever the value of the keyword 'this' imidiately outside of that arrow function
    arrow function do not get the keyword 'arguments', they get the keyword 'arguments' imidiately outside of that arrow function
*/
var add = function(a,b){
    return a+b;
}
add(1,2); //3

var add = (a,b) => a+b; // if written in single line, does not need return
add(1,2) //3

//written with and without arrow functions
[1,2,3].map(function(value){
    return value*2;
})
[1,2,3].map( value => value * 2);

//written with and without arrow functions
function doubleAndFilter(arr){
    return arr.map(function(value){
        return value*2;
    }).filter(function(value){
        return value % 3 === 0;
    })
}
doubleAndFilter([5,10,15,20]); // [30]
var doubleAndFilter = arr => arr.map( value => value*2 ).filter( value => value % 3 === 0 )
doubleAndFilter([5,10,15,20]); // [30]

var instructor = {
    firstName: 'borna',
    hi: function(){
        setTimeout(function(){
            console.log('hi '+ this.firstName);
        }.bind(this), 1000)
    }
}
instructor.hi(); //hi borna

var instructor = {
    firstName: 'borna',
    hi: function(){
        setTimeout( () => {
            console.log('hi '+ this.firstName); //value of 'this' equals 'this' of the instructor
        }, 1000)
    }
}
instructor.hi(); //hi borna

var add = (a,b) => {
    return arguments;
}
add(2,4); // referenceerror: arguments is not defined

function outer(){
    return innerFunction = () => {
        return arguments;
    }
}
outer(1)(2); //only prints out [1];


/* 1 - Refactor the following code to use ES2015 arrow functions - make sure your function is also called tripleAndFilter

    function tripleAndFilter(arr){
      return arr.map(function(value){
        return value * 3;
      }).filter(function(value){
        return value % 5 === 0;
      })
    }

*/

var tripleAndFilter = arr => arr.map( (value) => value * 3 ).filter( (value) => value % 5 === 0 );

/* 2 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called doubleOddNumbers

    function doubleOddNumbers(arr){
        return arr.filter(function(val){
            return val % 2 !== 0;
        }).map(function(val){
            return val *2;
        })
    }

*/

var doubleOddNumbers = arr => arr.filter( (val) => val % 2 !== 0 ).map( (val) => val*2 );


/* 3 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called mapFilterAndReduce.

    function mapFilterAndReduce(arr){
      return arr.map(function(val){
        return val.firstName
      }).filter(function(val){
        return val.length < 5;
      }).reduce(function(acc,next){
        acc[next] = next.length
        return acc;
      }, {})
    }
*/

let mapFilterAndReduce = arr => arr.map( (val) => val.firstName ).filter( (val) => val.length < 5 )
    .reduce( (acc,next) => {
        acc[next] = next.length;
        return acc;
    }, {});




/* 4 - Write a function called createStudentObj which accepts two parameters, firstName and lastName and returns an object with the keys of firstName and lastName with the values as the parameters passed to the function.

Example:
    createStudentObj('Elie', 'Schoppik') // {firstName: 'Elie', lastName: 'Schoppik'}
*/

let createStudentObj = (firstName, lastName) => ({firstName:firstName, lastName:lastName});

/* 5 - Given the following code:


Refactor this code to use arrow functions to make sure that in 1000 milliseconds you console.log 'Hello Colt'

    var instructor = {
      firstName: "Colt",
      sayHi: function(){
        setTimeout(function(){
          console.log('Hello ' + this.firstName)
        },1000)
      }
    }

*/

var instructor = {
    firstName: 'Colt',
    sayHi: function(){
        setTimeout( () => {
            console.log('Hello ' + this.firstName)
        },1000)
    }
}

//default parameters:
//all types can have a default values( primitive types, objects... )
function add(a=10, b=20){
    return a+b;
}
add(); // 30
add(20); //40

//for...of loops
//some data types like strings, arrays, max and sets have built in symbol iterator function(Symbol.iterator) so we can use for of loop
//example:
var arr = [1,2,3,4];
for(let val of arr){
	console.log(val)
}


//rest is used when we want all arguments passed to the function converted to an array
function sumArguments(){
    var argumentsArray = [].slice.call(arguments); //here we first need to convert the arguments to an array
    return argumentsArray.reduce(function(accumulator,nextValue){
       return accumulator+nextValue;
    });
}
sumArguments(1,2,3);//6
//here 'args' are automatically converted to an array beacuse we specified them with ...args in the function parameter
var sumArguments = (...args) => args.reduce( (accumulator, next) => accumulator + next );
sumArguments(1,2,3);//6

function printRest(a,b,...c){
    console.log(a); //5
    console.log(b); //6
    console.log(c); //[7,8,9]
}
printRest(5,6,7,8,9);


//spread:
//when used outside of the parameters of a function, it is called a spread operator
//what spread does, it converts(spreads) array value to a comma separated string
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [7,8,9];

arr1.concat(arr2).concat(arr3); //[1, 2, 3, 4, 5, 6, 7, 8, 9]
[...arr1, ...arr2, ...arr3]; //[1, 2, 3, 4, 5, 6, 7, 8, 9]

function add(a,b,c){
    return a+b+c;
}
add(...arr1);


/*
Write a function called smallestValue which accepts a variable number of parameters and returns the smallest parameters passed to the function.

Examples:
    smallestValue(4,1,12,0) // 0
    smallestValue(5,4,1,121) // 1
    smallestValue(4,2) // 2
    smallestValue(99,12321,12.2) // 2
*/

var smallestValue = (...args) => Math.min(...args);

/*
Write a function called placeInMiddle which accepts two parameters, an array and another array. This function should return the first array with all of the values in the second array placed in the middle of the first array.

Examples:
    placeInMiddle([1,2,6,7],[3,4,5]) // [1,2,3,4,5,6,7]
    placeInMiddle([1],[3,4,5]) // [3,4,5,1]
    placeInMiddle([1,6],[2,3,4,5]) // [1,2,3,4,5,6]
    placeInMiddle([],[2,3,4,5]) // [2,3,4,5]
*/

function placeInMiddle(arr, vals){
  let mid = Math.floor(arr.length/2)
  arr.splice(mid,0,...vals) //args: where we start from, how many elements we remove, what values do we add
  return arr;
}

/*
Write a function called joinArrays which accepts a variable number of parameters (you can assume that each argument to this function will be an array) and returns an array of all of the parameters concatenated together

Examples:

    joinArrays([1],[2],[3]) // [1,2,3]
    joinArrays([1],[2],[3],[1],[2],[3]) // [1,2,3,1,2,3]
    joinArrays([1,2,3],[4,5,6],[7,8,9]) // [1,2,3,4,5,6,7,8,9]
    joinArrays([1],[3],[0],[7]) // [1,3,0,7]

*/
var joinArrays = (...args) => args.reduce((acc, next) => acc.concat(next), [])


/*
// Write a function called sumEvenArgs which takes all of the parameters passed to a function and returns the sum of the even ones.

Examples:
    sumEvenArgs(1,2,3,4) // 6
    sumEvenArgs(1,2,6) // 8
    sumEvenArgs(1,2) // 2
*/

var sumEvenArgs = (...args) => args.reduce((acc, next) => next % 2 === 0 ? acc += next : acc, 0)

/*
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the parameters passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }

    var person = {
        firstName: 'Elie'
    }

    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"

    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn2(7,8). // "Elie subtracts -4"

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/


function flip(fn, thisArg, ...outerArgs){
  return function(...innerArgs){
    let allArgs = outerArgs.concat(innerArgs).slice(0, fn.length)
    return fn.apply(thisArg, allArgs.reverse());
  }
}

/*
Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }

    var person = {
        firstName: 'Elie'
    }

    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"

    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue"

    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

function bind(fn, thisArg, ...outerArgs){
  return function(...innerArgs){
    return fn.apply(thisArg, [...outerArgs, ...innerArgs])
  }
}

//object enhancements:
//before:
var first = 'borna';
var last = 'sunjic';
var test = {
    first:first,
    last:last
}
//after:
var test = {
    first, //automatically declared beacuse they have the same name
    last
}
//before:
var test = {
    hi: function(){
        return 'hi';
    }
}
//after:
var test = {
    hi(){
        return 'hi';
    }
}
//before:
var firstName = 'elie';
var instructor = {}; //we first need to declare a empty object then we reassign a key value from a variable
instructor[firstName] = 'thats me';
instructor.Elie // thats me
//after
var firstName = 'elie';
var instructor = {
    [firstName]: 'thats me'
}
instructor.Elie //thats me

//object destructuring:
//before:
var instructor = {
    firstName: 'borna',
    lastName: 'sunjic'
};
var firstName = instructor.firstName;
var lastName = instructor.lastName;
firstName; //borna
lastName; //sunjic

//after1:
var {firstName, lastName} = instructor;
firstName; //borna
lastName; //sunjic
//after2
var {firstName: first, lastName: last} = instructor;
first; //borna
last; //sunjic

//without destructuring;
function createInstructor(options){
    var options = options || {};
    var name = options.name || {first: 'mat', last:'lane'};
    var isHilarious = options.isHilarious || false;
    return [name.first, name.last, isHilarious];
}
createInstructor();
createInstructor({name:{first:'borna',last: 'sunjic'},isHilarious:true});
//refactored with destructuring:
function createInstructor( {name ={first:'borna',last:'sunjic'}, isHilarious=true} = {} ){
    return [name.first, name.last, isHilarious];
}
createInstructor();

function displayInfo({name, favColor}){
    return [name, favColor];
}
var instructor = {
    name: 'borna',
    favColor: 'green'
}
displayInfo(instructor); // ['borna', 'green']

//array destructuring
var arr = [1,2,3];
var a = arr[0];
var b = arr[1];
var c = arr[2];
a; //1
b; //2
c; //3
var [a,b,c] = arr;
a; //1
b; //2
c; //3
//before:
function swap(a,b){
    var temp = a;
    a = b;
    b = temp;
    return [a,b];
}
swap(3,4); //[4,3]
//after:
function swap(a,b){
    return [a,b] = [b,a];
}
swap(3,4); //[4,3]

/*
Write a function called displayStudentInfo which accepts an object and returns the string "Your full name is" concatenated with the value of the first key and a space and then the value of the last key. See if you can destructure this object inside of the function.

Examples:
    displayStudentInfo({first: 'Elie', last:'Schoppik'}) // 'Your full name is Elie Schoppik')
*/

function displayStudentInfo(obj){
    var {first, last} = obj;
    return `Your full name is ${first} ${last}`;
}

/*
Write a function called printFullName which accepts an object and returns the string "Your full name is" concatenated with the value of the first key and a space and then the value of the last key. See if you can destructure this object DIRECTLY from the parameters. The output of the printFullName function should be the exact same as the displayStudentInfo function.

Examples:
    printFullName({first: 'Elie', last:'Schoppik'}) // 'Your full name is Elie Schoppik'
*/

// you will have to pass in the correct parameters for this function!
function printFullName( {first,last} ){
    return `Your full name is ${first} ${last}`;
}

/*
Write a function called createStudent which accepts as a parameter, a default parameter which is a destructured object with the key of likesES2015 and value of true, and key of likesJavaScript and value of true.

    If both the values of likesJavaScript and likesES2015 are true, the function should return the string 'The student likes JavaScript and ES2015'.
    If the value of likesES2015 is false the function should return the string 'The student likes JavaScript!'
    If the value of likesJavaScript is false the function should return the string 'The student likesES2015!'
    If both the value of likesJavaScript and likesES2015 are false, the function should return the string 'The student does not like much...'

Examples:
    createStudent() // 'The student likes JavaScript and ES2015')
    createStudent({likesES2015:false}) // 'The student likes JavaScript!')
    createStudent({likesJavaScript:false}) // 'The student likes ES2015!')
    createStudent({likesJavaScript:false, likesES2015:false}) // 'The student does not like much...')
*/

// you will have to pass in the correct parameters for this function!
function createStudent({likesJavaScript = true, likesES2015 = true} = {}){
  var start = 'The student';
  if(likesJavaScript && likesES2015){
    start += ' likes JavaScript and ES2015'
  } else if(likesJavaScript){
    start += ' likes JavaScript!'
  } else if(likesES2015){
    start += ' likes ES2015!'
  } else {
    start += ' does not like much...'
  }
  return start;
}

/*
Write a function called reverseArray which accepts an array and returns the array with all values reversed. See if you can do this without creating a new array!

Examples:
    reverseArray([1,2,3,4,5]) // [5,4,3,2,1]
    reverseArray([1,2]) // [2,1]
    reverseArray([]) // []
    reverseArray([1,2,3,4,5,6,7,8,9,10]) // [10,9,8,7,6,5,4,3,2,1
*/

function reverseArray(arr){
  for(var i = 0; i < arr.length/2; i++){
    [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]]
  }
  return arr;
}
