var SelectTrackController = function() {
	var searcher = new Search();

	this.setSelectTrack = function setSelectTrack( list, select_btn_class, 
	current_icon, select_icon) {
		$( list ).on('click', 'button', function() {
			var button = this;
			editVote( button, function(){ 
				changeButtonToSelect( button, select_btn_class,
				 	current_icon, select_icon);
			});
		});
	}
	
	function changeButtonToSelect(button, select_btn_class, current_icon, 
	select_icon) {
		$( button ).addClass( select_btn_class ).children().addClass( select_icon )
			.removeClass( current_icon )
	
		$( button ).closest('dt').parent().siblings().find('button')
			.removeClass( select_btn_class ).children().addClass( current_icon )
			.removeClass( select_icon );
	}
	
	function editVote( button, refreshButton) {
		data = { 
			"party_id" : $("#party").val(),
			"user_id" : $("#user").val(),
			"vote" : $( button ).attr('id')
		}
		dispatcher.trigger('vote', data);
		refreshButton();
	}

	this.setAddedSongEvent =	function setAddedSongEvent(generateContext) {
		var plays_channel = dispatcher.subscribe('new_plays');

		plays_channel.bind('new_play', function(play) {
			searcher.authomaticSearch('/api/v1/parties/_id_/tracks', 
			$('#party').val(), '#next-songs-list', 'btn-like', 'thumbs-up', 
			generateContext);
		});
	}

	this.setRemovedSongEvent = function setRemovedSongEvent() {
		var plays_channel = dispatcher.subscribe('destroyed_plays');
		
		plays_channel.bind('destroyed_play', function(track_id) {
			var button_id = '#' + track_id;
			$(button_id).closest('li').remove();
		});
	}

	this.setUpdateProgressBarEvent = function setUpdateProgressBarEvent() {
		var invitations_channel = dispatcher.subscribe('votes');
	
		invitations_channel.bind('new_vote', function( percentage_votes ) {
			$('#next-songs-list [id^=p]').width( '0%' ).text( '0%' );	
			for (var vote in percentage_votes) {
				$('#p' + vote ).width( percentage_votes[vote] + '%' )
					.text( Math.round(percentage_votes[vote]) + '%' );
			}
		});
	}
}
