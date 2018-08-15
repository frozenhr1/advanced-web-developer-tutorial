$('#btn').click(function(){
    $.ajax({
        method:'GET',
        url:'https://baconipsum.com/api/?type=meat-and-filler',
        dataType: 'json' //if no datatype is specified, jquery uses a 'smart guess' and guesses the data type we are reciveing and tries to parse it
    })
    .done(appendData)
    .fail(function(error){
        console.log(error);
    })
})

function appendData(data){
    console.log(data);
    $("p").text(data[0]);
}

/* DIFFERENCE BETWEEN AJAX AND THESE 3 OTHER METHODS ARE THAT U DONT NEED TO PASS THE WHOLE OBJECT
   BUT ONLY ONLY PARAMETERS SEPARTEDED BY COMMA (,) FOR EXAMPLE '$.post(url,data)' WHILE WITH AJAX
    YOU WOULD NEED TO TYPE
    '$.ajax({
        method:'POST',
        url:'https://baconipsum.com/api/?type=meat-and-filler',
        data: {'asd':'asd'}
    })'
*/
$('#getBtn').click(function(){
    var url = 'https://baconipsum.com/api/?type=meat-and-filler';
    $.get(url)
    .done(function(data){
        console.log(data);
    })
});

$('#postBtn').click(function(){
    var url = 'https://baconipsum.com/api/?type=meat-and-filler';
     var data = {name: "Charlie", city: "Florence"};
    $.post(url,data)
    .done(function(data){
        console.log(data);
    })
    .fail(function(error) {
        console.log(error);
    })
});

$('#getJSONBtn').click(function(){
    var url = 'https://baconipsum.com/api/?type=meat-and-filler';
    $.getJSON(url)
    .done(function(data){
        console.log(data);
    })
    .fail(function(error){
        console.log(error);
    })
});


$("#getRandomCat").click(function(){
    var url = "http://aws.random.cat/meow";
    $.getJSON(url)
    .done(appendCatImage)
    .fail(handleErrors);
});

function appendCatImage(data){
    var catImageHTML = $('#catImage');
    var image = data.file
    catImageHTML.attr('src',image);
}

function handleErrors(error){
    console.log('something went wrong ',error);
}


var axiosBtn = document.querySelector("#axios");
axiosBtn.addEventListener('click',axiosFunction);


function axiosFunction(){
    var url = 'https://opentdb.com/api.php';
    axios.get(url,{
        params:{
            amount:1
        }
    })
    .then(function(res){
        console.log(res.data.results[0].question);
    })
    .catch(function(error){
        if (error.response) {
            console.log("Problem With Response ", error.response.status);
        } else if (error.request) {
            console.log("Problem With Request!");
        } else {
            console.log('Error', error.message);
        }
    })
}

/*
    IE doesn't support Promises, Axios fails
    Javier Ramos · Lecture 94 · 2 months ago
    By default, you cannot use Axios on IE because it doesn't support promises. You have to include a promise polyfill
    Just include this tag:
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
*/


/*
    JQUERY IS GOOD BUT NEWEST JAVASCRIPT VERSIONS MAKE THE CODE ALMOST AS SMALL AS JQUERY DOES
    BUT MOST OF THE PEOPLE USE JQUERY .ajax, .getJson, ... SO THEY DONT USE THE XMLHttpRequest WHOS SYNTAX IS UGLY AND BULKY
    SO NOWDAYS YOU CAN USE PURE JAVASCRIPT AND INSTEAD OF .ajax METHOD YOU CAN INCLUDE LIBRARY CALLED AXIOS
    SO WE DONT INCLUDE THE WHOLE JQUERY LIBRARY WHICH IS PRETTY BIG
*/
