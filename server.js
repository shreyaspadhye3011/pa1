const express = require('express');
var fs = require('fs');
const app = express()

// get port and document root from command line
const myArgs = process.argv.slice(2);
// validate script arguments
if (myArgs.length == 2) {
    const document_root = myArgs[0]
    const port = myArgs[1]

    // middleware to check parsable URI eg to handle "http://localhost/\%"
    app.use(function(req, res, next) {
        var err = null;
        try {
            decodeURIComponent(req.path)
        } catch(e) {
            err = e;
        }
        if (err){
            // console.log(err, req.url);
            // Respond with a 400 when decodeURIComponent fails 
            handleErrors(res, -1);
        }
        next();
    });

    // home route
    app.get('/', (req, res) => {
        // res.send('Hello!')
        fs.readFile(document_root + "/index.html", function(err, text){
        res.setHeader("Content-Type", "text/html");
            if (err) {
                //TODO: Check err.errno and decide whether 404 or 403
                // return res.end("404: File Not Found");
                console.log("///"+err.errno)
                return handleErrors(res, err.errno);
            }
            return res.end(text);
          });
    })

     // all routes
     app.get('/*', (req, res) => {
        // res.send('Hello!')
        console.log('*******'+req.originalUrl);
        fs.readFile(document_root + req.originalUrl, function(err, text){
        res.setHeader("Content-Type", "text/html");
            if (err) {
                console.error(err.errno);
                return handleErrors(res, err.errno);
            }
            return res.end(text);
          });
    })

    function handleErrors(res, code) {
        let statusCode = 400;
        let message = "400: Bad Request";
        switch(code) {
            case -2:
                statusCode = 404;
                message = "404: File Not Found";
                break;
            case -13:
                statusCode = 403;
                message = "403: Insufficient permissions on the file";
                break;
        }
        res.status(statusCode);
        return res.end(message);
    }

    // TODO: handle port in use case
    // bind port & listen for connections
    app.listen(port, () => console.log(`App listening on port ${port}!`))
} else {
    console.error("Error: Please provide both the required arguments as: `node server.js <document_root> <port>`. Look at README for details")
}


