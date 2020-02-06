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
        fs.readFile(document_root + "/index.html", function(err, text) {
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Date", new Date());
            console.log("()()")            
            console.log(new Date())
            if (err) {
                // console.log("///"+err.errno)
                return handleErrors(res, err.errno);
            }
            // Success code & content
            res.status(200);
            res.setHeader("Content-Length", Buffer.byteLength(text, 'utf8'));
            return res.end(text);
        });
    })

    // jpg routes
    app.get('/*.jpg', (req, res) => {
        fs.readFile(document_root + req.originalUrl, function(err, text) {
            res.setHeader("Content-Type", "image/jpg");
            res.setHeader("Date", new Date());
            if (err) {
                // console.error(err.errno);
                return handleErrors(res, err.errno);
            }
            // Success code & content
            res.status(200);
            res.setHeader("Content-Length", Buffer.byteLength(text, 'utf8'));
            return res.end(text);
        });
    })

    // text/javascript
    app.get('/*.js', (req, res) => {
        fs.readFile(document_root + req.originalUrl, function(err, text) {
            res.setHeader("Content-Type", "text/javascript");
            res.setHeader("Date", new Date());
            if (err) {
                // console.error(err.errno);
                return handleErrors(res, err.errno);
            }
            // Success code & content
            res.status(200);
            res.setHeader("Content-Length", Buffer.byteLength(text, 'utf8'));
            return res.end(text);
        });
    })

    // png routes
    app.get('/*.png', (req, res) => {
        fs.readFile(document_root + req.originalUrl, function(err, text) {
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Date", new Date());
            if (err) {
                // console.error(err.errno);
                return handleErrors(res, err.errno);
            }
            // Success code & content
            res.status(200);
            res.setHeader("Content-Length", Buffer.byteLength(text, 'utf8'));
            return res.end(text);
        });
    })

    // text/css routes
    app.get('/*.css', (req, res) => {
        fs.readFile(document_root + req.originalUrl, function(err, text) {
            res.setHeader("Content-Type", "text/css");
            res.setHeader("Date", new Date());
            if (err) {
                // console.error(err.errno);
                return handleErrors(res, err.errno);
            }
            // Success code & content
            res.status(200);
            res.setHeader("Content-Length", Buffer.byteLength(text, 'utf8'));
            return res.end(text);
        });
    })

    // image/gif routes
    app.get('/*.gif', (req, res) => {
        fs.readFile(document_root + req.originalUrl, function(err, text) {
            res.setHeader("Content-Type", "image/gif");
            res.setHeader("Date", new Date());
            if (err) {
                // console.error(err.errno);
                return handleErrors(res, err.errno);
            }
            // Success code & content
            res.status(200);
            res.setHeader("Content-Length", Buffer.byteLength(text, 'utf8'));
            return res.end(text);
        });
    })

    // all other routes
    app.get('/*', (req, res) => {
    fs.readFile(document_root + req.originalUrl, function(err, text) {
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Date", new Date());
        if (err) {
            // console.error(err.errno);
            return handleErrors(res, err.errno);
        }
        // Success code & content
        res.status(200);
        res.setHeader("Content-Length", Buffer.byteLength(text, 'utf8'));
        return res.end(text);
        });
    })

    function handleErrors(res, code) {
        console.log(code)
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
        res.setHeader("Content-Length", Buffer.byteLength(message, 'utf8'));
        return res.end(message);
    }

    // bind port & listen for connections
    app.listen(port, () => console.log(`App listening on port ${port}!`))
    // .on('error', console.log("Error: Port already in use. Try a different port"));
} else {
    console.error("Error: Please provide both the required arguments as: `node server.js <document_root> <port>`. Look at README for details")
}


