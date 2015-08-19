showModalAfterClick();

$(document).on('ready', function() {
	setUpSong();
	changeSongWhenFinish()

	showCurrentSearchs('/api/v1/parties/_id_/tracks', $("#party").val(), 
		'#current-songs-list', 'btn-remove', 'remove', generateHtmlForList );

	enterForSearching('/api/v1/parties/_id_/tracks_excluded', $('#party').val(),
		 '#new-songs-list', generateHtmlForList );

	shineButtons('#current-songs-list', 'btn-remove');
	shineButtons('#new-songs-list', 'btn-ok');

	deleteCurrentSearch('#current-songs-list', deleteSong);
	addNewSearch('#new-songs-list', generateTrackData, postSearch,
	 '/plays', '/api/v1/tracks/', generateHtmlForList, '#current-songs-list',
	 'btn-remove', 'remove' );
});

function setUpSong() {
	$.get('/api/v1/parties/' + $('#party').val() + '/tracks', function( tracks ) {
		var songIndex = Math.floor( Math.random() * tracks.length );
		var track = tracks[songIndex];
		$("#song-player").attr('src', track.audio_url );
	});
}

function changeSongWhenFinish() {
	$("#song-player").on('ended', function() {
		setUpSong();
	});
}

function showModalAfterClick() {
	$("#upload-track").on('click', function() {
		$("#upload-song-modal").modal();
	});	
}

function deleteSong(button, callback) {
	$.ajax({
		url: '/plays/' + '?' +  $.param({ "party_id" : $("#party").val(), 
			"track_id" : $( button ).attr('id')}),
		type: 'DELETE',
		success: function() { 
			callback();
		}
	});
}

function generateTrackData( callback, post_url, search_url, button,
	 generateHtml, destination_list, btn_class, icon ) {
	var data = { 
		"party_id" : $("#party").val(), 
		"track_id": $( button ).attr('id')
	 }
	callback(data, post_url, search_url, button, generateHtml, destination_list, 
	btn_class, icon);
}

function generateContext( track, button_class, icon, callback) {
	var context = { 
		name: track.title,
		owner: track.artist,
		id: track.id,
		button_class: button_class,
		icon: icon
	}
	return callback(context);
}
