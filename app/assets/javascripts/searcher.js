var Searcher = function(){
	var self = this;

	this.animateButtonsOnHover = function(list, hover_button_class) {
		$( list ).on('mouseenter mouseleave', 'button', function() {
			var button = this;
			if (! $( this ).hasClass('btn-disabled') ) {
				$( button ).toggleClass( hover_button_class );
			}
		});
	}

	this.setButtonOnClickActionEvent = function(list, clickAction){
		$(list).on('click', 'button', function getButtonClickAction(event) {
			event.preventDefault();
			var button = this;
			if (typeof clickAction === "function") {
				clickAction(button, function() {
					removeParentLi( button );
				});
			}
		});
	}

	function removeParentLi( button ) {
		$( button ).closest('li').remove();
	}

	this.searchBoxAction = function(search_url, party_id, destination_list,
	button_class, icon, generateContext) {	
		async.waterfall([
			function( refreshSearchList ) {
				setEnterForSearchingEvent(search_url, party_id, function( searchs ) {
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

	function setEnterForSearchingEvent(url_format, party_id, 
	refreshSearchList ) {
		$("#search").on('keydown', function enterForSearching(event) {
			if (event.which == 13) {
				event.preventDefault();
				search_data = $("#search").val();
				search(search_data, url_format, party_id, refreshSearchList);
			}
		});
	}

	this.backgroundSearch = function(search_url, party_id, destination_list,
	button_class, icon, generateContext ) {
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

	this.displayCurrentSearchs = function(search_url, party_id, destination_list,
	btn_class, icon, generateContext ) {
		async.waterfall([
			function( refreshSearchList ) {
				getCurrentSearchs(search_url, party_id, function( searchs ) { 
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

	function getCurrentSearchs(url_format, id, refreshSearchList ) {
		var url = url_format.replace('_id_', id)
		$.get(url, refreshSearchList);
	}
	
	function setGetButtonOnClickEvent( list, generateData ) {
		$( list ).on('click', 'button', function getClickedButton(event) {
			event.preventDefault();
			var button = this;
	
			generateData( button );
		});
	}

	function postSearch(data, event_name, button, 
	appendSearch ) {
		dispatcher.trigger( event_name, data );
		appendSearch( $( button ).attr('id') );
		removeParentLi( button );	
	}

	this.displayNewSearch = function(current_list, generateData, post_url,
	search_url, destination_list, button_class, icon, generateContext) {	
		async.waterfall([
			function( generateData ) {
				setGetButtonOnClickEvent(current_list, function( button ) {
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
