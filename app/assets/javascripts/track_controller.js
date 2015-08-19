var TracksController = function() {
	var self = this;

	this.setUpSong = function setUpSong() {
		$.get('/api/v1/parties/' + $('#party').val() + '/tracks', 
				function( tracks ) {
			$.get('/api/v1/parties/' + $('#party').val() + '/invitations', 
					function( votes ) {
				var voteIndex = Math.floor( Math.random() * votes.length );
				var vote = votes[voteIndex];
				console.log(vote)
				var track = tracks[vote];
				console.log(track);
				$("#song-player").attr('src', track.audio_url );
			});
		});
	}
	
	this.changeSongWhenFinish = function changeSongWhenFinish() {
		$("#song-player").on('ended', function() {
			self.setUpSong();
		});
	}

	this.showModalAfterClick = function showModalAfterClick() {
		$("#upload-track").on('click', function() {
			$("#upload-song-modal").modal();
		});	
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
