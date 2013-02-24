
exports.list = function(req, res){
  var u = new User();
  u.index().on('complete', function(data) {
    res.render ('user_index.jade',
      { title: "userlist", users: data});
  });
};

exports.newUser = function(req, res) {
  res.render('user_new.jade', {title: "ny user"});
}

exports.create = function(req, res) {
  var sys = require('util'),
    rest = require('restler');

  console.log(req.body);
  
  var jsonData = req.body;
  var url = "http://rocky-mountain-1049.herokuapp.com/users";
  console.log(jsonData);
  
  rest.postJson(url, jsonData).on('complete', function(data, response) {
    console.log ('user created');
  });
  res.send("post user");
}

exports.show = function(req, res) {
  var user = new User();
  user.user(req.params.id).on('complete', function (data) {
    res.render('user_show.jade', {title: data.name, user: data});
  })
}

exports.edit = function(req, res) {
  var user = new User();
  user.user(req.params.id).on('complete', function (data) {
    res.render('user_edit.jade',{title: data.name, user: data});
  })
}

exports.update = function(req,res) {
  var user = new User();
  user.update(req.params.id, req.body).on('complete', function (data) { //not finished
    res.send("User updated!");
  })
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
    },
    update: function(id, params) {
      return this.json('post',this.baseURL+"users/"+id, params);
    }
  }
)
