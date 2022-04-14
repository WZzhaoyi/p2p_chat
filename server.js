const express = require("express");
const https = require('https');
const path = require('path');
const fs = require("fs");
const app = express();
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || "8000";

var options = {
    key:fs.readFileSync('C:/Users/Administrator/ssl/p2pchat.local+4-key.pem'),
    cert:fs.readFileSync('C:/Users/Administrator/ssl/p2pchat.local+4.pem')
}

const server = https.createServer(options,app);

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/myapp',
    ssl: options
});
 
app.use(peerServer);
 
app.use(express.static(path.join(__dirname)));
 
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});
 
server.listen(port);
console.log('Listening on: ' + port);