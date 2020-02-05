# pa1
Shreyas Padhye
1556287 | spadhye@scu.edu
COEN 317 - Distributed Systems - PA1
Feb 5, 2020

This is a node.js web server serving a web page by accpeting asynchronous event-driven connections. 

The index.html file was downloaded using `wget scu.edu`

# setup
1. You should have node installed in your system. Installation: https://nodejs.org/en/download/
2. Copy this project
3. In the project root directry, run `npm install` -- this will install all the dependencies required and create a folder called `node_modules`
4. Run the command `node server.js "document_root" port` to initiate web server [Replace "document_root" and port with values of your choice]
5. Go to browser and test at http://localhost:port

# test
On command line, type the following command and provide <docuemnt_root> & <port> as required
[CMD]
`node server.js <docuemnt_root> & <port>`
Note: Be sure to keep document root address in quotes 

For example:
`node server.js "/Users/COEN 317" 8000`

If you face any issues please contact spadhye@scu.edu or shreyaspadhye3011@gmail.com
