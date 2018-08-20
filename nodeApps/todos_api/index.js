var express = require('express'),
    app = express(),
    port = 3000;
    bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); // so we can access req.body

app.get('/', function(req, res){
    res.send('HELLO FROM THE ROOT ROUTE');
});

app.use('/api/todos', todoRoutes);

app.listen(port,function(){
    console.log('APP IS RUNNING ON PORT ' + port);
});





// app.get('/happy', function(req, res){
//     res.send(':)');
// });
//
// app.get('/json', function(req, res){
//     res.json({test:"test"});
// });
