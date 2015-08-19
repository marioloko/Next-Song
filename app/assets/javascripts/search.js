var Search = function(){
	var self = this;
	var contextGenerator;

	setUpSearch();

	this.shineButtons = function shineButtons( list, btn_class ) {
		$( list ).on('mouseenter mouseleave', 'button', function() {
			var button = this;
			toggleButtons( button , btn_class, btn_class + '-hover');
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

	this.enterForSearching = function enterForSearching(url_format, party_id, 
			destination_list, generateHtml, btn_class, icon ) {
		$("#search").on('keydown', function(event) {
			if (event.which == 13) {
				event.preventDefault();
				self.search(url_format, party_id, destination_list, generateHtml, 
					btn_class, icon );
			}
		});
	}

	this.search = function search(url_format, party_id, destination_list,
		 generateHtml, btn_class, icon ) {
		var url = url_format.replace('_id_', party_id);
		$.get(url, function(searchs) {
			refreshSearchList( searchs, destination_list, btn_class, icon,
			 	generateHtml );
		});
	}

	function refreshSearchList( searchs, list, button_class, icon, generateHtml ){
		$( list ).empty();
		searchs.forEach( function(search) {
			addButtonWithSearch( search, list, button_class, icon, generateHtml );
		});
	}
	
	function addButtonWithSearch(search, list, button_class, icon, generateHtml) {
		$( list ).append( generateHtml( search, button_class, icon ) );
	}

	this.showCurrentSearchs = function showCurrentSearchs(url_format, id, list,
		 btn_class, icon, generateHtml) {
		var url = url_format.replace('_id_', id)
		$.get(url, function( searchs ) {
			refreshSearchList( searchs, list, btn_class, icon, generateHtml);
		});
	}
	
	this.addNewSearch =	function addNewSearch(list, generateData, postSearch,
			post_url, search_url, generateHtml, destination_list, btn_class, icon) {
		$( list ).on('click', 'button', function(event) {
			event.preventDefault();
			var button = this;
	
			if (typeof generateData === "function" ) {
				generateData( postSearch, post_url, search_url, button, generateHtml, 
					destination_list, btn_class, icon );
			}
		});
	}

	this.postSearch = function postSearch(data, post_url, search_url, button, 
			generateHtml, destination_list, btn_class, icon ) {
		$.post(post_url, data, function() {
			removeCurrentButton( button );	
			addTrack(search_url, $( button ).attr('id'), generateHtml, 
				destination_list, btn_class, icon );
		});
	}
	
	function addTrack(url, id, generateHtml, destination_list, btn_class, icon) {
		$.get(url + id, function( track ) {
			addButtonWithSearch( track, destination_list, btn_class, icon,
				generateHtml);
		});
	}

	this.generateHtmlForList = function generateHtmlForList( search, button_class, 			icon ) {
		

		var buttonTemplate = $("#button-generator").html();
	
		var template = Handlebars.compile(buttonTemplate);
	
		function compile(context) {
			var compiledButton = template(context);
			return compiledButton;
		}
		
		if (typeof contextGenerator.generateContext !== 'function') {
			console.log("You must create the function generate function")
		}
		return contextGenerator.generateContext( search, button_class, icon,
			 compile );
	}

	function setUpSearch() {
		$(document).ready(function() {
			if ( typeof ContextGenerator === "function" ) {
				contextGenerator = new ContextGenerator();
			}
		});
	}
}
