var TracksModel = function() {
	var self = this;
	var searcher = new Searcher();
	
	this.setUpSong = function setUpSong(votes_url_format, party_id,
	song_url_format) {
		var votes_url = votes_url_format.replace('_id_', party_id);

		async.waterfall([
			function(chooseNextSong) {
				getCompactVotes(votes_url, function( votes ) {
					chooseNextSong( null, votes );
				});
			},
			function( votes ) {
				chooseNextSong( votes, song_url_format );
			}
		]);
	}

	function getCompactVotes(votes_url, chooseNextSong){
		$.get(votes_url, function( votes ) {
			if (votes.length) {
				toggleHidden('#player-error', '#audio-player');
				chooseNextSong( votes );
			} else {
				// Show error if any song voted in the play list
				toggleHidden('#audio-player', '#player-error');
			}
		});
	}

	function chooseNextSong( votes, song_url_format ) {
		var voteIndex = Math.floor( Math.random() * votes.length );
		var vote = votes[voteIndex];
		var song_url = song_url_format.replace('_id_', vote);
		getSong(song_url);
	}

	function toggleHidden(idToHide, idToShow) {
		$( idToHide ).addClass('hide'),	
		$( idToShow ).removeClass('hide');
	}

	function getSong(song_url) {
		$.get(song_url, function( track ) {
			$("#song-player").attr('src', track.audio_url);
			$("#current-song-data").text(track.title + '-' + track.artist);
		});	
	}
	
	this.changeSongWhenFinish = function changeSongWhenFinish(votes_url_format,
			party_id, song_url_format) {
		$("#song-player").on('ended', function() {
			self.setUpSong(votes_url_format, party_id, song_url_format);
		});
	}

	this.showModalAfterClick = function showModalAfterClick() {
		$("#upload-track").on('click', function() {
			$("#upload-song-modal").modal();
		});	
	}

	this.setUploadSong = function setUploadSong(showCurrentSearchs) {
		$('#track-form').on('ajax:complete', function(e, data) {
			resetModal();
			showCurrentSearchs();
		});
	}

	function resetModal(){
		$('#upload-song-modal').modal('toggle');
		$('#track-form :input[type=text]').each( function() {
			$(this).val('');
		});
		$('#track-form :input[type=file]').val('')
	}

	this.deleteSong = function deleteSong(button, removeButton) {
		var data = { 
			"party_id" : $("#party").val(), 
			"track_id" : $( button ).attr('id')
		}
		dispatcher.trigger('destroy_track', data);
		removeButton();
	}

	this.acceptUser = function acceptUser(button, removeButton) {
		var data = {
			'party_id': $('#party').val(),
			'user_id': $( button ).attr('id'),
			'accepted': true
		}
		dispatcher.trigger('accept', data);
		removeButton();	
	}

	this.generateTrackData = function generateTrackData(button, postSearch ) {
		var data = { 
			"party_id" : $("#party").val(), 
			"track_id": $( button ).attr('id')
	 	}
		postSearch( data );
	}

	this.setPartyRequestsEvent = function(generateContext) {
		var parties_channel = dispatcher.subscribe('new_invitations');
	
		parties_channel.bind('new_invitation', function() {
			searcher.displayCurrentSearchs('/api/v1/parties/_id_/users/not_accepted', 
			$('#party').val(), '#parties-request-list', 'btn-friend', 'user',
			generateContext);
		});
	}
}

var ContextTrackGenerator = function() {	
	this.generateContext = function generateContext( track, button_class, icon,
	compile) {
		var context = { 
			name: track.title,
			owner: track.artist,
			id: track.id,
			button_class: button_class,
			icon: icon
		}
		compile(context);
	}
}

var ContextUserGenerator = function() {
	this.generateContext = function generateContext( user, button_class, icon,
	compile) {
		var context = {	
			name: user.username,
			owner: user.name,
			id: user.id,
			button_class: button_class,
			icon: icon
		}
		compile(context);
	}
}
