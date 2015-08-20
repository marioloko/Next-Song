var PartiesController = function() {
	this.goParty = function goParty() {
		$('#current-parties-list').on('click', 'button', function() {
			if ( ! $( this ).hasClass( 'btn-disabled') ) {
				location.href = '/parties/' + $( this ).attr('id') + '/vote'	
			} else {
				alert('You has not been accepted in the party yet');
			}
		});
	}
	
	this.showPartyModal = function showPartyModal() {
		$("#show-party-modal").on('click', function() {
			$("#new-party").modal();
		});
	}

	this.generatePartiesData = function generatePartiesData( callback, post_url,
		search_url, button, generateHtml, destination_list, btn_class, icon ) {
		var data = {
			"user_id" : $("#user").val(),
			"party_id" : $( button ).attr('id')
		};		
		callback(data, post_url, search_url, button, generateHtml,
	 		destination_list, btn_class, icon);
	}

	this.disableUnaceptedParties = function disableUnaceptedParties(url_format) {
		var user_id = $('#user').val();
		var url = url_format.replace('_id_', user_id)
		$.get(url, function( party_ids ) {
			party_ids.forEach( function( party_id ) {
				$('#' + party_id).addClass('btn-disabled');
			});
		});
	}
}
