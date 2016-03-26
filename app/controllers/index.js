var
	win = $.index,
    Dir = new Collection("Directory"),
    dataDir = Dir.getData(),
    exten = ['mp3']; 

function openSettings(){
    Alloy.createController("settings").getView().open();
}

function openMusic(){
	//Alloy.createController("audio",{}).getView().open();
}

if( dataDir.length == 0){
    var
        paths = Files.getPaths( exten );
    if( paths.length > 0 ){
        _.map(paths,function(e){
            Dir.add({ path: e.path, dir_name: e.pathName, status: 0 });
        });
        Dir.save();
    }
    openSettings();
}else{
	var
		data = [],
		index =0,
		playList = [],
		List = $.musicList;
	   
	_.map(dataDir,function( _dir ){
		_.map( Files.getFiles(_dir.path,exten) , function( f ){
		    playList.push(f);
			data.push({
				name : { index: index, text : f.replace(_dir.path+"/","")  }
			});
			index++;
		});
	});
	audioPlayer.setList( playList );
	List.sections[0].appendItems(data);
	List.addEventListener("itemclick",function(e){
	    var sec  = List.sections[e.sectionIndex];
	    var item = sec.getItemAt(e.itemIndex);
	    var url  = item.name.value;
	    var name = item.name.text;
	    var index = item.name.index;
	    Alloy.createController("audio",{name:name,index:index}).getView().open();
	});
	
	function inBackground(){
	    var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_MAIN
        });
        intent.addCategory(Ti.Android.CATEGORY_HOME);
        Ti.Android.currentActivity.startActivity(intent);
	}
	
	win.addEventListener("android:back",function(){
	    inBackground();
	});

    win.open();
}