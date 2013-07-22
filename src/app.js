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

	var menu = $('<div>', { id : 'bs-menu' } );
	$('body').prepend( menu );
	
	// display toggle button
    var button = $('<button>', { id: 'bs-button', class:'btn btn-info', html: 'BS Bingo™ (' + found + ')', type:"button"} );
	menu.prepend( button );

	button.on('click', function() {
    	container.slideToggle();
    });

	var settingsB = $('<div>', { id: 'bs-button', class:'btn btn-info', html: 'Settings'}  );
	menu.prepend( settingsB );

	var settingsContent = $('<div>', { id: 'sContent', html: '', style:'display:none;'}  );
	settingsContent.css('position', 'fixed');
	settingsContent.css('top', '30px');
	var ikkuna = $(window).width();
	var sPosition = ikkuna - 220;
	settingsContent.css('left', sPosition);

	menu.prepend( settingsContent );

	var new_game = $('<div>', { id: 'bs-button', class:'btn btn-info', html: 'New Game'}  );
	new_game.css('float', 'left');
	new_game.on('click', function(){
         chrome.storage.local.remove(  'words' );
		 location.reload();
	});
	
	menu.append( new_game );
	
	
	settingsB.on('click', function(){
         settingsContent.slideToggle();
	});
	
	var inputEka = $('<input>', { id: 'input1', html: ' '} );
	var submitButton =  $('<div>', { id: 'bs-button', class:'btn btn-info', html:' submit', style: 'width:50px;heigth:50px;'} );
	submitButton.css('float', 'left');

	settingsContent.append( inputEka );
	settingsContent.append( submitButton );
	
	submitButton.on('click', function(){
         var mursuOsoite = $('#input1').val();
	
	     $.get(mursuOsoite, function(r) {
				words = r.split('\n');
				words = _.shuffle( words );
				
				chrome.storage.local.set( { 'words' : words } );
				
				location.reload();
	    });
	});

}
