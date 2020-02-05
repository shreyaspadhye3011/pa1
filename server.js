const express = require('express')
const siteUrl = "https://www.scu.edu/";
const axios = require("axios");
const cheerio = require("cheerio");

// scrapper code
const fetchData = async () => {
  const result = await axios.get(siteUrl);
  console.log(cheerio.load(result.data).html())
  return cheerio.load(result.data);
};
const app = express()
const port = 3000

// test setup
app.get('/', (req, res) => res.send('Hello World!'))

// scrapper route
app.get('/scrap', (req, res) => fetchData())

app.listen(port, () => console.log(`App listening on port ${port}!`))