
exports.list = function(req, res){
  index(req, res);
};

function index(req, res) {
  var u = new User();
  u.index().on('complete', function(data) {
    res.render ('user_index.jade',
      { title: "userlist", users: data});
  });
}

exports.newUser = function(req, res) {
  res.render('user_new.jade', {title: "ny user"});
}

exports.create = function(req, res) {
  
  var u = new User();
  console.log(req.body);
  u.create(req.body).on('complete', function(data) {
    index(req, res);
  })
}

exports.remUser = function(req, res) {
  var u = new User();

  u.removeUser(req.params.id).on('complete', function(data) {
    index(req, res);
  })
}

exports.show = function(req, res) {
  var user = new User();
  user.user(req.params.id).on('complete', function (data) {
    res.send(data);
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
