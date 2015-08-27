var searcher = new Searcher();
var partiesController = new PartiesController();

partiesController.showPartyModal();

$(document).on('ready', function() {
	var partiesGenerator = new ContextPartiesGenerator();

	partiesController.goParty();

	searcher.displayCurrentSearchs('/api/v1/users/_id_/parties', $('#user').val(),
	'#current-parties-list', 'btn-go', 'arrow-right',
	partiesGenerator.generateContext);
	
	searcher.searchBoxAction('/api/v1/users/_id_/search_excluded', 
		$('#user').val(), "#new-parties-list", 'btn-ok', 'ok',
	partiesGenerator.generateContext );

	searcher.animateButtonsOnHover('#current-parties-list', 'btn-go-hover' );
	searcher.animateButtonsOnHover('#new-parties-list', 'btn-ok-hover');

	searcher.appendNewSearch('#new-parties-list',
	partiesController.generatePartiesData, 'create_invitation', 
	'/api/v1/parties/', '#current-parties-list', 'btn-go', 'arrow-right',
	partiesGenerator.generateContext)

	var parties_channel = dispatcher.subscribe('accepted_invitations');

	parties_channel.bind('accepted_invitation', function(invitation) {
		var button_id = '#' + invitation.party_id
		console.log(button_id);
		$(button_id).removeClass('btn-disabled');
	});

});

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
