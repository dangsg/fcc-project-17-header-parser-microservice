// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const publicIp = require('public-ip');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
	res.json({greeting: 'hello API'});
});


// header-parser API
app.get("/api/header-parser", (req, res) => {

	(async () => {
		let ip = null;
		try {
			ip = await publicIp.v4();
		}
		catch(e) {
			console.log("Can't get IP address!");
		} 
		finally {
			res.json({
				ip: ip,
				"system-info": req.headers["user-agent"],
				language: req.headers["accept-language"]
			});
		}
	})();
})

// ["_readableState","readable","domain","_events","_eventsCount","_maxListeners","socket","connection","httpVersionMajor","httpVersionMinor","httpVersion","complete","headers","rawHeaders","trailers","rawTrailers","upgrade","url","method","statusCode","statusMessage","client","_consuming","_dumped","next","baseUrl","originalUrl","_parsedUrl","params","query","res","_parsedOriginalUrl","route"]


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

// local test
var listener = app.listen(5000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});