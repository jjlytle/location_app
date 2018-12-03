

var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var dbname          = 'location_data';
var collectionName  = 'table1';
var access 			= "mongodb+srv://jjlytle:test123@cluster0-suini.mongodb.net/test?retryWrites=true";
var acesssLocal     = 'mongodb://localhost:27017/'+dbname;
var filename        = './data/run1.csv';
console.log('***************Process started');

MongoClient.connect(access, {useNewUrlParser : true}, function(err, client) {
	if (err) {
		console.log('error on connection '+err);
	}
	else{
		console.log('***************Successfully connected to mongodb');
		const collection = client.db("location_data").collection("table1");
		var fs          = require('fs');
		var readline    = require('readline');
		var stream      = require('stream');
		var instream    = fs.createReadStream(filename);
		var outstream   = new stream;
		var rl          = readline.createInterface(instream,outstream);

		console.log('***************Parsing, please wait ...');

		rl.on('line',function(line){
			try{
				var arr         = line.split(',');
				var myobj = 
					{ 
						name: "Cheif RedShirt", 
						location: { type: "Point", coordinates: [ parseFloat(arr[0]), parseFloat(arr[1]) ] } 
					};
				collection.insertOne(myobj);
				//var res = collection.insert(object);
			}
			catch (err){
				console.log(err);
			}
		});

		rl.on('close',function(){
			client.close();
			console.log('***************completed');
		});
	}
});

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