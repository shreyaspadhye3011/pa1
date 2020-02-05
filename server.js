const express = require('express');
var fs = require('fs');
const app = express()

// get port and document root from command line
const myArgs = process.argv.slice(2);
// validate script arguments
if (myArgs.length == 2) {
    const document_root = myArgs[0]
    const port = myArgs[1]

    // home route
    app.get('/', (req, res) => {
        // res.send('Hello!')
        fs.readFile(document_root + "/index.html", function(err, text){
            if (err) {
                // console.error(error);
                //TODO: Check err.errno and decide whether 404 or 403
                res.setHeader("Content-Type", "text/html");
                return res.end("404: File Not Found");
            }
            res.setHeader("Content-Type", "text/html");
            return res.end(text);
          });
    })

     // all routes
     app.get('/*', (req, res) => {
        // res.send('Hello!')
        console.log('*******'+req.originalUrl);
        fs.readFile(document_root + req.originalUrl, function(err, text){
            if (err) {
                console.error(err);
                res.setHeader("Content-Type", "text/html");
                return res.end("404: File Not Found");
            }
            res.setHeader("Content-Type", "text/html");
            res.end(text);
          });
          return;
    })

    // TODO: handle port in use case
    // bind port & listen for connections
    app.listen(port, () => console.log(`App listening on port ${port}!`))
} else {
    console.error("Error: Please provide both the required arguments as: `node server.js <document_root> <port>`. Look at README for details")
}


