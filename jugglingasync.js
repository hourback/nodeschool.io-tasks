var http = require('http');
var concat = require('concat-stream');
var urls = [];
var results = [];

urls[0] = process.argv[2];
urls[1] = process.argv[3];
urls[2] = process.argv[4];

var httpGet = function (url, index, results) {
  var stream = concat( function (data) {
    //console.log("Results are " + results);
    //console.log(data.toString().match(/^.*\n/)[0]);
    results[index] = data.toString().match(/^.*\n/)[0];
    console.log("Just added response from " + url + ' to results[]');
    printResults(results);
    console.log("Finished with " + url);
  });
  http.get(url, function (res) {
    res.pipe(stream);
    console.log("Running httpGet() on " + url);
  }).on('error', function(e) {
    console.error("Got error: " + e)
  });
};

for (i in urls) {
  console.log(urls[i]);
  httpGet(urls[i], i, results);
}

var printResults = function (results) {
  console.log("Checking results...");
  for (i=0; i < 3; i++) {
    var isReady = true;
    console.log(typeof results[i]);
    if (typeof results[i] === "undefined") {
      console.log("Result at index " + i + " is undefined.");
      isReady = false;
    }
  }

  if (isReady) {
    console.log("Results has three values!");
    console.log(results);
  } else {
    console.log("Not yet...");
  }
};