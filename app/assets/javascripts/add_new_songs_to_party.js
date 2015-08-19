var search = new Search();
var tracksController = new TracksController();

tracksController.showModalAfterClick();

$(document).on('ready', function() {
	tracksController.setUpSong();
	tracksController.changeSongWhenFinish()

	search.showCurrentSearchs('/api/v1/parties/_id_/tracks', $("#party").val(), 
		'#current-songs-list', 'btn-remove', 'remove', search.generateHtmlForList );

	search.enterForSearching('/api/v1/parties/_id_/tracks_excluded',
		$('#party').val(), '#new-songs-list', search.generateHtmlForList,
		'btn-ok', 'ok' );

	search.shineButtons('#current-songs-list', 'btn-remove');
	search.shineButtons('#new-songs-list', 'btn-ok');

	search.deleteCurrentSearch('#current-songs-list', 
		tracksController.deleteSong);

	search.addNewSearch('#new-songs-list', tracksController.generateTrackData,
	 	search.postSearch, '/plays', '/api/v1/tracks/', search.generateHtmlForList, 
		'#current-songs-list', 'btn-remove', 'remove' );
});

var ContextGenerator = function() {	
	this.generateContext =function generateContext( track, button_class, icon,
		 callback) {
		var context = { 
			name: track.title,
			owner: track.artist,
			id: track.id,
			button_class: button_class,
			icon: icon
		}
		return callback(context);
	}
}
