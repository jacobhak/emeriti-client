
exports.list = function(req, res){
  var sys = require('util'),
    rest = require('restler');

  var url = "http://rocky-mountain-1049.herokuapp.com/users";
  rest.get(url).on('complete', function(data) {
    res.render ('user_index.jade',
      { title: "userlist", users: data});
  });
};

exports.newUser = function(req, res) {
  res.render('new_user.jade', {title: "ny user"});
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

