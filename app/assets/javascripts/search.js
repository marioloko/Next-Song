var Search = function(){
	var self = this;

	this.animateButtonsOnHover = function shineButtons(list, hover_button_class) {
		$( list ).on('mouseenter mouseleave', 'button', function() {
			var button = this;
			if (! $( this ).hasClass('btn-disabled') ) {
				$( button ).toggleClass( hover_button_class );
			}
		});
	}

	this.deleteCurrentSearch = function deleteCurrentSearch(list, deleteSearch){
		$(list).on('click', 'button', function(event) {
			event.preventDefault();
			var button = this;
			if (typeof deleteSearch === "function") {
				deleteSearch(button, function() {
					removeCurrentButton( button );
				});
			}
		});
	}

	function removeCurrentButton( button ) {
		$( button ).closest('li').remove();
	}

	this.searchAction = function searchAction(search_url, party_id, 
	destination_list, button_class, icon, generateContext) {	
		async.waterfall([
			function( refreshSearchList ) {
				enterForSearching(search_url, party_id, function( searchs ) {
					refreshSearchList(null, searchs)
				});
			},
			function( searchs, generateHtmlButton) {
				refreshSearchList( searchs, destination_list, function( search, list ) {
					generateHtmlButton(null, search);
				});
			},
			function( search, appendHtmlToList) {
				generateHtmlButton( search, button_class, icon, generateContext,
				function(htmlButton) {
					appendHtmlToList(null, destination_list, htmlButton);
				});
			},
			appendHtmlToList
		]);
	}

	function enterForSearching(url_format, party_id, 
	refreshSearchList ) {
		$("#search").on('keydown', function(event) {
			if (event.which == 13) {
				event.preventDefault();
				search_data = $("#search").val();
				search(search_data, url_format, party_id, refreshSearchList);
			}
		});
	}

	this.authomaticSearch = function authomaticSearch (search_url, party_id,
	destination_list, button_class, icon, generateContext ) {
		async.waterfall([
			function( refreshSearchList ) {
				search(null ,search_url, party_id, function( searchs ) {
					refreshSearchList(null, searchs)	 
				});
			},
			function( searchs, generateHtmlButton ) {
		 		refreshSearchList(searchs, destination_list, function(search) {
					generateHtmlButton(null, search)
				});
			},
			function( search, appendHtmlToList ) {
				generateHtmlButton(search, button_class, icon, generateContext,
				function(htmlButton){
					appendHtmlToList(null, destination_list, htmlButton );
				});
			},
			appendHtmlToList
		]);
	}

	function search(search_data, url_format, party_id, refreshSearchList ) {
		var url = url_format.replace('_id_', party_id);
		$.ajax({
			url: url, 
			type: 'GET',
			data: {
				'search' : search_data
			},
			success: refreshSearchList
		});
	}

	function refreshSearchList( searchs, list, appendHtmlToList ){
		$( list ).empty();
		searchs.forEach( function(search) {
			appendHtmlToList( search );
		});
	}
	
	function appendHtmlToList( list, html ) {
		$( list ).append( html );
	}

	this.displayCurrentSearchs = function displayCurrentSearchs(search_url,
 	party_id, destination_list, btn_class, icon, generateContext ) {
		async.waterfall([
			function( refreshSearchList ) {
				showCurrentSearchs(search_url, party_id, function( searchs ) { 
					refreshSearchList( null, searchs);
				});
			},
			function( searchs, generateHtmlButton ) {
				refreshSearchList( searchs, destination_list, function( search ) {
					generateHtmlButton( null, search);
				});  
			},
			function( search, appendHtmlToList ) {
				generateHtmlButton( search, btn_class, icon, generateContext,
				function(htmlButton) {
					appendHtmlToList(null,destination_list, htmlButton);
				});
			},
			appendHtmlToList
		]);
	}

	function showCurrentSearchs(url_format, id, refreshSearchList ) {
		var url = url_format.replace('_id_', id)
		$.get(url, refreshSearchList);
	}
	
	function addNewSearch( list, generateData ) {
		$( list ).on('click', 'button', function(event) {
			event.preventDefault();
			var button = this;
	
			generateData( button );
		});
	}

	function postSearch(data, event_name, button, 
	appendSearch ) {
		dispatcher.trigger( event_name, data );
		appendSearch( $( button ).attr('id') );
		removeCurrentButton( button );	
	}

	this.appendNewSearch = function appendNewSearch(current_list, 
	generateData, post_url, search_url, destination_list, button_class,
	icon, generateContext) {	
		async.waterfall([
			function( generateData ) {
				addNewSearch(current_list, function( button ) {
					generateData(null, button)
				});
			},
			function( button, postSearch ) {
				generateData( button, function( data ) {
					postSearch(null, data, button);
				});
			},
			function( data, button, appendSearch) {
				postSearch( data, post_url, button, function(id) { 
					appendSearch(null, id);
				});
			},
			function( id, generateHtmlButton ) {
				appendSearch(search_url, id, function( search ) { 
					generateHtmlButton(null, search);
				});
			},
			function(search, appendHtmlToList) {
				generateHtmlButton( search, button_class, icon, generateContext,
				function( htmlButton) {
					appendHtmlToList(null, destination_list, htmlButton);
				});
			},
			appendHtmlToList
		]);
	}
	
	
	function appendSearch(url, id, appendHtmlToList) {
		$.get(url + id, function( search ) {
			appendHtmlToList( search );
		});
	}

	function generateHtmlButton( search, button_class, icon,
	contextGenerator, appendHtmlToList ) { 
		var buttonTemplate = $("#button-generator").html();
	
		var template = Handlebars.compile(buttonTemplate);
	
		function compileTemplate(context) {
			var htmlButton = template(context);
			appendHtmlToList( htmlButton );
		}

		contextGenerator( search, button_class, icon, compileTemplate);
	}
}
