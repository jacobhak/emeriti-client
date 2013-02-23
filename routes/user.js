
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.newUser = function(req, res) {
	res.render('new_user.jade');
}