function House(bedrooms, bathrooms, numSqft){
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

var firstHouse = new House(1,2,3);
firstHouse.bedrooms;

function Dog(name, age){
    this.name = name;
    this.age = age;
    this.bark = function(){
        console.log(this.name + ' just barked!');
    }
}

maksi = new Dog('maksi', 4);
maksi.bark();


function Car(make, model, year){ // constructor
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}
function Motorcycle(make, model, year){
    Car.call( this, make, model, year);
    this.numWheels = 4;
}
car1 = new Car('Toyota', 2002, 2002);
motorcycle1 = new Motorcycle('Kavasaki', 2005, 2005);
console.log(car1);
console.log(motorcycle1);



// PART 1

// Create a constructor function for a Person, each person should have a firstName, lastName, favoriteColor and favoriteNumber. Your function MUST be named Person.

// Write a method called multiplyFavoriteNumber that takes in a number and returns the product of the number and the object created from the Person functions' favorite number.

// PART 2

// Given the following code - refactor the Child function to remove all the duplication from the Parent function. You should be able to remove 4 lines of code in the Child function and replace it with 1 single line.


function Person(firstName, lastName, favoriteColor, favoriteNumber){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteNumber = favoriteNumber;
    this.multiplyFavoriteNumber = function(number){
        return number * this.favoriteNumber;
    };
}


function Parent(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
}

function Child(firstName, lastName, favoriteColor, favoriteFood){
    Parent.call(this, arguments);
}


function Person(name){
    this.name = name;
}
var elie = new Person("Elie");
console.log(elie.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true



function Person(name){
    this.name = name;
}
var elie = new Person('elie');
var colt = new Person('colt');
Person.prototype.isInstructor = true;

/*
    THESE BOTH EXAMPLES ARE TRUE BEACUSE NEW PROPERTY 'isInstructor' is added TO Person.prototype.
    Person.prototype === elie.__proto__
    HOW JAVASCRIPT WORKS IS, IT SEARCHES FOR A PROPERTY INSIDE OF A OBJECT AND IF IT DOESENT FIND IT
    IT SEARCHES INTO __proto__ PROPERTY OF A OBJECT.
    LETS TAKE A EXAMPLE OF ARRAY :
    WHEN WE TYPE arr = [], THAT IS ACTUALLY EQUAL TO arr = new Array();
    WE CAN NOW ADD A PROPERTY TO ARRAY CONSTRUCTOR : Array.prototype.borna = 'borna'
    AND ACCESS IT IN ALL ARRAY INSTANCES : arr.borna WHICH IS EQUAL TO 'borna'
*/
colt.isInstructor // true,
elie.isInstructor // true


/*
    DEFINING FUNCTIONS INSIDE A CONSTRUCTOR MODEL ISNT EFFICIENT BEACUSE WHEN WE DEFINE THAT FUNCTION
    IN THE CONSTRUCTOR MODEL, WHEN CREATING A NEW INSTANCE OF A OBJECT WE REDEFINE THAT PROPERTY FOR EVERY INSTANCE
    LETS SAY 'sayHi' FUNCTION ALLOCATES 4 BYTES, WHEN WE CREATE A NEW INSTANCE WE ALLOCATE 4 ADDITONAL BYTES FOR EVERY INSTANCE
    BUT IF WE WERE TO ADD sayHi FUNCTION TO ONE PLACE WE WOULD ALLOCATE ONLY 4 BYTES FOR ALL INSTANCES
    THIS IS HOW WE DO THAT :
    Person.prototype.sayHi = function(){
        return 'Hi ' + this.name;
    }
*/
function Person(name){
    this.name = name;
}
elie = new Person('Elie');
Person.prototype.sayHi = function(){
    return 'Hi ' + this.name;
}
elie.sayHi(); //Hi Elie


// EFFICIENT WAY OF WRITING OOP
function Vehicle(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}
Vehicle.prototype.turnOn = function(){
    this.isRunning = true;
}
Vehicle.prototype.turnOff = function(){
    this.isRunning = false;
}
Vehicle.prototype.honk = function(){
    if(this.isRunning === true){
        return 'beep';
    }
}



// 1 - Create a constructor function for a Person. Each person should have a firstName, lastName, favoriteColor, favoriteNumber)

/* 2 - Add a function on the Person.prototype called fullName that returns the firstName and lastName property of an object created by the Person constructor concatenated together.

Examples:
    var person = new Person("Elie", "Schoppik", "purple", 34)
    person.fullName() // "Elie Schoppik"

*/

function Person(firstName, lastName, favoriteColor, favoriteNumber){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteNumber = favoriteNumber;
    this.family = [];
}

Person.prototype.fullName = function(){
    return this.firstName + ' ' + this.lastName;
}

Person.prototype.addToFamily = function(person){
    if(person instanceof Person){
        if(this.family.indexOf(person) === -1){
            this.family.push(person);
        }
    }
    return this.family.length;
}

// 3 -  Add a property on the object created from the Person function called family which is an empty array. This will involve you going back and adding an additional line of code to your Person constructor you previously created in exercise 1.

/* 4 - Add a function on the Person.prototype called addToFamily which adds an object constructed from the Person constructor to the family array. To make sure that the object you are adding is an object construced from the Person constructor (HINT - take a look at the instanceof keyword). Make sure that your family array does not include duplicates! This method should return the length of the family array.


Examples:

    var person = new Person("Elie", "Schoppik", "purple", 34)
    var anotherPerson = new Person()
    person.addToFamily(anotherPerson); // 1
    person.addToFamily(anotherPerson); // 1
    person.family.length // 1

    person.addToFamily("test"); // 1
    person.addToFamily({}); // 1
    person.addToFamily([]); // 1
    person.addToFamily(false); // 1
    person.family.length // 1
*/

// PART II

// 1 - Implement your own version of Array.prototype.map. The function should accept a callback and return a new array with the result of the callback for each value in the array.

Array.prototype.map = function(callback){
  var newArr = [];
  for(var i = 0; i < this.length; i++){
    newArr.push(callback(this[i], i, this))
  }
  return newArr;
}

/* 2 - Implement a function called reverse that reverses a string and place it on the String.prototype

Examples:
    "test".reverse() // "tset"
    "tacocat".reverse() // "tacocat"
*/

String.prototype.reverse = function(){
  var newStr = '';
  for(var i = this.length -1; i >= 0; i--){
    newStr += this[i]
  }
  return newStr;
}



// 1 - Create a constructor function for a Vehicle. Each vehicle should have a make, model and year property.

// 2 - Add a function to the Vehicle prototype called start which returns the string "VROOM!"

// 3 - Add a function to the Vehicle prototype called toString which returns the string "The make, model, and year are" concatenated with the make, model and year property

/* Examples
    var vehicle = new Vehicle("Tractor", "John Deere", 1999)
    vehicle.toString() // 'The make, model, and year are Tractor John Deere 1999'
*/

// 4 - Create a constructor function for a Car. Each object created from the Car function should also have a make, model, and year and a property called numWheels which should be 4. The Car prototype should inherit all of the methods from the Vehicle prototype

// 5 - Create a constructor function for a Motorcycle. Each object created from the Motorcycle function should also have a make, model, and year and a property called numWheels which should be 2. The Motorcycle prototype should inherit all of the methods from the Vehicle prototype

function Vehicle(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;

}

Vehicle.prototype.start = function(){
    return 'VROOM!';
};

Vehicle.prototype.toString = function(){
  return "The make, model, and year are " + this.make + " " + this.model  + " " + this.year;
};

function Car(){
    this.numWheels = 4;
    Vehicle.apply(this,arguments);
}

Car.prototype = Object.create(Vehicle.prototype); // almost like we did 'new object' but also ads all Vehicle methods to car
Car.prototype.constructor = Car; // since we added the vehicle prototype, the constructor equals to vehicle so we need to set the constructor to equal car

function Motorcycle(){
    this.numWheels = 2;
    Vehicle.apply(this,arguments);
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;
