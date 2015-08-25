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

	this.generatePartiesData = function generatePartiesData(button, postSearch) {
		var data = {
			"user_id" : $("#user").val(),
			"party_id" : $( button ).attr('id')
		};		
		postSearch( data );
	}
}
