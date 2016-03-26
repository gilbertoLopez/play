exports.getPaths = function( files ){
    var 
        ext   = files,
        paths = [],
        currentDir = "";
        
    (function main( root,level,levelDir){
        var level = level;
        var root  = root;
        var file  = Titanium.Filesystem.getFile(root);
        _.map(file.directoryListing,function(e){
            var f = Titanium.Filesystem.getFile(root+e);
            if( root+e != root+"emulated" && !JSON.parse(f.hidden) ){
                if( f.isDirectory()  ){
                    levelDir = ( level == 0)? root+e+"/" : levelDir;
                    main(root+e+"/",level+1,levelDir);
                }else{
                    var arch = Titanium.Filesystem.getFile( root+e );
                    if( _.indexOf( ext, arch.extension() ) > -1 ){
                        if( currentDir != arch.parent.nativePath ){
                            currentDir = arch.parent.nativePath;
                            paths.push({
                                path : currentDir,
                                pathName : currentDir.toString().replace( levelDir,"" )
                            });
                        }
                    }
                }
            }
            f = null;
        });
        levelDir = "";
        file = null;
    })("file:///storage/",0,"");
    return paths;
};
exports.getFiles = function( DIR, files ){
	var 
        ext   = files,
        data  = [],
        currentDir = "";
        
    (function main( root ){
    	var root  = root;        
        var file  = Titanium.Filesystem.getFile(root);
        if( file.isDirectory()  ){
	        _.map(file.directoryListing,function(e){            
	            var arch = Titanium.Filesystem.getFile( root+e );
	            if( _.indexOf( ext, arch.extension() ) > -1 ){
	                data.push(root+"/"+e);
	            }
	        });
	    }
        file = null;
    })( DIR );
    return data;
};