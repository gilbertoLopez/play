var 
	args = $.args,
	win = $.wSettings,
	Dir = new Collection("Directory"),
	List = $.dirList,
	data = [];

_.map(Dir.getData(),function(d){
    data.push({
        sDir : { value : !!d.status },
        path : { itemId : d.id },
        name : { text : d.dir_name }
    });
});
List.sections[0].appendItems(data);
List.addEventListener("itemclick",function(e){
    var sec  = List.sections[e.sectionIndex];
    var item = sec.getItemAt(e.itemIndex);
    //var id   = item.templateDir.itemId;
});
win.addEventListener("open", function(evt) { 
    var abSettings = this.getActivity().actionBar;
    abSettings.onHomeIconItemSelected = function(){
        win.close();
    };
});