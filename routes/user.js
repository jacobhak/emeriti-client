
exports.list = function(req, res){
  res.render ('user_index.jade',
		{ title: "userlist"});
};

exports.newUser = function(req, res) {
	res.render('user_new.jade', {title: "ny user"});
}

exports.create = function(req, res) {
	var sys = require('util'),
    rest = require('restler');

    
	var jsonData = req.body;
	var url = "http://rocky-mountain-1049.herokuapp.com/users";
	console.log(jsonData);
	rest.postJson(url, jsonData).on('complete', function(data, response) {
		console.log ('user created');
	});
	res.send("post user");
}

