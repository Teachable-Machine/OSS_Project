var http = require('http')
var fs = require('fs')

fs.readFile('image.jpg', function(err, data) {
  if (err) throw err 
  http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) 
  }).listen(3000)
  console.log('running localhost:3000')
})