'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    var filePath = '.' + req.url;
    if (filePath === './')
        filePath = './index.html'; // Path to ur file lol

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, there was an error: ' + error.code + ' ..\n');
                res.end();
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

}).listen(port);

console.clear(); // delete it if you care of your console log history
console.log('Server running at http://localhost:' + port + '/');
