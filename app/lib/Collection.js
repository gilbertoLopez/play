var Alloy = require('alloy');
var _        = require("alloy/underscore")._;

function Collection(name) {
    this.Collection = Alloy.Collections.instance( name );
    this.Result=null;
}
Collection.prototype.getAllData = function() {
    return this.getData();
};
Collection.prototype.getData = function(params,selects) {
    selects = _.isArray(params)? params : selects;
    params = (!_.isArray(params) && _.isObject(params))? params : {};
    if( _.isUndefined(params) || _.isEmpty(params) ){
        this.Result = this.Collection;
        this.Result.fetch();
    }
    else{
        this.Collection.fetch();
        this.Result = this.Collection.where(params);
    }
    return this.toObject(selects);
};
Collection.prototype.toObject = function(selects) {
    var collectionData=[];
    this.Result.map(function( model ){
        var _attr={};
        if(_.isUndefined(selects) || _.isEmpty(selects)){
            _.map(model.attributes,function(data,key){
                _attr[key] = data;
            });
        }else{
             _.map(model.attributes,function(data,key){
                 if( _.indexOf(selects,key)>-1 ){
                    _attr[key] = data;
                 }
            });
        }
        collectionData.push( _attr );
    });
    return collectionData;
};
Collection.prototype.query = function(query) {
    this.Result = this.Collection.fetch({ query: query });
    console.log( this.Result );
};
Collection.prototype.countAll = function() {
    this.Collection.fetch();
    return this.Collection.length;
};
Collection.prototype.count = function() {
    return this.Result.length;
};
Collection.prototype.where = function(params) {
    return this.getData( params );
};
Collection.prototype.add = function(params,save) {
    save = save || false;
    this.Result = this.Collection.add(params);
    if( save ){
        var id={};
        this.Result.map(function(model){
            if( model.isNew() ){
                var pk = model.primary_key || "alloy_id";
                model.save();
                id[pk] = model.attributes[pk]; 
            }
        });
        return  id;
    }
};
Collection.prototype.update = function(params) {
    if( _.isObject(params.set) && !_.isEmpty(params.set) ){
        if( _.isObject(params.where) && !_.isEmpty(params.where) ){
            this.Collection.fetch();
            this.Result = this.Collection.where(params.where);
        }
        else{
            this.Result = this.Collection;
            this.Result.fetch();
        }
        this.Result.map(function(model){
            _.map(params.set,function(value,key){
                model.set(key,value);
            });
            model.save();
        });    
    }
};
Collection.prototype.save = function(params) {
    this.Collection.map(function(model){
        if( model.isNew() ){
            model.save();    
        }
    });
};
Collection.prototype.saveAll = function(params) {
    this.Collection.map(function(model){
            model.save();
    });
};
Collection.prototype.delete = function(params) {
    if( _.isEmpty(params) ){
         while( this.countAll() != 0 ){
            this.Collection.map(function( model ){
                model.destroy();
            });
        }
        this.Collection.reset();
    }else{
        this.Collection.where(params).map(function( model ){
            model.destroy();
        });
    }
    return this.countAll()==0;
};
module.exports = Collection;