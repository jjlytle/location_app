
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

const {
	Stitch,
	RemoteMongoClient,
	AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

var dbname          = 'location_test';
var collectionName  = 'test';
var access 			= "mongodb+srv://jjlytle:test123@cluster0-suini.mongodb.net/test?retryWrites=true";
var accesssLocal     = 'mongodb://localhost:27017/'+dbname;
var accessStitch	= 'mongodb://jjlytle:test123@stitch.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=location_service-pijqf:mongodb-atlas:local-userpass'
var accessStitchApiKey	= 'mongodb://_:Wi3xMnfccjWFWbqoS6Gp8b32n8ORYv0FTs8S1Wc8j2VIaY6BAioc4saN0foDzCeZ@stitch.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=location_service-pijqf:mongodb-atlas:api-key'
var filename        = './data/run1.csv';
var timeNow 		= 1543835415241
var timeDiv			= 50
//Wi3xMnfccjWFWbqoS6Gp8b32n8ORYv0FTs8S1Wc8j2VIaY6BAioc4saN0foDzCeZ
//Wi3xMnfccjWFWbqoS6Gp8b32n8ORYv0FTs8S1Wc8j2VIaY6BAioc4saN0foDzCeZ
console.log('***************Process started');
//const client = Stitch.initializeDefaultAppClient('location_service-ovtrc');


MongoClient.connect(access, {useNewUrlParser : true}, function(err, client) {
	if (err) {
		console.log('error on connection '+err);
	}
	else{
		console.log('***************Successfully connected to mongodb');
		const collection = client.db(dbname).collection(collectionName);
		var fs          = require('fs');
		var readline    = require('readline');
		var stream      = require('stream');
		var instream    = fs.createReadStream(filename);
		var outstream   = new stream;
		var rl          = readline.createInterface(instream,outstream);
		var startLong   = -122.437608
		var startLat    = 47.244769

		console.log('***************Parsing, please wait ...');

		rl.on('line',function(line){
			try{
				var arr         = line.split(',');
				var myobj = 
					{ 
						name: "run1", 
						time: timeNow+=timeDiv,
						startingCoord: { type: "Point", coordinates: [startLong, startLat]},
						location: { type: "Point", coordinates: gpsToFeet(startLong, startLat, arr[0], arr[1]) } 
					};
				collection.insertOne(myobj);
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

let gpsToFeet = (long, lat, x, y) => {
	let longLat = Object();
	longLat[0] = long + ((x/1000)*(90/10000));
	longLat[1] = lat + ((y/1000)*(90/10000));
	return longLat;	
}

let latLongToM = (num) => {
	return (num * (10000.0/90.0))*1000.0
}

let MtoLatLong = (num) => {
	return (num/1000.0) * (90.0/10000.0)
}


