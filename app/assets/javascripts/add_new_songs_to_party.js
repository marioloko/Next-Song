var searcher = new Search();
var tracksController = new TracksController();

tracksController.showModalAfterClick();

$(document).on('ready', function() {
	var parties_channel = dispatcher.subscribe('new_invitations');

	parties_channel.bind('new_invitation', function() {
		searcher.displayCurrentSearchs('/api/v1/parties/_id_/users/not_accepted', 
		$('#party').val(), '#parties-request-list', 'btn-friend', 'user',
		usersGenerator.generateContext);
	});

	tracksController.setUpSong('/api/v1/parties/_id_/invitations', 
	$('#party').val(), '/api/v1/tracks/_id_');

	tracksController.changeSongWhenFinish('/api/v1/parties/_id_/invitations', 
	$('#party').val(), '/api/v1/tracks/_id_')

	// Songs lists
	var tracksGenerator = new ContextTrackGenerator();

	tracksController.setUploadSong(function(){
		searcher.displayCurrentSearchs('/api/v1/parties/_id_/tracks', 
		$('#party').val(), '#current-songs-list', 'btn-remove', 'remove',
		tracksGenerator.generateContext);
	});

	searcher.displayCurrentSearchs('/api/v1/parties/_id_/tracks', 
	$('#party').val(), '#current-songs-list', 'btn-remove', 'remove',
	tracksGenerator.generateContext);

	searcher.searchAction('/api/v1/parties/_id_/search_excluded',
	$('#party').val(), '#new-songs-list', 'btn-ok', 'ok',
	tracksGenerator.generateContext);

	searcher.animateButtonsOnHover('#current-songs-list', 'btn-remove-hover');

	searcher.animateButtonsOnHover('#new-songs-list', 'btn-ok-hover');

	searcher.deleteCurrentSearch('#current-songs-list', 
	tracksController.deleteSong);

	searcher.appendNewSearch('#new-songs-list', 
	tracksController.generateTrackData, 'create_track', '/api/v1/tracks/', 
	'#current-songs-list', 'btn-remove', 'remove',
	tracksGenerator.generateContext );

	// Parties request list
	var usersGenerator = new ContextUserGenerator();

	searcher.displayCurrentSearchs('/api/v1/parties/_id_/users/not_accepted', 
	$('#party').val(), '#parties-request-list', 'btn-friend', 'user',
	usersGenerator.generateContext);

	searcher.animateButtonsOnHover('#parties-request-list', 'btn-friend-hover');

	searcher.deleteCurrentSearch('#parties-request-list',
	tracksController.acceptUser)		

});
