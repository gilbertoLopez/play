var
	args = $.args,
	win  = $.wAudio,
	mT   = $.musicTime;

audioPlayer.play( args.index );
win.setTitle( args.name );

console.log( audioPlayer.getCurrentName() );
$.time.setText( "0.00" );
console.log( audioPlayer.player );
/*mT.setMin(0);
mT.setMax( audioPlayer.getDuration() );
mT.addEventListener('start',function(e){
	audioPlayer.pause();
});
mT.addEventListener('stop',function(e){
	audioPlayer.setTime( Math.ceil(e.value) );
	audioPlayer.play();
});
*/

$.pauseResumeButton.addEventListener('click', function() {
    audioPlayer.tooglePlay( true );
});

/*audioPlayer.addEventListener('progress',function(e) {
    $.time.setText( parseFloat( Math.ceil( e.progress/1000 )*0.01).toFixed(2) );
    $.musicTime.setValue( e.progress );
    //Ti.API.info('State: ' + e.description + ' (' + e.progress + ')');
});

audioPlayer.addEventListener('change',function(e){
	$.time.setText( parseFloat( Math.ceil( e.source.time/1000 )*0.01).toFixed(2) );
});

audioPlayer.addEventListener('complete',function(e){
    next();
});
*/
$.next.addEventListener('click',function(e){
    audioPlayer.next( true );
    console.log( audioPlayer.getCurrentName() );
});

$.prev.addEventListener('click',function(){
    audioPlayer.prev( true );
    console.log( audioPlayer.getCurrentName() );
});