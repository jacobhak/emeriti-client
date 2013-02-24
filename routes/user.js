
exports.list = function(req, res){
  var u = new User();
  u.index().on('complete', function(data) {
    res.send(data);
  });
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

var sys = require('util'),
    rest = require('restler');

User = rest.service(function() {
  },{
    baseURL: "http://rocky-mountain-1049.herokuapp.com/"
  }, {
    index: function() {
      return this.get("/users"); 
    },
    user: function(id) {
      return this.get("/users/" + id);
    }
  }
)
