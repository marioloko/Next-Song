var search = new Search();
var partiesController = new PartiesController();

partiesController.showPartyModal();

$(document).on('ready', function() {
	partiesController.goParty();

	search.showCurrentSearchs('/api/v1/users/_id_/parties', $('#user').val(),
		'#current-parties-list', 'btn-go', 'arrow-right', 
		search.generateHtmlForList );
	
	search.enterForSearching('/api/v1/users/_id_/search_excluded', 
		$('#user').val(), "#new-parties-list", search.generateHtmlForList,
	  'btn-ok', 'ok' );

	search.shineButtons('#current-parties-list', 'btn-go' );
	search.shineButtons('#new-parties-list', 'btn-ok');

	search.addNewSearch('#new-parties-list',
		partiesController.generatePartiesData, search.postSearch,
		'/invitations', '/api/v1/parties/', search.generateHtmlForList,
		'#current-parties-list', 'btn-go', 'arrow-right' )
});

var ContextGenerator = function() {
	this.generateContext = function generateContext( party, button_class, icon,
		callback ){
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
