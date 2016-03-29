var
	args = $.args,
	win  = $.wAudio,
	mT   = $.musicTime;

if ( audioPlayer.getIndex() != args.index ){
	audioPlayer.play( args.index );
	$.time.setText( "0.00" );
}

function setView(){    
    var d = audioPlayer.getInfo();
    win.setTitle( d.name );
    mT.setMin(0);
    mT.setMax( d.duration );
    mT.setValue( d.currentTime );
}
setView();

audioPlayer.player.addEventListener("change",function(e){
	setView();
});

mT.addEventListener('start',function(e){
	audioPlayer.pause( true );
});

mT.addEventListener('stop',function(e){
	audioPlayer.player.setTime( Math.ceil(e.value) );
	audioPlayer.tooglePlay();
	audioPlayer.increment();
});

$.pauseResumeButton.addEventListener('click', function() {
    audioPlayer.tooglePlay( true );
});

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" +(seconds < 10 ? '0' : '')+ seconds;
}

audioPlayer.player.addEventListener('progress',function(e) {
    $.time.setText( millisToMinutesAndSeconds ( e.progress ) );
    mT.setValue( e.progress );
    //Ti.API.info('State: ' + e.description + ' (' + e.progress + ')');
});
/*


audioPlayer.player.addEventListener('change',function(e){
	$.time.setText( millisToMinutesAndSeconds( e.source.time ) );
});

/*
audioPlayer.addEventListener('complete',function(e){
    next();
});
*/
$.next.addEventListener('click',function(e){
    audioPlayer.next( true );
});

$.prev.addEventListener('click',function(){
    audioPlayer.prev( true );
});