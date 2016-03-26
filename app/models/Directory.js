exports.definition = {
	config: {
        columns: {
            "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "path": "TEXT",
            "dir_name": "TEXT",
            "status": "INTEGER"
        },
		adapter: {
			type: "sql",
			collection_name: "Directory",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			primary_key : "id"
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {});
		return Collection;
	}
};