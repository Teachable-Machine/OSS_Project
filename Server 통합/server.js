var http = require('http'); 
var url = require('url');
var fs  = require('fs')
var querystring = require('querystring');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;
app.use(fileUpload());
app.use(express.static('public'));

app.get('/', function(req,res) {
    fs.readFile('main.html',function(error,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/information',function(req,res){
    fs.readFile('information.html',function(error,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);
var server = http.createServer(function(request,response){
    console.log('start log');
});

app.post('/upload', (req, res) => {
    const { image } = req.files;
    if (!image) return res.sendStatus(400); //image 업로드 실패시 error return
    if (/^image/.test(image.mimetype)) return res.sendStatus(400); //image type 미일치시 error return
    image.mv(__dirname + '/upload/' + image.name);//업로드 폴더로 이미지 이동
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`running port 3000`);
});