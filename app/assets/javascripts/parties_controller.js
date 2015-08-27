var searcher = new Searcher();
var partiesModel = new PartiesModel();

partiesModel.showPartyModal();

$(document).on('ready', function() {
	var partiesGenerator = new ContextPartiesGenerator();

	partiesModel.setGoPartyOnClickEvent();

	searcher.displayCurrentSearchs('/api/v1/users/_id_/parties', $('#user').val(),
	'#current-parties-list', 'btn-go', 'arrow-right',
	partiesGenerator.generateContext);
	
	searcher.searchBoxAction('/api/v1/users/_id_/search_excluded', 
		$('#user').val(), "#new-parties-list", 'btn-ok', 'ok',
	partiesGenerator.generateContext );

	searcher.animateButtonsOnHover('#current-parties-list', 'btn-go-hover' );
	searcher.animateButtonsOnHover('#new-parties-list', 'btn-ok-hover');

	searcher.displayNewSearch('#new-parties-list',
	partiesModel.generatePartiesData, 'create_invitation', 
	'/api/v1/parties/', '#current-parties-list', 'btn-go', 'arrow-right',
	partiesGenerator.generateContext)

	partiesModel.setPartiesAcceptedEvent();
});
