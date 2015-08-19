var search = new Search();
var selectTrackController = SelectTrackController();

$(document).ready(function(){
	search.shineButtons('#next-songs-list', 'btn-like'); 
	
	setSelectTrack( '#next-songs-list', 'btn-select', 'glyphicon-thumbs-up',
		 'glyphicon-fire' );

	search.search('/api/v1/parties/_id_/tracks', $('#party').val(),
		'#next-songs-list', search.generateHtmlForList, 'btn-like', 'thumbs-up');
});

var ContextGenerator = function() {
	this.generateContext = function generateContext( track, btn_class, icon,
			callback ){
		var context = {
			name: track.title,
			owner: track.artist,
			id: track.id,
			btn_class: btn_class,
			icon: icon
		}
		return callback(context);
	}
}
