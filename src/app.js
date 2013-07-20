var _analyze = function( text ) {
	var t = _.escape( text.html() );
	var l = t.length;
	text.append("<span style='color:blue;background:green'>" + l + "</span>");
}

var analyze = function( dom ) {
	$.each( dom, function() {
		_analyze( $(this) );
	});
}
