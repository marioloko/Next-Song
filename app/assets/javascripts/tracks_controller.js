var searcher = new Searcher();
var tracksModel = new TracksModel();

tracksModel.showModalAfterClick();

$(document).on('ready', function() {
	tracksModel.setUpSong('/api/v1/parties/_id_/invitations', 
	$('#party').val(), '/api/v1/tracks/_id_');

	tracksModel.changeSongWhenFinish('/api/v1/parties/_id_/invitations', 
	$('#party').val(), '/api/v1/tracks/_id_')

	// Songs lists
	var tracksGenerator = new ContextTrackGenerator();

	tracksModel.setUploadSong(function(){
		searcher.displayCurrentSearchs('/api/v1/parties/_id_/tracks', 
		$('#party').val(), '#current-songs-list', 'btn-remove', 'remove',
		tracksGenerator.generateContext);
	});

	searcher.displayCurrentSearchs('/api/v1/parties/_id_/tracks', 
	$('#party').val(), '#current-songs-list', 'btn-remove', 'remove',
	tracksGenerator.generateContext);

	searcher.searchBoxAction('/api/v1/parties/_id_/search_excluded',
	$('#party').val(), '#new-songs-list', 'btn-ok', 'ok',
	tracksGenerator.generateContext);

	searcher.animateButtonsOnHover('#current-songs-list', 'btn-remove-hover');

	searcher.animateButtonsOnHover('#new-songs-list', 'btn-ok-hover');

	searcher.setButtonOnClickActionEvent('#current-songs-list', 
	tracksModel.deleteSong);

	searcher.displayNewSearch('#new-songs-list', 
	tracksModel.generateTrackData, 'create_track', '/api/v1/tracks/', 
	'#current-songs-list', 'btn-remove', 'remove',
	tracksGenerator.generateContext );

	// Parties request list
	var usersGenerator = new ContextUserGenerator();

	searcher.displayCurrentSearchs('/api/v1/parties/_id_/users/not_accepted', 
	$('#party').val(), '#parties-request-list', 'btn-friend', 'user',
	usersGenerator.generateContext);

	searcher.animateButtonsOnHover('#parties-request-list', 'btn-friend-hover');

	searcher.setButtonOnClickActionEvent('#parties-request-list',
	tracksModel.acceptUser)		

	tracksModel.setPartyRequestsEvent( usersGenerator.generateContext );
});
