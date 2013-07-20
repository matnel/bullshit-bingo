var init = function() {

	chrome.storage.local.get(['words', 'foundWords'], function( result ){

		var words = [];
		var foundWords = [];		

		if( ! result.words ) {

			// load list from internets
			$.get('http://humanisti.fixme.fi/~matnel/temp/bs.txt', function(r) {
				words = r.split('\n');
				words = _.shuffle( words );

				chrome.storage.local.set( { 'words' : words } )

				display( words, foundWords );
			});

		} else {
			words = result.words;
			foundWords = result.foundWords;
			display( words, foundWords );
		}
		
	});
}

init();

var display = function(words, foundWords) {

	var text = $('body').text();
	text = text.toLowerCase();

	var container = $('<div>', { id: 'bs-container', style : 'display: none;'} );
	var found = 0;

	for(var i=0;i<9;i++){
		var d = $('<div>', { class: 'bs-box', html : words[i] } ) ;

		if( text.indexOf(words[i]) >0 || foundWords.indexOf(words[i])!= -1 ){
			d.addClass('bs-found');

			// haz found previously?
			if( foundWords.indexOf(words[i]) == -1 ) {
                found++;
				foundWords.push(words[i]);
			}
		}
	    container.append( d );        
    }

    chrome.storage.local.set( { 'foundWords' : foundWords } );

    $('body').prepend( container );

    var button = $('<div>', { id: 'bs-button', html: 'BS Bingo™ (' + found + ')'} );
	$('body').prepend( button );

	var new_game = $('<div>', { id: 'bs-button', html: 'New Game'}  );
	$('body').prepend( new_game );

    button.on('click', function() {
    	container.slideToggle();
    });
	
	new_game.on('click', function(){
         chrome.storage.local.remove(  'words' );
		 location.reload();
	});

}
