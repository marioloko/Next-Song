var PartiesModel = function() {
	this.setGoPartyOnClickEvent = function goParty() {
		$('#current-parties-list').on('click', 'button', function goParty() {
			if ( ! $( this ).hasClass( 'btn-disabled') ) {
				location.href = '/parties/' + $( this ).attr('id') + '/vote'	
			} else {
				$('#not-invited').modal();
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
	
	this.setPartiesAcceptedEvent = function() {
		var parties_channel = dispatcher.subscribe('accepted_invitations');
	
		parties_channel.bind('accepted_invitation', function(invitation) {
			var button_id = '#' + invitation.party_id
			console.log(button_id);
			$(button_id).removeClass('btn-disabled');
		});
	}
}

var ContextPartiesGenerator = function() {
	this.generateContext = function generateContext( party, button_class, icon,
		callback ){
		if (button_class === 'btn-go' && !party.accepted){
			button_class += ' btn-disabled';
		}
		var context = {
			name: party.name,
			owner: party.owner,
			id: party.id,
			button_class: button_class,
			icon: icon
		}
		return callback(context);
	}
}
