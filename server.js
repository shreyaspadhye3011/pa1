const express = require('express')
const siteUrl = "https://www.scu.edu/";
const axios = require("axios");
const cheerio = require("cheerio");
const fetchData = async () => {
  const result = await axios.get(siteUrl);
  console.log(cheerio.load(result.data).text())
  return cheerio.load(result.data);
};
const app = express()
const port = 3000

// test setup
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/test', (req, res) => fetchData())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))