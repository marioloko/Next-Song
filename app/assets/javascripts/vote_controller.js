var searcher = new Searcher();
var voteModel = new VoteModel();

$(document).ready(function(){
	var voteGenerator = new ContextSelectGenerator();

	searcher.animateButtonsOnHover('#next-songs-list', 'btn-like-hover'); 
	
	voteModel.setSelectTrackOnClickEvent( '#next-songs-list', 'btn-select', 
	'glyphicon-thumbs-up', 'glyphicon-fire' );

	searcher.backgroundSearch('/api/v1/parties/_id_/tracks', $('#party').val(),
	'#next-songs-list', 'btn-like', 'thumbs-up', 
	voteGenerator.generateContext);

	voteModel.setAddedSongEvent(voteGenerator.generateContext);
	voteModel.setRemovedSongEvent();
	
	voteModel.setUpdateProgressBarsEvent();
});
