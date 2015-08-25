var searcher = new Search();
var partiesController = new PartiesController();

partiesController.showPartyModal();

$(document).on('ready', function() {
	var partiesGenerator = new ContextPartiesGenerator();

	partiesController.goParty();

	searcher.displayCurrentSearchs('/api/v1/users/_id_/parties', $('#user').val(),
	'#current-parties-list', 'btn-go', 'arrow-right',
	partiesGenerator.generateContext);
	
	searcher.searchAction('/api/v1/users/_id_/search_excluded', 
		$('#user').val(), "#new-parties-list", 'btn-ok', 'ok',
	partiesGenerator.generateContext );

	searcher.shineButtons('#current-parties-list', 'btn-go' );
	searcher.shineButtons('#new-parties-list', 'btn-ok');

	searcher.appendNewSearch('#new-parties-list',
	partiesController.generatePartiesData, '/invitations', '/api/v1/parties/', 
	'#current-parties-list', 'btn-go', 'arrow-right',
	partiesGenerator.generateContext)
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
