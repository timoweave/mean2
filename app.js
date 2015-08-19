var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function(request, response) {

    var filename = request.url;
    
    function filter_filename(filename) {

        if (filename.substring(0, 1) == '/') {
            filename = filename.substring(1);
        }
        console.log('filter_filename ' + filename);
        if (filename === 'cars') {
            filename = 'views/cars.html';
        }
        else if (filename === 'cars/new') {
            filename = 'views/cars_new.html';
        }
        else if (filename === 'cats') {
            filename = 'views/cats.html';
        }
        console.log('filter_filename ' + filename);
        return filename;
    }

    function content_type(filename) {
        var extname = path.extname(filename);
        
        var type = 'text/html';
        switch (extname) {
        case '.js':
            type = 'text/javascript';
            break;
        case '.css':
            type = 'text/css';
            break;
        case '.json':
            type = 'application/json';
            break;
        case '.png':
            type = 'image/png';
            break;
        case '.jpg':
            type = 'image/jpg';
            break;
        case '.gif':
            type = 'image/gif';
            break;
        case '.wav':
            type = 'audio/wav';
            break;
        }
        console.log('content_type ' + type + ', ' + filename);
        return type;
    }

    function is_image(type) {
        switch (type) {
        case 'image/jpg':
        case 'image/png':
        case 'image/gif':
            return true;
            break;
        }
        return false;
    }
    
    function serve_filename(filename, request, response) {
        console.log('serve_filename ' + filename);
        var type = content_type(filename);
        var image = is_image(type);
        var encoding = image ? null : "utf8";
        fs.readFile(filename, function(errors, contents) {
            if (!errors) {
                response.writeHead(200, {'Content-Type': type });
                if (image) {
                    // response.write(contents);
                    response.end(contents, 'binary');
                } else {
                    response.write(contents);
                    response.end();
                }
                console.log('serve_filename ' + filename + ' served');
            }
        });
    }

    filename = filter_filename(filename);
    
    serve_filename(filename, request, response);
    
});

server.listen(7077);
console.log('node running at http://localhost:%d', 7077);
