
var url = "https://randomuser.me/api/";
var btnHTML = document.querySelector("#btn");
var nameHTML = document.querySelector("#fullname");
var usernameHTML = document.querySelector("#username");
var emailHTML = document.querySelector("#email");
var cityHTML = document.querySelector("#city");
var avatarHTML = document.querySelector("#avatar");

btn.addEventListener('click',function(){
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError)
})

function handleErrors(request) {
    if( !request.ok ){
        throw Error(request.status)
    }
    return request;
}

function parseJSON(request) {
    return request.json()
    .then(function(request){
        return request.results[0];
    });
}

function updateProfile(data){
    nameHTML.innerText = data.name.first + ' ' + data.name.last;
    usernameHTML.innerText = data.login.username;
    emailHTML.innerText = data.email;
    cityHTML.innerText = data.location.city;
    avatarHTML.src = data.picture.medium;
}

function printError(error) {
    console.log('ERROR: ',error);
}
