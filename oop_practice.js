CTRL = {};

CTRL.Lottery = function(name, totalNumbers, frequencySeconds){
    this.name = name;
    this.totalNumbers = totalNumbers;
    this.players = [];
    this.frequencySeconds = frequencySeconds;
    this.numbers = [];
    this.odds = [3.8, 14.5, 70];
}

CTRL.Lottery.prototype.generateNumbers = function(){
    this.numbers = [];
    for(var i = 0; i < this.totalNumbers; i++){
        this.numbers.push(Math.ceil(Math.random() * 80));
    }
    this.numbers = this.numbers.sort((a, b) => a - b); //sort() sorts alphabetically so we need to add extra arguments to sort numerically
    return this.numbers;
}

CTRL.Lottery.prototype.winLose = function(player){


    var playedNumbers = player.numbers;
    var playedNumbersLength = playedNumbers.length;
    var hits = 0;
    var lotteryNumbers = this.numbers;
    var win = false;
    playedNumbers.forEach(function(val){
        if( lotteryNumbers.indexOf(val) !== -1){
            hits++;
        }
    });


    if( hits === playedNumbersLength){
        win = true;
    }
    else if( hits > 1 && hits === (playedNumbersLength-1) ){
        win = true;
    }

    player.res['win'] = win;
    player.res['string'] = win === true ? 'win' : 'lose';
    player.res['hits'] = hits;


    return player.res;
}

CTRL.Lottery.prototype.winnings = function(player){

    var winning = 0.00;
    if( player.res['win'] === true ){
        winning = +(0.95 * player.bet * this.odds[(player.res['hits'] -1)] ).toFixed(2);
    }
    player.currentBalance = player.currentBalance + winning;
    return winning;
}

CTRL.Lottery.prototype.validate = function(){
    var newArray = this.players.filter(function(value){
        return value.currentBalance > 0;
    });

    this.players = newArray;
}

CTRL.Player = function(name, buyIn){
    this.name = name;
    this.buyIn = buyIn;
    this.currentBalance = buyIn;
    this.numbers = [];
    this.res = {};
    this.bet;
}

CTRL.Player.prototype.playedNumbers = function(){
    this.numbers = [];
    var range = Math.ceil(Math.random() * 3);
    for(var i = 0; i < range; i++){
        this.numbers.push(Math.ceil(Math.random() * 80));
    }
    this.numbers = this.numbers.sort((a, b) => a - b); //sort() sorts alphabetically so we need to add extra arguments to sort numerically
    return this.numbers;
}

CTRL.Player.prototype.payment = function(){
    this.bet = Math.ceil(Math.random() * 5).toFixed(2);
    this.currentBalance = +this.currentBalance.toFixed(2);
    if( this.bet > this.currentBalance ){
        this.bet = this.currentBalance;
    }
    this.currentBalance = this.currentBalance - this.bet;
    return this.bet;
}

//TODO: these 3 functions should be in a object

function timeNow() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
}

function ticker(lottery){
    var seconds = lottery.frequencySeconds;
    appendLottery(lottery);
    intervalId = setInterval(function () {
        seconds--;
        if(seconds === 0){
            $('.timer').text(seconds);
            $("div").removeClass("timer");
            clearInterval(intervalId);
            ticker(lottery);
        } else {
            $('.timer').text(seconds);
        }
    }, 1000);

}

function appendLottery(lottery){

    lottery.validate();
    var $main = $('#lottery');
    var $container = $('<div class="container"></div>');

    var $first = $('<div class="first"></div>');
    var $ul1 = $('<p class="ul1">Extraction Time</p>');
    var $extractionTime = $('<p class="Extractiontime">'+ timeNow().slice(0,5) +'</p>');
    $first.append($ul1, $extractionTime);

    var $second = $('<div class="second"></div>');
    var $ul2 = $('<p class="ul1">Extracted numbers</p>');
    var $wresults = $('<p class="wresults">'+lottery.generateNumbers()+'</p>'); //lottery numb
    $second.append($ul2, $wresults);

    var $third = $('<div class="third"></div>');
    var $ul3 = $('<p class="ul3">Time left:</p>');
    $third.append($ul3);

    var $thirdd = $('<div class="thirdd"></div>');
    var $timerr = $('<div class="timerr"></div>');
    var $timer = $('<div class="timer">'+lottery.frequencySeconds+'</div>'); //timer
    $thirdd.append($timerr, $timer);

    var $forth = $('<div class="forth"></div>');
    var $ul4 = $('<p class="ul4">Players</p>');

    var $fifth = $('<div class="fifth"></div>');
    var $ul5 = $('<p class="ul5">Played Numbers</p>');

    var $sixt = $('<div class="sixt"></div>');
    var $ul6 = $('<p class="ul6">Payment</p>');

    var $seventh = $('<div class="seventh"></div>');
    var $ul7 = $('<p class="ul7">Betting Status</p>');

    var $eight = $('<div class="eight"></div>');
    var $ul8 = $('<p class="ul8">Winnings</p>');

    var $ninth = $('<div class="ninth"></div>');
    var $ul9 = $('<p class="ul9">Current Balance</p>');

    var playerNames = '';
    var playerNumbers = '';
    var playerPayment = '';
    var playerBettingStatus = '';
    var playerWinnings = '';
    var playerCurrentBalance = '';
    for(var i = 0; i< lottery.players.length; i++){
        playerNames+='<p class="p'+(i+1)+'">' + lottery.players[i].name + '</p>';
        playerNumbers+= '<p class="num1">'+lottery.players[i].playedNumbers()+'</p>';
        playerPayment+= '<p class="payment'+(i+1)+'">'+lottery.players[i].payment()+'</p>';
        playerBettingStatus+= '<p class="'+ lottery.winLose(lottery.players[i])['string']+'">'+ lottery.winLose(lottery.players[i])['string']+'</p>';
        playerWinnings+='<p class="winning'+(i+1)+'">'+ lottery.winnings(lottery.players[i]) +'</p>'
        playerCurrentBalance+='<p class="balance'+(i+1)+'">'+ lottery.players[i].currentBalance +'</p>'
    }

    $forth.append($ul4,$(playerNames));
    $fifth.append($ul5, $(playerNumbers));
    $sixt.append($ul6, $(playerPayment));
    $seventh.append($ul7, $(playerBettingStatus));
    $eight.append($ul8,$(playerWinnings));
    $ninth.append($ul9, $(playerCurrentBalance));

    $container.append($first, $second, $third, $thirdd, $forth, $fifth, $sixt, $seventh, $eight, $ninth, '<div class="clear"></div>');
    $main.prepend($container);
}

var mainLottery = new CTRL.Lottery('Croatia', 10, 30);
var player1 = new CTRL.Player('player1', 200.00);
var player2 = new CTRL.Player('player2', 150.00);
mainLottery.players.push(player1,player2);
ticker(mainLottery);
