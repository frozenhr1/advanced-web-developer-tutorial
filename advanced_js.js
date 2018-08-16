function halfValues(arr){
    var newArr = [];
    arr.forEach(function(value){
        newArr.push(value/2);
    })
    console.log(newArr);
    return newArr; // if there is no 'return' keyword in function, the function returns 'undefined'
}

halfValues([2,4,6]);


/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([5,1,2,3,10]) // [10,2,4,6,20]

*/
function doubleValues(arr){
    var newArr = [];
    arr.forEach(function(value){
        newArr.push(value*2);
    })
    return newArr;
}

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function

Examples:
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

*/
function onlyEvenValues(arr){
    var newArr = [];
    arr.forEach(function(value){
        if( value %2 == 0 ){
            newArr.push(value);
        }
    })
    return newArr;
}

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'udemy']) // ["ct", "mt", "tm", "uy"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/
function showFirstAndLast(arr){
    var newArr = [];
    var str = '';
    arr.forEach(function(value){
        var strLength = value.length
        str = value[0] + value[strLength-1];
        newArr.push(str);

    })
    return newArr;
}

/*
Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and returns the array passed to the function with the new key and value added for each object

Examples:
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor')

    // [{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]

*/
function addKeyAndValue(arr,key,value){
     arr.forEach(function(val){
        val[key] = value;
    });
    return arr;
}

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/
function vowelCount(str){
   var splitArr = str.toLowerCase().split("");
    console.log(splitArr);
    var obj = {};
    var vowels = ['a','e','i','o','u'];

    splitArr.forEach(function(letter){
        if(vowels.indexOf(letter) !== -1){
            if(obj[letter]){
                obj[letter]++;
            } else{
                obj[letter] = 1;
            }
        }
    });
    return obj;
}

/*
    MY SOLUTION : HOW MAP WORKS UNDER THE HOOD
*/
function map(array,callback){
    var newArr = [];
    for(var i = 0; i < array.length; i++){
        newValue = callback(array[i],i,array);
        newArr.push(newValue);
    }
    return newArr;
}

var arr = [1,2,3];
map(arr,function(value,index,array){
   return value*2;
});

//HOW WE USE MAP :BEACUSE IT IS A ALREADY BUILT IN FUNCTION
var arr = [1,2,3];
arr.map(function(value,index,array){
   return value*2;
});



/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([1,-2,-3]) // [2,-4,-6]
*/

function doubleValues(arr){
 return  arr.map(function(value){
     return value*2;
 });
}

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

function valTimesIndex(arr){
    return arr.map(function(value,index){
       return  value*index;
    });
}

/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractKey(arr, key){
    return arr.map(function(value){
       if(value[key]){
           return value[key];
       }
    });
}

/*
Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first" and the value of a key with the name of  "last" in each object, concatenated together with a space.

Examples:
    extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]) // ['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']
*/

function extractFullName(arr){
    return arr.map(function(value){
       return value['first'] + ' ' + value['last'];
    });
}

/*
    FILTER METHOD RETURNS AN ARRAY WITH THE SAME LENGTH AND
    ONLY ADDS VALUE TO THE ARRAY IF THE RETURN VALUE IS TRUE
*/
var instructors = [{name:'Elie'},{name:'Tim'},{name:'Matt'},{name:'Colt'}];
instructors.filter(function(value){
    return value.name.length > 3;
});


/*
    MY SOLUTION : HOW FILTER WORKS UNDER THE HOOD
*/
function filter(array,callback){
    var newArr = [];
    for (var i = 0;i < array.length; i++){
        if( callback(array[i],i,array) ){
            newArr.push(array[i]);
        }
    }
    return newArr;
}

var instructors = [{name:'Elie'},{name:'Tim'},{name:'Matt'},{name:'Colt'}];
filter(instructors,function(value){
    return value.name.length > 3;
});

/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
*/

function filterByValue(arr, key){
    return arr.filter(function(value){
       return value[key] !== undefined;
    });
}

/*
Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter or undefined if the value is not found in the array.

Examples:
    find([1,2,3,4,5], 3) // 3
    find([1,2,3,4,5], 10) // undefined
*/

function find(arr, searchValue){
     return arr.filter(function(val){
        return val === searchValue;
    })[0];
}

/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the arrayt.

Examples:
    findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true) // {first: 'Tim', last:"Garcia", isCatOwner: true}
*/

function findInObj(arr, key, searchValue){
    return arr.filter(function(value){
        return value[key] == searchValue;
    })[0]
    return newArr[0];
}

/*
Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed. Every character in the new string should be lowercased.

Examples:
    removeVowels('Elie') // ('l')
    removeVowels('TIM') // ('tm')
    removeVowels('ZZZZZZ') // ('zzzzzz')
*/

function removeVowels(str){
    var vowels = 'aeiou';
    return str.toLowerCase().split('').filter(function(value){
       return vowels.indexOf(value) == -1;
    }).join('');

}

/*
Write a function called doubleOddNumbers which accepts an array and returns a new array with all of the odd numbers doubled (HINT - you can use map and fitler to double and then filter the odd numbers).

Examples:
    doubleOddNumbers([1,2,3,4,5]) // [2,6,10]
    doubleOddNumbers([4,4,4,4,4]) // []
*/

function doubleOddNumbers(arr){
    return arr.filter(function(value){
        return value%2 !== 0;
    }).map(function(value){
        return value*2;
    })

}

/*
    'some' METHOD RETURNS TRUE IF VALUE EXISTS IN ARRAY
*/

var arr = [1,2,3];

arr.some(function(value){
   return value < 2;
});

/*
    MY SOLUTION : HOW 'some' WORKS UNDER THE HOOD
*/

function some(arr,callback){
    for(var i = 0;i < arr.length; i++){
        if(callback(arr[i],i,arr)){
            return true;
        }
    }
    return false;
}

var arr = [1,2,3];
some(arr,function(value){
   return value < 0;
});

/*
    'every' METHOD RETURNS TRUE IF EVERY VALUE EXISTS(EVERY VALUE IS TRUE) IN ARRAY
*/

var arr = [1,2,3];
arr.every(function(value){
   return value > 0;
});

/*
    MY SOLUTION : HOW 'every' WORKS UNDER THE HOOD
*/

function every(arr,callback){
    for(var i = 0;i < arr.length; i++){
        if(!callback(arr[i],i,arr)){
            return false;
        }
    }
    return true;
}


var arr = [1,2,3];

every(arr,function(value){
   return value > 0;
});


/*
Write a function called hasOddNumber which accepts an array and returns true if the array contains at least one odd number, otherwise it returns false.

Examples:
    hasOddNumber([1,2,2,2,2,2,4]) // true
    hasOddNumber([2,2,2,2,2,4]) // false
*/

function hasOddNumber(arr){
    return arr.some(function(value){
       return  value%2 !== 0;
    });
}

/*
Write a function called hasAZero which accepts a number and returns true if that number contains at least one zero. Otherwise, the function should return false

Examples:
    hasAZero(3332123213101232321) // true
    hasAZero(1212121) // false
*/

function hasAZero(num){
    return num.toString().split('').some(function(value){
       return  value == 0;
    });
}

/*
Write a function called hasOnlyOddNumbers which accepts an array and returns true if every single number in the array is odd. If any of the values in the array are not odd, the function should return false.

Examples:
    hasOnlyOddNumbers([1,3,5,7]) // true
    hasOnlyOddNumbers([1,2,3,5,7]) // false
*/

function hasOnlyOddNumbers(arr){
    return arr.every(function(value){
        return value %2 !== 0;
    });
}
/*
Write a function called hasNoDuplicates which accepts an array and returns true if there are no duplicate values (more than one element in the array that has the same value as another). If there are any duplicates, the function should return false.

Examples:
    hasNoDuplicates([1,2,3,1]) // false
    hasNoDuplicates([1,2,3]) // true
*/

function hasNoDuplicates(arr){
  return arr.every(function(val){
    return arr.indexOf(val) === arr.lastIndexOf(val)
  })
}

/*
Write a function called hasCertainKey which accepts an array of objects and a key, and returns true if every single object in the array contains that key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"},
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true},
        {title: "Instructor", first: 'Matt', last:"Lane"},
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]

    hasCertainKey(arr,'first') // true
    hasCertainKey(arr,'isCatOwner') // false
*/

function hasCertainKey(arr, key){
    return arr.every(function(value){
       return key in value;
    });
}

/*
Write a function called hasCertainValue which accepts an array of objects and a key, and a value, and returns true if every single object in the array contains that value for the specific key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"},
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true},
        {title: "Instructor", first: 'Matt', last:"Lane"},
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]

    hasCertainValue(arr,'title','Instructor') // true
    hasCertainValue(arr,'first','Elie') // false

*/

function hasCertainValue(arr, key, searchValue){
    return arr.every(function(value){
       return value[key] === searchValue;
    });
}

/*
    'reduce' METHOD RETURNS ACCERS 2 PARAMETERS, FIRST IS A CALLBACK FUNCTION AND SECOND IS A OPTIONAL PARAMETERS
    IF THE SECOND PARAMETER IS ADDED, THEN THE FIRST PARAMETER(accumulator) OF THE CALLBACK FUNCTION
    IS EQUAL TO THAT SECOND OPTIONAL PARAMETER, IF NOT THEN ACCUMULATOR IS EQUAL TO FIRST VALUE OF THE ARRAY.
    WHAT REDUCE DOES IS IT RETURNS VALUE ACCUMULATED THROUGH ARRAY IN THIS EXAMPLE :
    1+2 = 3
    3+3 = 6
    6+4 = 10
    10+5 = 15
*/

var arr = [1,2,3,4,5];
arr.reduce(function(accumulator,value){
    return accumulator + value;
});

var arr = ['Tim','Colt','Ellie','Matt'];
arr.reduce(function(accumulator,value){
    return accumulator + ' ' + value;
},'The instructors are');

var arr = [5,4,1,4,5];
arr.reduce(function(accumulator,nextValue){
    if(accumulator[nextValue]){
        accumulator[nextValue]++;
    } else {
        accumulator[nextValue] = 1;
    }
    return accumulator;
},{});

function sumOddNumbers(arr){
    return arr.reduce(function(accumulator,nextValue){
       if(nextValue%2 !== 0){
           accumulator+= nextValue;
       }
       return accumulator;
    },0);
}
sumOddNumbers([1,2,3,4,5]);


/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractValue(arr, key){
    return arr.reduce(function(accumulator,nextValue){
        accumulator.push(nextValue[key]);
        return accumulator;
    },[]);
}


/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

function vowelCount(str){
    var vowels = 'aeiou';
   return str.toLowerCase().split('').reduce(function(accumulator,nextValue){
      if( vowels.indexOf(nextValue) !== -1 ){
          if( accumulator[nextValue] ){
              accumulator[nextValue]++;
          } else{
              accumulator[nextValue] = 1;
          }
      }

      return accumulator;
   },{});
}

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];

    addKeyAndValue(arr, 'title', 'Instructor') //
      [
        {title: 'Instructor', name: 'Elie'},
        {title: 'Instructor', name: 'Tim'},
        {title: 'Instructor', name: 'Matt'},
        {title: 'Instructor', name: 'Colt'}
       ]
*/

function addKeyAndValue(arr, key, value){
    return arr.reduce(function(accumulator,nextValue, index){
        accumulator[index][key] = value;
        return accumulator;
    },arr);
}

/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray.

Examples:

    function isEven(val){
        return val % 2 === 0;
    }

    var arr = [1,2,3,4,5,6,7,8];

    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];

    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }

    var names = ['Elie', 'Colt', 'Tim', 'Matt'];

    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
*/

function isEven(val){
    return val % 2 === 0;
}

function partition(arr, callback){
    return arr.reduce(function(accumulator,nextValue){
        if(callback(nextValue)){
            accumulator[0].push(nextValue);
        } else {
            accumulator[1].push(nextValue);
        }
        return accumulator;
    },[[],[]])
}
