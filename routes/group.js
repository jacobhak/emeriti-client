
exports.list = function(req, res){
  var u = new Group();
  u.index().on('complete', function(data) {
    res.render ('group_index.jade',
      { title: "groups", groups: data });
  })
}

exports.newGroup = function(req, res) {
  res.render('group_new.jade', {title: "ny grupp"});
}


exports.createGroup = function(req, res) {
  
  var g = new Group();

  g.create(req.params).on('complete', function(data) {
    res.redirect("/groups");
  });
}

exports.removeGroup = function(req, res) {
  var g = new Group();
  g.removeGroup(req.params.id).on('complete', function() {
    res.redirect("/groups");
  })
}

var sys = require('util'),
    rest = require('restler');

Group = rest.service(function() {
    this.defaults.username = "hej";
    this.defaults.password = "lelle";
  },{
    baseURL: "http://rocky-mountain-1049.herokuapp.com/"
    //baseURL: "http://localhost:5000/"
  }, {
    index: function() {
      console.log("/groups")
      return this.get("/groups"); 
    },
    create: function(params) {
      console.log ('create');
      console.log(params);
      console.log('d');
      return this.json('post', this.baseURL + "/users", params);
    },
    removeGroup: function(id) {
      return this.del("/groups/" + id);
    }
  }
)


