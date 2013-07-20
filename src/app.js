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

$().ready( function() {
	alert("Kissat <3");

	// '<div style="width:100px;height:100px;background:blue;">Kissa</div>'

	var words = ['innovaatio','synenergia','multimedia','kissa','sosiaalinen media', 'talvivaara', 'ammattiliitto', 'pääministeri', 'huippu'];
	words = _.shuffle( words );

	var container = $('<div>', { id: 'container'});

	for(var i=0;i<9;i++){
        var d = $('<div>', { class: 'box', html : words[i] } ) ;
	    container.append( d );        
    }

    $('body').prepend( container );

})