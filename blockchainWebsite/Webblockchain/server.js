var mysql = require('mysql');
var express = require('express');
const parseurl = require('parseurl');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
let morgan = require('morgan');
let expressValidator = require('express-validator')
let MySQLStore = require('express-mysql-session')(session);
var phpnode = require('php-node');
const jsonServer = require('json-server');
const servers = jsonServer.create();
const router = jsonServer.router('./info.json');
const middlewares = jsonServer.defaults();
const app = express();
var path = require('path');


app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));//chay css
app.use("/api", express.static('./api/'))

let sess


app.get('/', (req, res) => {
    res.render('index')
  });
app.get('/caygiong', (req, res) => {
  res.render('caygiong')
});
app.get('/cayantrai', (req, res) => {
  res.render('cayantrai')
});
app.get('/thumua', (req, res) => {
  res.render('thumua')
});
app.get('/phanphoi', (req, res) => {
  res.render('phanphoi')
});
app.get('/banle', (req, res) => {
  res.render('banle')
});
app.get('/connectdatabase', (req, res) => {
  res.render('connectdatabase')
});
app.get('/dangky', (req, res) => {
  res.render('xulydangki')
});
app.get('/home', (req, res) => {
  res.render('index')
});
app.get('/admin', (req, res) => {
  res.render('admin')
});
app.get('/about', (req, res) => {
	res.render('about')
  });
  app.get('/contact', (req, res) => {
	res.render('contact')
  });
  app.get('/sanphamkhachhang', (req, res) => {
	res.render('sanphamkhachhang')
  });
app.get('/loginerro', (req, res) => {
	res.render('loginerro')
  });
  app.get('/loginsuccess', (req, res) => {
	res.render('loginsuccess')
  });
  app.get('/sanpham', (req, res) => {
	res.render('sanpham')
  });


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index'));
});
app.get('/admin', function(request, response) {
	response.sendFile(path.join(__dirname + '/admin'));
});
app.get('/loginsuccess', function(request, response) {
	response.sendFile(path.join(__dirname + '/loginsuccess'));
});
app.get('/caygiong', function(request, response) {
	response.sendFile(path.join(__dirname + '/caygiong'));
});
app.get('/cayatrai', function(request, response) {
	response.sendFile(path.join(__dirname + '/cayantrai'));
});
app.get('/thumua', function(request, response) {
	response.sendFile(path.join(__dirname + '/thumua'));
});
app.get('/phanphoi', function(request, response) {
	response.sendFile(path.join(__dirname + '/phanphoi'));
});
app.get('/banle', function(request, response) {
	response.sendFile(path.join(__dirname + '/banle'));
});

app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				if(request.session.username == "admin"){
					response.redirect('/admin')
				}
				else if(request.session.username =="Nguyễn Văn Giống"){
					response.redirect('/caygiong');
				}
				else if(request.session.username =="Nguyễn Văn Trái"){
					response.redirect('/cayantrai');
				}
				else if(request.session.username =="Nguyễn Thị Hoạch"){
					response.redirect('/thumua');
				}
				else if(request.session.username =="Nguyễn Thị Phối"){
					response.redirect('/phanphoi');
				}
				else if(request.session.username =="Nguyễn Văn Lẻ"){
					response.redirect('/banle');
				}
				else{
					response.redirect('/loginsuccess');
				}
			} else {
				response.redirect('/loginerro');
			}
			response.end();
		});
	} else {
		response.redirect('/loginerro');
	}
});

app.post('/signup', function (request, response) {
	var today = new Date();
	var users={
		"username":request.body.username,
		"email":request.body.email,
		"password":request.body.password,
		"gender":request.body.gender,
		"birthday":request.body.birthday,
		"phonenum":request.body.phonenum,
		"address":request.body.address,
		"created":today,
		"modified":today,
		"role":request.body.role
	  }
	
		connection.query('INSERT INTO accounts SET ?',users, function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				response.redirect('/loginerro');
			  }else{
				console.log('The solution is: ', results);
				response.redirect('/admin');
			  }
		});
});

app.get("/signout", function (request, response) {
	request.session.loggedin = false;
	request.session.username = "";
	//console.log(request.session.username);
	response.redirect("/");
});

app.get('/login', function (request, response) {

	if (request.session.loggedin) {
		// console.log(request.session.username);
		response.json(request.session.username);
		// response.json(response);
		// response.json(request.username);
		// response.send('Welcome back, ' + request.session.username + '!');

	}
	else {
		response.json('no');
	}
	response.end();
});

app.listen(4000);