var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var inputFile='./data/run1.csv';
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

// Connection FOR LOCAL server use first
//var access = 'mongodb://localhost:27017/location_app';
var access = "mongodb+srv://jjlytle:test123@cluster0-suini.mongodb.net/test?retryWrites=true";

MongoClient.connect(access, {useNewUrlParser : true}, function(err, client) {
	if (err) throw err;
	const collection = client.db("location_data").collection("table1");
	var myobj = { name: "Cheif RedShirt", location: {type: "Point", coordinates: [40, 35]} };
	collection.insertOne(myobj);
	collection.createIndex({location : "2dsphere"}, function(err, res) {
			if (err) throw err;
			console.log("created index")
		});

	client.close();
});

var promise1 = new Promise(function(resolve, reject) {
	resolve(
	MongoClient.connect(access, {useNewUrlParser : true}, 
		function(err, client) 
		{
			if (err) throw err;
			const collection = client.db("location_data").collection("table1");
			var myobj = 
				{ 
				name: "Cheif RedShirt", 
				location: {type: "Point", coordinates: } 
				};
			collection.insertOne(myobj);
		client.close();
		}
	)
	);
});

promise1.then(function(value) {
	console.log(value);
	// expected output: "Success!"
});

var parser = parse({delimiter: ','}, function (err, data) {
	async.eachSeries(data, function (line, callback) {
		promise1.then(function() {
			console.log(line);
			
			callback();
		});
	})
});
fs.createReadStream(inputFile).pipe(parser);

//var parser = parse({delimiter: ','}, function (err, data) {
//	async.eachSeries(data, function (line, callback) {
//		var myobj = { name: "Cheif RedShirt", location: {type: "Point", coordinates: [data[0], data[1]]} };
//		collection.insertOne( myobj ).then(function() {
//			console.log(data);
//			console.log(line);
//			callback();
//		});
//	})
//});
//fs.createReadStream(inputFile).pipe(parser);
//
//let gpsToFeet = (geoJSONobject) => {
//	statements
//}
//
//let latLongToKM = (num) => {
//	return num * (10000/90)
//}
//
//let KMtoFeet = (num) => {
//	return geolib.convertUnit("ft", num*1000.0)
//}
//
//let latLongToFeet = (num) => {
//	return KMtoFeet(latLongToKM(num));
//}