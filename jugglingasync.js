var http = require('http');
var concat = require('concat-stream');
var urls = [];
var results = [];

urls[0] = process.argv[2];
urls[1] = process.argv[3];
urls[2] = process.argv[4];

var httpGet = function (url, index, results) {
  var stream = concat( function (data) {
    results[index] = data.toString();
    printResults(results);
  });
  http.get(url, function (res) {
    res.pipe(stream);
  }).on('error', function(e) {
    console.error("Got error: " + e)
  });
};

for (i in urls) {
  httpGet(urls[i], i, results);
}

var printResults = function (results) {
  var isReady = true;
  for (i=0; i < 3; i++) {
    if (typeof results[i] === "undefined") {
      isReady = false;
    }
  }

  if (isReady) {
    for (i in results) {
      console.log(results[i].split("\n")[0]);
    }
  }
};