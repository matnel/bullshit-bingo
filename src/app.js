var init = function() {

	chrome.storage.local.get(['words', 'foundWords'], function( result ){

		var words = [];
		var foundWords = [];

		if( ! result.words ) {
		
            // load list from internets
			
			$.get( 'http://humanisti.fixme.fi/~matnel/temp/bs.txt' , function(r) {
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

$().ready(function () {
    init();
});

var display = function(words, foundWords) {

	var text = $('body').text();
	text = text.toLowerCase();

	var container = $('<div>', { id: 'bs-container', style : 'display: none;'} );
	var found = 0;
	


	for(var i=0;i<9;i++){
	console.log( words[i] );
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

	var menu = $('<div>', { id : 'bs-menu', html : 'BS Bingo™' } );
	$('body').prepend( menu );

	// display toggle button
    var button = $('<div>', { class : 'bs-button btn btn-success', html: 'Show grid' } );
	menu.prepend( button );

	button.on('click', function() {
    	container.slideToggle();
    	$('.settings').slideToggle();
    });

	// style is a hack
	var newGame = $('<div>', { style: 'display: none;', class: 'settings bs-button btn btn-info', html: 'New Game'}  );
	menu.append( newGame );

	newGame.on('click', function(){
         chrome.storage.local.remove(  'words' );
		 location.reload();
	});
	
	
	var urlInput = $('<input>', { placeholder : 'Content URL', class : 'settings bs-button'} );
	menu.append( urlInput );
	
	urlInput.on('change', function(){
         var url = $(this).val();
	
	     $.get( url , function(r) {
	     	// todo: validate content
				words = r.split('\n');
				words = _.shuffle( words );
				
				chrome.storage.local.set( { 'words' : words } );
				
				location.reload();
	    });
	});

}
