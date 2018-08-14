function getBitcoinPrice() {

    var elem = document.querySelector('#price');
    var currency = document.querySelector('#currency').value;

    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
        if( XHR.readyState == 4 ) {
            if( XHR.status == 200 ) {
                var data = JSON.parse( XHR.responseText );
                console.log(data['time']['updated']);
                console.log(data.time.updated);
                if ( currency == 'USD' || currency == 'GBP' || currency == 'EUR') {
                    elem.innerText = data.bpi[currency].rate + ' ' + currency
                }
                else{
                    alert('please select a currency!');
                }
            }
            else {
                console.log("Something went wrong");
            }
        }
    }

    XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");



    XHR.send();

}

var btn = document.querySelector('#btn');
btn.addEventListener('click', function(){
    getBitcoinPrice();
});

document.addEventListener('DOMContentLoaded', function(){
    getBitcoinPrice();
}, false);
