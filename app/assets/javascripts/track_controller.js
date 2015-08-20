var TracksController = function() {
	var self = this;
	
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

	this.deleteSong = function deleteSong(button, callback) {
		$.ajax({
			url: '/plays/' + '?' +  $.param({ "party_id" : $("#party").val(), 
				"track_id" : $( button ).attr('id')}),
			type: 'DELETE',
			success: function() { 
				callback();
			}
		});
	}

	this.generateTrackData = function generateTrackData( callback, post_url,
		 search_url, button, generateHtml, destination_list, btn_class, icon ) {
		var data = { 
			"party_id" : $("#party").val(), 
			"track_id": $( button ).attr('id')
	 	}
		callback(data, post_url, search_url, button, generateHtml, destination_list, 
		btn_class, icon);
	}
}
