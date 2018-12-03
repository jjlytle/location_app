var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url,  {useNewUrlParser : true}, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	var myobj = { name: "Company Inc", address: "Highway 37" };
	dbo.collection("customers").insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	});
});