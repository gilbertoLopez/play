var _=require("alloy/underscore")._;

function httpRequest(params) {
    this.params = {
        type     : 'GET',
        url      : '',
        data     : null,
        dataType : 'HTML',
        success  : function(){},
        onerror  : function(){},
        onsendstream : function(){},
        onreadystatechange : function(){},
        timeout  : 8000
    };
    this.xhr = null;
    _.extend(this.params,params);
    this.params.type = this.params.type.toUpperCase();
    this.httpClient();
}

httpRequest.prototype.serialize=function(data){
    var dataEncode=[]; 
    (function urlEncode(data,root){
        _.map(data,function(value,key){
            var _root  = root==""? key : root+"["+key+"]";
            if( _.isArray(value) || _.isObject(value) ){
                urlEncode(data[key],_root);
            }else{
                dataEncode.push( _root+"="+value );
            }
        });
    }(data,""));
    return dataEncode.join("&");
};

httpRequest.prototype.httpClient=function(){
    if( !_.isEmpty(this.params.data) && ( _.isArray(this.params.data) || _.isObject(this.params.data) ) ){
        this.params.data = this.serialize(this.params.data);
    }
    this.xhr = Ti.Network.createHTTPClient({
        onload : function(e){
            var data = this.responseText;
            try{
                switch(this.params.dataType.toUpperCase() ){
                    case 'JSON' : data = JSON.parse(data); break;
                    case 'HTML' : data = JSON.stringify(data); break; 
                    default : break;
                }
                this.params.success(data);
            }catch(e){
                Titanium.API.error(data);
            }    
        },
        onerror : this.params.onerror,
        onsendstream: this.params.onsendstream,
        ondatastream: this.params.ondatastream,
        onreadystatechange: this.params.onreadystatechange,
        timeout : this.params.timeout
    });
    this.xhr.open( this.params.type , this.params.url );
    this.xhr.setRequestHeader('charset','utf-8');
    this.xhr.send(this.params.data);
};
module.exports = httpRequest;