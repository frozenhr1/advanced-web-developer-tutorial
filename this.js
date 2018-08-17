console.log(this) // window

function whatIsThis(){
    return this;
}
whatIsThis(); //window

function variablesInThis(){
    this.person = 'Elie';
}

variablesInThis(); // after we call the function this.person ads variable person to global scope(window) and makes the variable person global
console.log(person); // Elie

var borna1 = 'borna'; // not global variable
borna2 = 'borna'; // global variable

var person = {
    firstName: 'Elie',
    sayHi: function(){
        return 'Hi ' + this.firstName;
    },
    determineConext: function(){
        return this === person;
    }
}
person.sayHi(); // hi Elie
person.determineConext(); // true

var test = {
    firstName: 'borna',
    determineConext: this // window. keyword 'this' is defined when a cuntion is run!
};
test.determineConext;

var person = {
    firstName: "Colt",
    sayHi: function(){
        return "Hi " + this.firstName; // Hi Colt
    },
    determineConext:function(){
        return this === person; // true
    },
    dog: {
        sayHello: function(){
            return "Hello "+ this.firstName; // Hello undefined
        },
        determineConext: function(){
            return this === person; // false because 'this' refers to dog now, beacuse dog is the parent object
        }
    }
}

person.dog.sayHello(); // Hello undefined
person.dog.sayHello.call(person) // Hello Colt
person.dog.determineConext(); // false
person.dog.determineConext.call(person); // true

var colt = {
    firstName: 'Colt',
    sayHi: function(){
        return 'Hi ' + this.firstName;
    }
}

var elie = {
    firstName: 'Elie'
}
colt.sayHi(); //Hi Colt
colt.sayHi.call(elie); // Hi Elie


function sayHi(){
    return 'Hi ' + this.firstName;
}

var colt = {
    firstName: 'Colt'
}
var elie = {
    firstName: 'Elie'
}

sayHi(); // Hi undefined
sayHi.call(colt); // Hi Colt
sayHi.call(elie); // Hi Elie
sayHi.appy(elie); // Hi Elie

var divs = document.querySelector('div'); // select all divs on the page
var divsArray = [].slice.call(divs); //slice makes a copy of an array and we add all the divs we found to that array

divsArray.filter(function(val){
   return val.innerText === 'Hello'; //filter those that have innerText 'Hello'
});

//The only difference between call and apply is the parameters they pass, apply passes this, + arr or aguments(this,[1,2,3]) while call passes this + parameters separeted by comma (this,1,2,3,4)

function addNumbers(a,b,c,d){
    return this.firstName + ' just calculated ' + (a+b+c+d);
}
var colt = {
    firstName: 'Colt'
}
var elie = {
    firstName: 'Elie'
}
addNumbers.call(elie,1,2,3,4); //"Elie just calculated 10"
addNumbers.apply(elie,[1,2,3,4]); //"Elie just calculated 10"

var nums = [5,7,1,2,4,6];
Math.max(nums); // NaN beacuse nums should be numbers comma separeted(5,7,1,2,4,6) but we try to pass an array
//fix :
Math.max.apply(this,nums);

function addNumbers(a,b,c,d){
    return this.firstName + " just calculated " + (a+b+c+d);
}
var elie = {
    firstName: 'Elie',
    sayHi : function(){
        setTimeout(function(){
            console.log("Hi " + this.firstName);
        }.bind(this),2000) // we use bind when using async code, if we were to use call the function would be invoked imidiately and that is not what we want
    }
}
var elieCalc = addNumbers.bind(elie,1,2); //the function will not imidiately be invoked
elieCalc(3,4); //the function is invoked
elie.sayHi(); // prints Hi Elie after 2seconds

/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject){
   return [].slice.call(arrayLikeObject);

}

/*
// Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.

Examples:
    sumEvenArguments(1,2,3,4) // 6
    sumEvenArguments(1,2,6) // 8
    sumEvenArguments(1,2) // 2
*/

function sumEvenArguments(){
    var newArgs = [].slice.call(arguments);
    return newArgs.reduce(function(acc,next){
        if(next % 2 === 0){
            return acc+next;
        }
        return acc;
    },0);
}

/*
Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a function that when called increments a counter. If the counter is greater than the maximum amount, the inner function should return "Maxed Out"

Examples:

    function add(a,b){
        return a+b
    }

    var addOnlyThreeTimes = invokeMax(add,3);
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(2,2) // 4
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(1,2) // "Maxed Out!"

*/

function invokeMax(fn, num){
    var counter = 0;
    return function(){
        if(counter >= num){
            return 'Maxed Out!';
        }
        counter++;
        return fn.apply(this,arguments);
    };
}

/*
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined

    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }

    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined


*/

function once(fn, thisArg){
 var hasBeenCalled = false;
 return function(){
     if(!hasBeenCalled){
        hasBeenCalled = true;
        return fn.apply(thisArg,arguments);
     }
 };
}

// BONUSES!

/*
Write a function called bind which accepts a function and a value for the keyword this.
Bind should return a new function that when invoked, will invoke the function passed to bind with the
correct value of the keyword this.
HINT - if you pass more than two parameters to bind, those parameters should be
included as parameters to the inner function when it is invoked. You will have to make use of closure!

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

function bind(fn, thisArg){
    var outerArgs = [].slice.call(arguments,2); // if we pass more than 2 arguments to the function, get the rest arguments
    return function(){
        var innerArguments = [].slice.call(arguments); // get all arguments passed to the inner function
        var args = outerArgs.concat(innerArguments); // contact all arguments together
        fn.apply(thisArg,args);
    }
}

/*
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Flip should return a new function that when invoked takes the correct number of required arguments to that function which are then reversed. HINT - you will need to use the .length property on functions to figure out the correct amount of arguments. For example:

flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10)




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

    function subtractFourNumbers(a,b,c,d){
        return a-b-c-d;
    }

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/



function flip(fn, thisArg){
    var outerArgs = [].slice.call(arguments,2); // if we pass more than 2 arguments to the function, get the rest arguments
    return function(){
        var innerArguments = [].slice.call(arguments); // get all arguments passed to the inner function
        var args = outerArgs.concat(innerArguments).slice(0, fn.length); // take only the number of arguments that the function accepts
        fn.apply(thisArg,args.reverse());
    }
}
