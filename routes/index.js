
/*
 * GET home page.
 */

exports.index = function(req, respons){
	respons.render ('index.jade',
		{ title: "emeriti"});
};

