var PartiesController = function() {
	this.goParty = function goParty() {
		$('#current-parties-list').on('click', 'button', function() {
			location.href = '/parties/' + $( this ).attr('id') + '/vote'	
		});
	}
	
	this.showPartyModal = function showPartyModal() {
		$("#show-party-modal").on('click', function() {
			$("#new-party").modal();
		});
	}
	
	this.generatePartiesData = function generatePartiesData( callback, post_url,
		search_url, button, generateHtml, destination_list, btn_class, icon ) {
		var data = {
			"user_id" : $("#user").val(),
			"party_id" : $( button ).attr('id')
		};		
		callback(data, post_url, search_url, button, generateHtml,
	 		destination_list, btn_class, icon);
	}
}
