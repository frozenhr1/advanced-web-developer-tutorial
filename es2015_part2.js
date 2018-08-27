//CLASS KEYWORD:
//class keyword is actually just an apstraction, under the hood we still use __proto__ and constructor methods and everything
//we saw in the oop section, but with these new features we can save some lines of code and also come close to the real oop syntax
//like we have in java, c++, php and other oop languages
//Case 1:
//before
function test(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}
var borna = new test('borna','sunjic');
borna; //{firstName: "borna", lastName: "sunjic"}
//after
class test1 {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

var borna1 = new test1('borna','sunjic');
borna1; //{firstName: "borna", lastName: "sunjic"

//Case 2:
//function prototype:
function test(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}
test.prototype.sayHello = function(){
    return 'Hello ' + this.firstName
}
var borna = new test('borna','sunjic');
borna.sayHello(); //hello borna

class test1 {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    //prototype function go here,if placed in constructor they will be
    //redeclared everytime new instance gets created
    sayHello(){
        return `Hello ${this.firstName}`;
    }
}
var borna1 = new test1('borna','sunjic');
borna1.sayHello(); //hello borna

//Case 3:
//static methods:
/*
    The static keyword defines a static method for a class.
    Static methods aren't called on instances of the class.
    Instead, they're called on the class itself.
    These are often utility functions, such as functions to create or clone objects.
*/
class ClassWithStaticMethod {
  static staticMethod() {
    return 'static method has been called.';
  }
}
console.log(ClassWithStaticMethod.staticMethod()); // expected output: "static method has been called."

// 1 - Create a class for a Person. Each person should have a firstName, lastName, favoriteColor, favoriteNumber.

/* 2 - Add an instance method called multiplyFavoriteNumber that accepts one parameter and returns the product of the parameter multiplied with the favoriteNumber property on a person object.

Examples:
    var person = new Person("Elie", "Schoppik", "purple", 34)
    person.multiplyFavoriteNumber(10) // 340

*/

class Person{
    constructor(firstName, lastName, favoriteColor, favoriteNumber){
        this.firstName = firstName;
        this.lastName = lastName;
        this.favoriteColor = favoriteColor;
        this.favoriteNumber = favoriteNumber;
    }
    multiplyFavoriteNumber(num){
        return num * this.favoriteNumber;
    }
}

//Case 4:
//inheritance with es2015
//if one class extends another it will have all the methods which it extends from has
class Student extends Person {

}
Student.prototype.constructor === Student //true - so we dont need to reset the constructor to Student as we had to do in ES5

//Case 5:
//super:
class Student extends Person {
    constructor(firstName, lastName){
        super(firstName, lastName); //calls a method from a class that we extended
    }
}

// 1 - Create a class for for a Vehicle. Each vehicle should have a make, model and year property.

// 2 - Add an instance method called start which returns the string "VROOM!"

// 3 - Add an instance method called toString which returns the string "The make, model, and year are" concatenated with the make, model and year property

/* Examples
    var vehicle = new Vehicle("Tractor", "John Deere", 1999)
    vehicle.toString() // 'The make, model, and year are Tractor John Deere 1999'
*/

// 4 - Create a class for a Car. Each object created from the Car function should also have a make, model, and year and a property called numWheels which should be 4. The Car prototype should inherit all of the methods from the Vehicle prototype

// 5 - Create a class for a Motorcycle. Each object created from the Motorcycle function should also have a make, model, and year and a property called numWheels which should be 2. The Motorcycle prototype should inherit all of the methods from the Vehicle prototype

class Vehicle {
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    start(){
        return "VROOM!";
    }
    toString(){
        return `The make, model, and year are ${this.make} ${this.model} ${this.year}`;
    }
}

class Car extends Vehicle{
    constructor(){
        super(...arguments);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle{
    constructor(){
        super(...arguments);
        this.numWheels = 2;
    }
}

//Case 6:
//Maps:
//map is basically a object but the key can be any type
//where in object, the key is always a string
//we can find the size of map easily with .size and they do not have their prototype object
var firstMap = new Map;
firstMap.set(1, 'Elie');
firstMap.set(false, 'a boolean');
firstMap.set('nice', 'a string');
firstMap.delete('nice'); //true
firstMap.size //2

var arrayKey = [];
firstMap.set(arrayKey, [1,2,3,4,5]);

var objectKey = {};
firstMap.set(objectKey, {a:1});

firstMap.get(1); // Elie
firstMap.get(objectKey) // {a: 1}
firstMap.forEach(value => console.log(value)); //looping through map
firstMap.values(); //MapIterator of values
firstMap.keys(); //MapIterator of keys
//there also exists a so called 'WeakMap' where all keys are objects
//and values in WeakMap can be cleared from memory if there is no reference to them

//Case 7:
//Sets:
//set is a data structure where all the values are unique
//there also exists a WeakSet
var s = new Set;
var s2 = new Set([3,1,4,1,2,1,5]); // {3,1,4,2,5}

s.add(10); //{10}
s.add(20); //{10,20}
s.add(10); //{10,20}
s.has(10); //true
s.delete(20); //true
s.size // 1
s2[Symbol.iterator]; //sets have a symbol.iterator so we can loop through sets with for of loop
//example:
for(let val of s2){
   console.log(val)
}


class MessageBoard {

    /*
    In your constructor method, you should assign two properties for each object created from the MessageBoard class. The first should be a property called messages which is an empty Map, and the second is a property called id which has a value of 1.

    var m = new MessageBoard

    m.hasOwnProperty('messages') // true
    m.messages.constructor // function Map() { [native code] }
    m.hasOwnProperty('id') // true
    m.id // 1
    */

    constructor(){
        this.messages = new Map;
        this.id = 1;
    }

    /*

    Add a method called addMessage which accepts a string. The function should add a key and value to the messages map with a key of whatever the value of this.id is and a value of whatever the string is that is passed to the function. The function should return the object created from the class so that the method can be chained. (HINT - to implement the last part, make sure to return this).

    var m = new MessageBoard
    m.addMessage('hello');
    m.messages.size // 1
    m.addMessage('awesome!') // m
    m.addMessage('awesome!').addMessage('nice!').addMessage('cool!')
    */

    addMessage(str){
        this.messages.set(this.id, str);
        this.id++;
        return this;
    }

    /*
    Add a method called findMessageById which accepts a number and returns the message in the messages map with the same key as the number passed to the function. If the key is not found in the messages map, the function should return undefined.


    var m = new MessageBoard
    m.addMessage('hello!')
    m.addMessage('hi!')
    m.addMessage('whats up?')
    m.findMessageById(1) // 'hello!'
    m.findMessageById(2) // 'hi!'
    m.findMessageById(3) // 'whats up?'
    m.findMessageById(4) // undefined
    m.findMessageById() // undefined
    */

    findMessageById(num){
        return this.messages.get(num);
    }

    /*
    Add a method called findMessageByValue which accepts a string and returns the message in the messages map with the same value as the string passed to the function. If the value is not found in the messages map, the function should return undefined.

    var m = new MessageBoard
    m.addMessage('hello!')
    m.addMessage('hi!')
    m.addMessage('whats up?')
    m.findMessageByValue('hello!') // 'hello!'
    m.findMessageByValue('hi!') // 'hi!'
    m.findMessageByValue('whats up?') // 'whats up?'
    m.findMessageByValue('nothing here') // undefined
    m.findMessageByValue() // undefined
    */


    findMessageByValue(str){
        for(let msg of this.messages.values()){
            if( msg === str) return msg;
        }
    }

    /*
    Add a method called removeMessage which accepts a number and removes a message in the messages map with a key of the number passed to the function.

    var m = new MessageBoard
    m.addMessage('hello!')
    m.addMessage('hi!')
    m.addMessage('whats up?')
    m.removeMessage(1)
    m.removeMessage(2)
    m.messages.size // 1
    m.removeMessage() // m
    */

    removeMessage(num){
        this.messages.delete(num);
        return this;
    }

    /*
    Add a method called numberOfMessages which returns the number of keys in the messages map

    var m = new MessageBoard
    m.addMessage('hello!')
    m.addMessage('hi!')
    m.addMessage('whats up?')
    m.numberOfMessages() // 3
    */

    numberOfMessages(){
        return this.messages.size;
    }

    /*
    Add a method called messagesToArray which returns an array of all of the values in the messages map

    var m = new MessageBoard
    m.addMessage('hello!')
    m.addMessage('hi!')
    m.addMessage('whats up?')
    m.messagesToArray() // ['hello!', 'hi!', 'whats up?'])
    */

    messagesToArray(){
        return Array.from(this.messages.values()); //The Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object.

    }
}

/*
Write a function called uniqueValues which accepts an array and returns the number of unique values in the array

uniqueValues([1,1,2,2,2,3,3,3,3,4,4,4,5,5,6]) // 6
*/

function uniqueValues(arr){
    return new Set(arr).size;
}

/*

Write a function called hasDuplicates which accepts an array and returns true if there are duplicate values in the array, otherwise it should return false.

hasDuplicates([1,1,2,2,2,3,3,3,3,4,4,4,5,5,6]) // true
hasDuplicates([1,2,3,4,5,6]) // false
hasDuplicates([]) // false
*/

function hasDuplicates(arr){
    return new Set(arr).size !== arr.length;
}

/*

Write a function called countPairs which accepts an array of numbers and a number. The function should return the number of unique pairs (two numbers) that sum up to the number passed to the function.

countPairs([8,2,6,4,10,0],10) // 3
countPairs([8,2],10) // 1
countPairs([1,2],10) // 0
countPairs([1,2,3,4,5],10) // 0
countPairs([],10) // 0
countPairs([5,4,-10,6,-20,16],-4) // 2
countPairs([0,-4],-4) // 1
*/

function countPairs(arr, num){
    var cache = new Set(arr);
    var count = 0;
    for(let val of arr){
        cache.delete(val);
        if(cache.has(num - val)){
            count++;
        }
    }
    return count;
}

//Case 8:
//Promise chaining:
/*
    accepts an array of promises and resolves all of them or rejects once a single one of
    the promises has been first rejected(fail fast)
    if all of the passed-in promises fulfill, Promise.all is fulfilled with an array of the values from the
    passed-in promises, in the same order as the promises passed in
    but the promises dont resolve sequentially, but Promise.all waits for them
*/
function getMovie(title){
    return $.getJSON(`https://cmdbapi.com?t=${title}&apikey=thenewdb`);
}
var titanicPromise = getMovie('titanic');
var shrekPromise = getMovie('shrek');
var braveheartPromise = getMovie('braveheart');
Promise.all([titanicPromise, shrekPromise, braveheartPromise]).then(function(movies){
    return movies.forEach(function(value){
        console.log(value.year);
    });
});

function getMostFollowers(...usernames){
  let baseUrl = "https://api.github.com/users/"
  let urls = usernames.map( value => $.getJSON(baseUrl + value));
  return Promise.all(urls).then((data) => {
    let max = data.sort((a,b) => a.followers < b.followers)[0];
    return `${max.name} has the most followers with ${max.followers}`
  })
}
getMostFollowers('elie','colt','tigarcia').then(function(data){
    console.log(data);
})

function starWarsString(id){
  var str = '';
  return $.getJSON(`https://swapi.co/api/people/${id}/`).then(function(data){
    str += `${data.name} is featured in `;
    var filmData = data.films[0]
    return $.getJSON(filmData);
  }).then(function(res){
    str += `${res.title}, directed by ${res.director} `
    var planetData = res.planets[0]
    return $.getJSON(planetData)
  }).then(function(res){
    str += `and it takes place on ${res.name}`;
    return str;
  }).then(function(finalString){
    return finalString
  })
}

//Case 9:
//generator functions:
//can pause execution of the functions and resume at a later point of time
//when a generator function is run a generator object is returned to us which has a method next which returns
//another object to us with the keys of value and done(can be false or true if the function has been completed)
function* pauseAndReturnValues(num){
    for(let i = 0; i < num; i++){
        yield i;
    }
}
var gen = pauseAndReturnValues(3);
gen.next(); // {value: 0, done: false}
gen.next(); // {value: 1, done: false}
gen.next(); // {value: 2, done: false}
gen.next(); // {value: undefined, done: true}

//insead of copying .next() everytime we use for loop
for(val of pauseAndReturnValues(3)){
    console.log(val);
}

//pausing async code with generator functions
function* getMovieData(movieName){
    console.log('starting');
    yield $.getJSON(`https://cmdbapi.com?t=${movieName}&apikey=thewdb`);
    console.log('ending');
}
var movieGetter = getMovieData('titanic');
movieGetter.next().value.then(val => console.log(val));

//Case 10:
//Object assign:
//problem of the object assign is that if there is an object inside we object we are
//copying, the reference to the inner object will still be there(not a deep clone)
var o1 = {name:'borna1'};
var o2 = o1;
o2.name = 'borna2';
o1.name; //borna2;

var o3 = {name:'borna3'};
var o4 = Object.assign({},o3);
o4.name = 'borna4';
o3.name; //borna3

//Case 11:
//Array.from
//what array from does is it converts array like objects(looks like an array but doesent have all the methods like .reduce...) to an array
var divs = document.querySelector('divs');
//how we did it in es5:
var coverted = [].slice.call(divs);
//es2015:
var coverted = Array.from(divs);


//Case 12:
//find:
//if value is found and we return true,
//we append that value to the new array that we get from .find method
var instructors = [{name: 'Elie'}, {name: 'Matt'}, {name: 'Tim'}, {name: 'Colt'}];
instructors.find(function(val){
    return val.name === 'Tim';
}); // {name: 'Tim'}

//Case 13:
//findIndex:
//same as find but returns index
instructors.findIndex(function(val){
   return val.name === 'Tim';
}); // 2 (index of 'Tim' in the array)

//Case 14:
//includes:
//es5:
'awesome'.indexOf('some') > -1; // true
//es2015:
'awesome'.includes('some'); // true

//Case 15:
//Number.isFinite
//we cannot always use type of 'number' beacue  NaN is also a number
//es5:
var num = 2;
if(typeof num === 'number' && !isNaN(val)){
    console.log('it is a number!');
}
//es2015:
if(Number.isFinite(num)){
    console.log('it is a number!');
}
if(Number.isInteger(num)){
    console.log('it is a integer!');
}

//CODING EXERCISE 1:
/*
Write a function called copyObject, which accepts one parameter, an object. The function should return a shallow copy of the object.

var o = {name: 'Elie'}
var o2 = copyObject({}, o)
o2.name = "Tim"
o2.name // 'Tim'
o.name // 'Elie'
*/

function copyObject(obj){
    return Object.assign({},obj);
}

/*

Write a function called checkIfFinite which accepts one parameter and returns true if that parameter is a finite number.

checkIfFinite(4) // true
checkIfFinite(-3) // true
checkIfFinite(4. // .toEqual(true
checkIfFinite(NaN) // false
checkIfFinite(Infinity) // false
*/

function checkIfFinite(val){
    return Number.isFinite(val);
}

/*

Write a function called areAllNumbersFinite which accepts an array and returns true if every single value in the array is a finite number, otherwise return false.

var finiteNums = [4,-3,2.2]
var finiteNumsExceptOne = [4,-3,2.2,NaN]
areAllNumbersFinite(finiteNums) // true
areAllNumbersFinite(finiteNumsExceptOne) // false
*/

function areAllNumbersFinite(arr){
    return arr.every(Number.isFinite); //every should accept a callback function or a function but Number.isFinite is already a function
}

/*

Write a function called convertArrayLikeObject which accepts a single parameter, an array like object. The function should return the array like object converted to an array.

var divs = document.getElementsByTagName('div')
divs.reduce // undefined

var converted = convertArrayLikeObject(divs)
converted.reduce // funciton(){}...
*/

function convertArrayLikeObject(obj){
    return Array.from(obj);
}

/*

Write a function called displayEvenArguments which accepts a variable number of arguments and returns a new array with all of the arguments that are even numbers.

displayEvenArguments(1,2,3,4,5,6) // [2,4,6]
displayEvenArguments(7,8,9) // [8]
displayEvenArguments(1,3,7) // []
*/

function displayEvenArguments(){
    return Array.from(arguments).filter(val => val % 2 === 0);
}
//or
function displayEvenArguments(...args){
    return args.filter(val => val % 2 === 0);
}
