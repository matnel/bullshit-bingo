$().ready( function() {
	alert("Kissat <3");

	// '<div style="width:100px;height:100px;background:blue;">Kissa</div>'

	var words = ['innovaatio','synenergia','multimedia','kissa','sosiaalinen media', 'talvivaara', 'ammattiliitto', 'pääministeri', 'huippu'];
	words = _.shuffle( words );

	var text = $('body').text();


	var container = $('<div>', { id: 'container'} );

	for(var i=0;i<9;i++){
		var d = $('<div>', { class: 'box', html : words[i] } ) ;

		if( text.indexOf(words[i]) >0 ){
			d.addClass('found');
		}
	    container.append( d );        
    }

    $('body').prepend( container );

})