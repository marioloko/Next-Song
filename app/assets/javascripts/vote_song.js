var searcher = new Searcher();
var selectTrackController = new SelectTrackController();

$(document).ready(function(){
	var selectGenerator = new ContextSelectGenerator();

	searcher.animateButtonsOnHover('#next-songs-list', 'btn-like-hover'); 
	
	selectTrackController.setSelectTrack( '#next-songs-list', 'btn-select', 
	'glyphicon-thumbs-up', 'glyphicon-fire' );

	searcher.backgroundSearch('/api/v1/parties/_id_/tracks', $('#party').val(),
	'#next-songs-list', 'btn-like', 'thumbs-up', 
	selectGenerator.generateContext);

	selectTrackController.setAddedSongEvent(selectGenerator.generateContext);
	selectTrackController.setRemovedSongEvent();
	
	selectTrackController.setUpdateProgressBarEvent();
});

var ContextSelectGenerator = function() {
	this.generateContext = function generateContext( track, btn_class, icon,
	compileHtml ){
		var context = {
			name: track.title,
			owner: track.artist,
			id: track.id,
			btn_class: btn_class,
			icon: icon
		}
		compileHtml(context);
	}
}
