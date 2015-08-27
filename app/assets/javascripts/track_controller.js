var TracksController = function() {
	var self = this;
	var searcher = new Search();
	
	this.setUpSong = function setUpSong(votes_url_format, party_id,
	song_url_format) {
		var votes_url = votes_url_format.replace('_id_', party_id);
		getCompactVotes(votes_url, song_url_format);
	}

	function getCompactVotes(votes_url, song_url_format){
	$.get(votes_url, function( votes ) {
			var voteIndex = Math.floor( Math.random() * votes.length);
			var vote = votes[voteIndex];
			var song_url = song_url_format.replace('_id_', vote);
			getSong(song_url);
		});
	}

	function getSong(song_url) {
		$.get(song_url, function( track ) {
			$("#song-player").attr('src', track.audio_url);
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
