//Case 1:
//Exponentiation Operator **
//ES5:
var calculatedNumber = Math.pow(2,4);
calculatedNumber; //2^4 = 16
//ES2016:
var calculatedNumber = 2**4;
calculatedNumber; //16
//can also be used with **= operator for example : total **= nums[i];

//Case 2:
//[].includes
//in ES2015 it was used for strings, in ES2016 we can also use them for arrays
//ES5:
var nums = [1,2,3,4,5];
nums.indexOf(5) > -1; //true
//ES2016:
var nums = [1,2,3,4,5];
nums.includes(5); //true

//Case 3:
//padStart and padEnd:
/*
    the first parameter is how long is the string
    for example if the string is 9 char long and we enter number less than 10
    there wont be any change to the string itself
    if we enter string >= 10, the second parameter we enter is gonna add that
    parameter('string') to the start of the string
    same goes for padEnd but we add the string to the end of the string
*/
"awesome".padStart(10); // "   awesome"
"awesome".padStart(10,'!'); // "!!!awesome"
"awesome".padEnd(10,'!'); // "awesome!!!"

//Case 4:
//Async Functions:
async function first(){
    return 'we did it';
}
first(); // returns a promise
first().then(val => console.log(val)); // 'we did it'
//Keyword await:
//the await keyword waits for the promise to resolve, and then resumes the async functions execution and returns the resolved value
async function getMovieData(){
    console.log('starting');
    var movieData = await $.getJSON('https://cmdbapi.com?t=titanic&apikey=thewdb');
    // this line does NOT run until the promise is resolved!
    console.log('all done!');
    console.log(movieData);
}
getMovieData(); //logs an object with data about the movie!

var movieCollector = {
    data: 'titanic',
    async getMovie(){
        var response = await $.getJSON(`https://cmdbapi.com?t=&{this.data}&apikey=thewdb`);
        console.log(response);
    }
}
movieCollector.getMovie();

//we should use try catch in case the promise gets rejected
class MovieData{
    constructor(name){
        this.name = name;
    }
    async getMovie(){
        try{
            var response = await $.getJSON(`https://cmdbapi.com?t=&{this.data}&apikey=thewdb`);
            console.log(response);
        }catch(e){
            console.log('err', e);
        }
    }
}
var m = new MovieData('shrek');
m.getMovie();

//the problem here is that the responseTwo wont run until the responseOne is done
//image if the first http request took 2 seconds and the second one aswell, it would take alot of time
//to run both promises
async function getMovieData(){
    var responseOne = await $('https://cmdbapi.com?t=titanic&apikey=thewdb');
    var responseTwo = await $('https://cmdbapi.com?t=shrek&apikey=thewdb');
    console.log(responseOne);
    console.log(responseTwo);
}
//to fix the problem above:
//we start the http requests parallel and then await their resolved promise!
async function getMovieData(){
    var responseOne = $('https://cmdbapi.com?t=titanic&apikey=thewdb');
    var responseTwo = $('https://cmdbapi.com?t=shrek&apikey=thewdb');
    var titanicData = await responseOne;
    var shrekData = await responseTwo;
    console.log(responseOne);
    console.log(responseTwo);
}

//await with Promise.all
async function getMovieData(first, second){
    var moviesList = await Promise.all([
        $.getJSON(`https://cmdbapi.com?t=${first}&apikey=thewdb`),
        $.getJSON(`https://cmdbapi.com?t=${second}&apikey=thewdb`)
    ]);
    console.log(moviesList[0].Year);
    console.log(moviesList[1].Year);
}

getMovieData('shrek', 'blade');


async function getMostFollowers(...usernames){
  let baseUrl = "https://api.github.com/users/"
  let urls = usernames.map( value => $.getJSON(baseUrl + value));
  let results = await Promise.all(urls);
  let max = results.sort((a,b) => a.followers < b.followers)[0];
  return `${max.name} has the most followers with ${max.followers}`
}
getMostFollowers('elie','colt','tigarcia').then(function(data){
    console.log(data);
})

async function starWarsString(id){
  let str = '';
  let results = await $.getJSON(`https://swapi.co/api/people/${id}/`);
  str += `${results.name} is featured in `;
  let filmData = results.films[0]
  let res = await $.getJSON(filmData);
  str += `${res.title}, directed by ${res.director} `
  let planetData = res.planets[0]
  let moreRes = await $.getJSON(planetData)
  str += `and it takes place on ${moreRes.name}`;
  return str;
}
starWarsString(1).then(function(data){
    console.log(data);
})

//Case 5:
//Object Rest and Spread
//Rest:
var instructor = {first:'Elie', last:'Schoppik', job:'Instructor', numSiblings:3};
var {first, last, ...data} = instructor;
first; // Elie
last; // 'Schoppik'
data; // {job: 'Instructor', numSiblings: 3}
//Spread:
var defaults = {job: 'Instructor', ownsCat:true, ownsDog:true};
var matt = {...defaults, ownsCat: false};
var colt = {...defaults, ownsDog: false};
