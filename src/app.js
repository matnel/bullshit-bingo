var init = function() {

	chrome.storage.local.get(['words', 'foundWords'], function( result ){

		var words = [];
		var foundWords = [];		

		if( ! result.words ) {

			words = ['innovaatio','synenergia','multimedia','kissa','sosiaalinen media', 'talvivaara', 'ammattiliitto', 'pääministeri', 'huippu'];
			words = _.shuffle( words );

			chrome.storage.local.set( { 'words' : words } )

			console.log("Uusi järjestys arvottu!")

		} else {
			words = result.words;
			foundWords = result.foundWords;
		}


		console.log('??????????');
		console.log( foundWords );
		display( words, foundWords );
	});
}

init();

var display = function(words, foundWords) {

	var text = $('body').text();
	text = text.toLowerCase();

	var container = $('<div>', { id: 'container'} );

	for(var i=0;i<9;i++){
		var d = $('<div>', { class: 'box', html : words[i] } ) ;

		if( text.indexOf(words[i]) >0 || foundWords.indexOf(words[i])!= -1 ){
			d.addClass('found');
			foundWords.push(words[i]);
		}
	    container.append( d );        
    }

    console.log( foundWords );
    
    chrome.storage.local.set( { 'foundWords' : foundWords } );

    $('body').prepend( container );

}