var Search = function(){
	var self = this;

	this.shineButtons = function shineButtons( list, btn_class ) {
		$( list ).on('mouseenter mouseleave', 'button', function() {
			var button = this;
			if (! $( this ).hasClass('btn-disabled') ) {
				toggleButtons( button , btn_class, btn_class + '-hover');
			}
		});
	}

	function toggleButtons( button, current_btn_class, new_btn_class) {
		$( button ).toggleClass( current_btn_class );
		$( button ).toggleClass( new_btn_class );
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
			function( searchs, generateHtml) {
				refreshSearchList( searchs, destination_list, function( search, list ) {
					generateHtml(null, search);
				});
			},
			function( search, addButtonWithSearch) {
				generateHtmlForList( search, button_class, icon, generateContext,
				function(htmlButton) {
					addButtonWithSearch(null, destination_list, htmlButton);
				});
			},
			addButtonWithSearch	
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
			function( searchs, generateHtml ) {
		 		refreshSearchList(searchs, destination_list, function(search) {
					generateHtml(null, search)
				});
			},
			function( search, addButtonWithSearch ) {
				generateHtmlForList(search, button_class, icon, generateContext,
				function(htmlButton){
					addButtonWithSearch(null, destination_list, htmlButton );
				});
			},
			addButtonWithSearch
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

	function refreshSearchList( searchs, list, addButtonWithSearch ){
		$( list ).empty();
		searchs.forEach( function(search) {
			addButtonWithSearch( search );
		});
	}
	
	function addButtonWithSearch( list, html ) {
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
			function( searchs, generateHtmlForList ) {
				refreshSearchList( searchs, destination_list, function( search ) {
					generateHtmlForList( null, search);
				});  
			},
			function( search, addButtonWithSearch ) {
				generateHtmlForList( search, btn_class, icon, generateContext,
				function(htmlButton) {
					addButtonWithSearch(null,destination_list, htmlButton);
				});
			},
			addButtonWithSearch
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

	function postSearch(data, post_url, button, 
	addSearch ) {
		$.post(post_url, data, function() {
			addSearch( $( button ).attr('id') );
			removeCurrentButton( button );	
		});
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
			function( data, button, addSearch) {
				postSearch( data, post_url, button, function(id) { 
					addSearch(null, id);
				});
			},
			function( id, generateHtmlForList ) {
				addSearch(search_url, id, function( search ) { 
					generateHtmlForList(null, search);
				});
			},
			function(search, addButtonWithSearch) {
				generateHtmlForList( search, button_class, icon, generateContext,
				function( htmlButton) {
					addButtonWithSearch(null, destination_list, htmlButton);
				});
			},
			addButtonWithSearch
		]);
	}
	
	
	function addSearch(url, id, addButtonWithSearch) {
		$.get(url + id, function( search ) {
			addButtonWithSearch( search );
		});
	}

	function generateHtmlForList( search, button_class, icon,
	contextGenerator, addButtonWithSearch ) { 
		var buttonTemplate = $("#button-generator").html();
	
		var template = Handlebars.compile(buttonTemplate);
	
		function compile(context) {
			var htmlButton = template(context);
			addButtonWithSearch( htmlButton );
		}

		contextGenerator( search, button_class, icon, compile);
	}
}
