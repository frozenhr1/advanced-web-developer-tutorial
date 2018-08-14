function fetchTest(){

    var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

    fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name: 'blue',
            login: 'bluecat'
        })
    })
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data.bpi.EUR.rate);
    })

}

var btn = document.querySelector("button");
//CATCH THROWS A ERROR REGARDING SOMETHING LIKE : THE INTERNET IS NOT WORKING OR THE CREDENTIALS ARE WRONG BUT IT DOESENT CHECK
//IF THE REQUEST IS VALID
//WE NEED TO CHECK IF THE REQUEST IS VALID WHICH MEANS IT RETURNS A 200 STATUS WITH request.ok

btn.addEventListener("click",function(){
    var url = 'https://api.github.com/users/coltš';
    fetch(url)
    .then(handleErrors)
    .then(function(request){
        console.log('everything is fine', request);
    })
    .catch(function(error){
        console.log("There is a problem", error);
    })
})

function handleErrors(request){
    if(!request.ok) {
        throw Error(request.status) // makes the promise go to .catch
    }
    return request;
}
