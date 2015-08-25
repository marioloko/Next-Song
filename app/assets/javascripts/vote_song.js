var searcher = new Search();
var selectTrackController = SelectTrackController();

$(document).ready(function(){
	var selectGenerator = new ContextSelectGenerator();

	searcher.shineButtons('#next-songs-list', 'btn-like'); 
	
	setSelectTrack( '#next-songs-list', 'btn-select', 'glyphicon-thumbs-up',
		 'glyphicon-fire' );

	searcher.authomaticSearch('/api/v1/parties/_id_/tracks', $('#party').val(),
	'#next-songs-list', 'btn-like', 'thumbs-up', 
	selectGenerator.generateContext);
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
