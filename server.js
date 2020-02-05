const express = require('express');
var fs = require('fs');
const axios = require("axios");
const cheerio = require("cheerio");
const app = express()
const siteUrl = "https://www.scu.edu/";

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
     app.get('/:path', (req, res) => {
        // res.send('Hello!')
        fs.readFile(document_root + path, function(err, text){
            if (err) {
                console.error(error);
            }
            res.setHeader("Content-Type", "text/html");
            res.end(text);
          });
          return;
    })

    // *********************** Test / experimental code ***************** //
    // test setup
    app.get('/test', (req, res) => res.send('Test Successful! Server responding on port ' + port))

    // scrapper route
    app.get('/scrap', (req, res) => {
        fetchData();
        res.end();
    })

    // scrapper code
    const fetchData = async () => {
        const result = await axios.get(siteUrl);
        // console.log(cheerio.load(result.data).html())
        return cheerio.load(result.data);
    };
    // *********************** Test / experimental code ***************** //

    // TODO: handle port in use case
    // bind port & listen for connections
    app.listen(port, () => console.log(`App listening on port ${port}!`))
} else {
    console.error("Error: Please provide both the required arguments as: `node server.js <document_root> <port>`. Look at README for details")
}


