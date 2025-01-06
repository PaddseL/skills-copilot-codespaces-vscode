// Create web server
// 1. Load modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');

// 2. Create server
http.createServer(function (req, res) {
  // 3. Parse URL
  var url_parts = url.parse(req.url);
  var query = querystring.parse(url_parts.query);

  // 4. Switch path
  switch (url_parts.pathname) {
    case '/':
      display_form(res);
      break;
    case '/comment':
      add_comment(query, res);
      break;
    default:
      display_404(res);
      break;
  }
}).listen(8080);

// 5. Display form
function display_form(res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<html><head><title>Comments</title></head><body>');
  res.write('<h1>Comments</h1>');
  res.write('<form method="GET" action="/comment">');
  res.write('Name: <input name="name"><br>');
  res.write('Comment: <input name="comment"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  res.write('</body></html>');
  res.end();
}

// 6. Add comment
function add_comment(query, res) {
  var comment = query.name + ': ' + query.comment + '\n';
  fs.appendFile('comments.txt', comment, function (err) {
    if (err) throw err;
    display_form(res);
  });
}

// 7. Display 404
function display_404(res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write('404 Not Found\n');
  res.end();
}
