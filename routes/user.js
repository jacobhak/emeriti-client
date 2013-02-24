
exports.list = function(req, res){
  var u = new User();
  u.index().on('complete', function(data) {
    res.render ('user_index.jade',
      { title: "userlist", users: data });
  });
};

exports.newUser = function(req, res) {
  res.render('user_new.jade', {title: "ny user"});
}

exports.createUser = function(req, res) {
  
  var u = new User();
  console.log(req.body);
  u.create(req.body).on('complete', function(data) {
    res.redirect("/users");
  })
}

exports.remUser = function(req, res) {
  var u = new User();

  u.removeUser(req.params.id).on('complete', function(data) {
    res.redirect('/users');
  })
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
    this.defaults.username = "hej"
    this.defaults.password = "lelle"
  },{
    baseURL: "http://rocky-mountain-1049.herokuapp.com/"
  }, {
    index: function() {
      console.log("/users")
      return this.get("/users"); 
    },
    user: function(id) {
      return this.get("/users/" + id);
    },
    update: function(id, params) {
      return this.json('post',this.baseURL+"/users/"+id, params);
    },
    create: function(params) {
      console.log("increate");
      console.log(params);
      return this.json('post', this.baseURL + "/users", params);
    },
    removeUser: function(id) {
      return this.del("/users/" + id);
    }
  }
)
