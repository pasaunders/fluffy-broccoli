const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

// Set static folder etc.
app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'secrettoken', cookie: {maxAge:60000}}));
app.use(bodyParser.urlencoded({extended: true}));

// Set ejs templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    var sessionData = request.session;
    if (sessionData.goldAmount == undefined) {
        sessionData.goldAmount = 0;
    }
    if (sessionData.history == undefined){
        sessionData.history = []
    }
    response.render('index', {gold: sessionData.goldAmount, history: sessionData.history.reverse()});
});

app.post('/farm', function(request, response){
    let sessionData = request.session;
    let min = 10;
    let max = 20;
    goldchange = randGold(min, max);
    sessionData.goldAmount += goldchange;
    sessionData.history.push('You went to the farm and got ' + goldchange + ' gold');
    response.redirect('/')
});

app.post('/cave', function(request, response){
    let sessionData = request.session;
    let min = 5;
    let max = 10;
    goldchange = randGold(min, max);
    sessionData.goldAmount += goldchange;
    sessionData.history.push('You went to the cave and got ' + goldchange + ' gold');
    response.redirect('/')
});

app.post('/house', function(request, response){
    let sessionData = request.session;
    let min = 2;
    let max = 5;
    goldchange = randGold(min, max);
    sessionData.goldAmount += goldchange;
    sessionData.history.push('You went to the house and got ' + goldchange + ' gold');
    response.redirect('/')
});

app.post('/casino', function(request, response){
    let sessionData = request.session;
    let min = -50;
    let max = 50;
    goldchange = randGold(min, max);
    sessionData.goldAmount += goldchange;
    sessionData.history.push('You went to the casino and got ' + goldchange + ' gold');
    response.redirect('/')
});

function randGold(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.listen(8000, function(){
    console.log('Listening on port 8000')
})