
exports.list = function(req, res){
  var u = new Group();
  u.index().on('complete', function(data) {
    res.render ('group_index.jade',
      { title: "groups", groups: data });
  });
};

var sys = require('util'),
    rest = require('restler');

Group = rest.service(function() {
    this.defaults.username = "username22";
    this.defaults.password = "password22";
  },{
    baseURL: "http://0.0.0.0:5000/"
  }, {
    index: function() {
      console.log("/groups")
      return this.get("/groups"); 
    }
  }
)
