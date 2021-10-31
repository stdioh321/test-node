var http = require('http');
var fs = require('fs');

const file = `${__dirname}/docs/output-server-stream.txt`;
http.createServer(function(req, res) {
    console.log("HERE");
    if (/^\/$/.test(req.url)) {
        // This opens up the writeable stream to `output`
        var writeStream = fs.createWriteStream(file);
        // This pipes the POST data to the file
        req.pipe(writeStream);
        // This is here incase any errors occur
        writeStream.on('error', function(err) {
            console.log(err);
        });
    }



    // After all the data is saved, respond with a simple html form so they can post more data
    req.on('end', function() {
        res.writeHead(200, { "content-type": "text/html" });
        res.end('<form method="GET"><input name="test" value="Some Value" /><input type="submit"></form>');
    });


}).listen(8080);