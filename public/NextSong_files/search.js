function shineButtons( list, btn_class ) {
	$( list ).on('mouseenter mouseleave', 'button', function() {
		$( this ).toggleClass( btn_class );
		$( this ).toggleClass( btn_class + '-hover' );
	});
}

function deleteCurrentSearch(list, deleteSearch){
	$(list).on('click', 'button', function(event) {
		event.preventDefault();
		var button = this;
		deleteSearch(button, function() {
			removeCurrentButton( button );
		});
	});
}

function removeCurrentButton( button ) {
	$( button ).closest('li').remove();
}

function enterForSearching(url_format, party_id, destination_list, generateHtml) {
	$("#search").on('keydown', function(event) {
		if (event.which == 13) {
			event.preventDefault();
			search(url_format, party_id, destination_list, generateHtml);
		}
	});
}

function search(url_format, party_id, destination_list, generateHtml) {
	var url = url_format.replace('_id_', party_id);
	$.get(url, function(searchs) {
		refreshSearchList( searchs, destination_list, 'btn-ok', 'ok', generateHtml );
	});
}

function refreshSearchList( searchs, list, button_class, icon, generateHtml ) {
	$( list ).empty();
	searchs.forEach( function(search) {
		addButtonWithSearch( search, list, button_class, icon, generateHtml );
	});
}

function addButtonWithSearch( search, list, button_class, icon, generateHtml ) {
	$( list ).append( generateHtml( search, button_class, icon ) );
}

function showCurrentSearchs(url_format, id, list, btn_class, icon, generateHtml) {
	var url = url_format.replace('_id_', id)
	$.get(url, function( searchs ) {
		refreshSearchList( searchs, list, btn_class, icon, generateHtml);
	});
}

function addNewSearch(list, generateData, postSearch, post_url, search_url,
 generateHtml, destination_list, btn_class, icon) {
	$( list ).on('click', 'button', function(event) {
		event.preventDefault();
		var button = this;
		generateData( postSearch, post_url, search_url, button, generateHtml, 
			destination_list, btn_class, icon );
	});
}

function postSearch(data, post_url, search_url, button, generateHtml, 
	destination_list, btn_class, icon ) {
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


function generateHtmlForList( search, button_class, icon ) {
	var buttonTemplate = $("#button-generator").html();

	var template = Handlebars.compile(buttonTemplate);

	function compile(context) {
		var compiledButton = template(context);
		return compiledButton;
	}
	
	if (typeof generateContext === 'undefined') {
		console.log("You must create the function generate function")
	}
	return generateContext( search, button_class, icon, compile );
}
