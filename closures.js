function outer(){
    var start = 'closeres are';
    var data = '123';
    return function inner(){ // inner function exists if the inner function uses variable from outer function
        //debugger; // if we stop here with debugger we will see that function inner has no acces to variable data, that is beacuse data is not being used in the inner function
        return start + " " + "awesome";
    }
}
outer()()

function outer(a){
    return function inner(b){ //the inner function does not need to have a name, it can be anonymous
        return a + b;
    }
}


/* we can call the function in three different ways */
outer(5)(5); // call both outer and inner function with 2 params
var storeOuter = outer(5); // first call outer function with 1 parameter
storeOuter(10); // then call the inner function from a variable with the second parameter

/*
    this is not a closure becase the inner function does not make use of outer function variables
    this is called a nested function
*/
function outerFn(){
    var data = 'something from outer';
    return function innerFn(){
        return 'just returned from the inner function';
    }
}
outerFn()();

function counter(){
    var count = 0;
    return function(){
        count++;
        return count;
    }
}

var counter1 = counter();
counter1(); // 1
counter1(); // 2

var counter2 = counter();
counter1(); // 1
counter2(); // 2

counter1(); // 3 this is not affected by counter2;
//count; // ReferenceError: count is not defined - because it is private!

function classRoom(){
    var instructors = ['Elie','Colt'];
    return {
        getInstructors: function(){
            return instructors.slice(); // the slice methods returns a copy of an array modified and it does not change the original array, we use this so we cannot modify the private variable by lets say first.getInstructors().pop()
        },
        addInstructors: function(instructor){
            instructors.push(instructor);
            return instructors.slice();
        }
    }
}
first = classRoom();
first.getInstructors();
first.addInstructors('borna'); //after adding the instructor we cannot access the original array beacuse we not return copy of the array, slice prevents from modyfing the original array

/*
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.

Examples:

    specialMultiply(3,4); // 12
    specialMultiply(3)(4); // 12
    specialMultiply(3); // function(){}....
*/

function specialMultiply(a,b){
    if(arguments.length === 2){
        return a*b;
    }
    return function inner(b){
        return a*b;
    };
}

/*
Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "Your guess is too high!" and if it is too low, return "Your guess is too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.

Examples (yours might not be like this, since the answer is random every time):

    var game = guessingGame(5)
    game(1) // "You're too low!"
    game(8) // "You're too high!"
    game(5) // "You're too low!"
    game(7) // "You got it!"
    game(1) // "You are all done playing!"

    var game2 = guessingGame(3)
    game2(5) // "You're too low!"
    game2(3) // "You're too low!"
    game2(1) // "No more guesses the answer was 0"
    game2(1) // "You are all done playing!"
*/

function guessingGame(amount){
    var answer = Math.floor(Math.random()*11);
    var guesses = 0;
    var completed = false;
    return function(guess){
        if(!completed){
            guesses++
            if(guess === answer) {
                completed = true;
                return "You got it!"
            }
            else if(guesses === amount) {
                completed = true;
                return "No more guesses the answer was " + answer;
            }
            else if(guess > answer) return "Your guess is too high!"
            else if(guess < answer) return "Your guess is too low!"
        }
        return "You are all done playing!"
    }
}
