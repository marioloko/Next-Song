var SelectTrackController = function() {
	this.setSelectTrack = function setSelectTrack( list, select_btn_class, 
			current_icon, select_icon) {
		$( list ).on('click', 'button', function() {
			var button = this;
			editVote( button, function(){ 
				changeButtonToSelect( button, select_btn_class,
				 	current_icon, select_icon);
			});
		});
	}
	
	function changeButtonToSelect(button, select_btn_class, current_icon, select_icon) {
		$( button ).addClass( select_btn_class ).children().addClass( select_icon )
			.removeClass( current_icon )
	
		$( button ).closest('li').siblings().find('button')
			.removeClass( select_btn_class ) .children().addClass( current_icon )
			.removeClass( select_icon );
	}
	
	function editVote( button, refreshButton) {
		$.ajax({
			url: '/invitations',
			type: 'PATCH',
			data: { 
				"party_id" : $("#party").val(),
				"user_id" : $("#user").val(),
				"vote" : $( button ).attr('id')
			},
			success: refreshButton
		});
	}
}
