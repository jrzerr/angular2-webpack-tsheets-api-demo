var connect = require('connect');
var serveStatic = require('serve-static');
var proxy = require('proxy-middleware');

var app = connect();
var TSHEETS_URL = 'https://rest.tsheets.com/';

app.use(serveStatic(__dirname + '/dist'));
app.use('/tsheets', proxy(TSHEETS_URL));
app.listen(3000);
