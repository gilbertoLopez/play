var _             = require("alloy/underscore")._;
//var Backbone    = require("alloy/Backbone");
//var Collection  = require("Collection");
var stepsVolume = [1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.02,0.01,0];
var total       = stepsVolume.length;
var A           = null;

function Audio(){
	this.player  = Ti.Media.createAudioPlayer({ allowBackground: true,audioSessionMode:Ti.Media.AUDIO_SESSION_MODE_PLAYBACK });
	this.active  = null;
    this.index   = 0;
	this.List    = [];
	this.complete();
	A = this;
}
//_.extend( Audio,A.player );
Audio.prototype.increment = function(callback){
   callback = callback || function(){};
   var audio = this.player; 
   ( function _increment(i){
        if( i > -1 ){
            audio.setVolume( stepsVolume[i--] );
            setTimeout(function(){
                _increment(i);   
            },15);
        }else{
            callback();
        }
   })( total-2 );
};
Audio.prototype.decrement = function(callback){
   callback = callback || function(){};
   var audio =  this.player;
   ( function _decrement(i){
        if( i < total ){
            audio.setVolume( stepsVolume[i++] );
            setTimeout(function(){
                _decrement(i);   
            },15);
        }else{
            callback();
        }
   })( 0 );
};
Audio.prototype.prev = function( deg ){
    deg = deg || false;
    --this.index;
     if( deg ){
        this.decrement(function(){
             A.play();
             A.increment();
        });
     }else{
        this.play();
     }
};
Audio.prototype.next = function( deg ){
    deg = deg || false;
    ++this.index;
     if( deg ){
        this.decrement(function(){
             A.play();
             A.increment();
        });
     }else{
        this.play();
     }
};
Audio.prototype.tooglePlay = function( deg ){
	if (this.player.playing){
		if( deg ){
			this.decrement(function(){
	        	A.player.pause();
	        });
		}else{
			this.player.pause();
		}
    }else{
    	this.player.play();
    	if( deg ){
    		this.increment();
    	}
    }
};
Audio.prototype.reset = function(){
    this.player.stop();
    if (Ti.Platform.name === 'android'){ 
        this.player.release();
    }   
    this.player.setTime(0);
};
Audio.prototype.play = function( index  ){
    this.index = parseInt(index) || this.index;
    if (this.player.playing || this.player.paused){
        this.reset();
    }
    this.active = this.List[ this.index ];
    this.player.setUrl( this.active );
    this.player.play();
    console.log( this.player );
};
Audio.prototype.pause = function( deg ){
	deg = deg || false;
    if( deg ){
		this.decrement(function(){
	    	A.player.pause();
	    });
	}else{
		this.player.pause();
	}
};
Audio.prototype.complete = function(){
	this.player.addEventListener("complete",function(){
		A.reset();
		A.next();
	});
};
Audio.prototype.stop = function( index  ){
    this.reset();
};
Audio.prototype.setList = function( List ){
    this.List = List;
};
Audio.prototype.getList = function(){
    return this.List;
};
Audio.prototype.getIndex = function(){
    return this.index;
};
Audio.prototype.getInfo = function(){
    return {
    	name : A.player.url.match(/([^\/]+)(?=\.\w+$)/)[0],
    	duration : A.player.duration,
    	currentTime : A.player.time
    };
};
Audio.prototype.getCurrentAudio = function(){
    return this.active;
};
module.exports = Audio;