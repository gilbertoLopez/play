var
	args = $.args,
	win  = $.wAudio,
	mT   = $.musicTime;

if ( audioPlayer.getIndex() != args.index ){
	audioPlayer.play( args.index );
	$.time.setText( "0.00" );
}
var d = audioPlayer.getInfo();
console.log( d );
win.setTitle( d.name );
mT.setMin(0);
mT.setMax( d.duration );
mT.setValue( d.currentTime );

console.log(  _.functions(audioPlayer.player) );

audioPlayer.player.addEventListener("change",function(e){
	console.log( e );
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

audioPlayer.player.addEventListener('progress',function(e) {
    $.time.setText( parseFloat( Math.ceil( e.progress/1000 )*0.01).toFixed(2) );
    mT.setValue( e.progress );
    //Ti.API.info('State: ' + e.description + ' (' + e.progress + ')');
});
/*
audioPlayer.addEventListener('change',function(e){
	$.time.setText( parseFloat( Math.ceil( e.source.time/1000 )*0.01).toFixed(2) );
});

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