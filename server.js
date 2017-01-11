var express = require('express');
var app = express();
var multer  = require('multer')
var path = require('path');

/*

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
*/
var storage = multer.memoryStorage()

var upload = multer({ storage: storage });


//Setting views and public folder
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//Simple Router
app.get('/',function(req,res){
  res.render('home');
})

app.post('/submit', upload.single('userFile'), function (req, res, next) {

  var result = {
    Name: req.file.originalname,
    Size: req.file.size + " Bytes",
  }
  res.send(result);
});

//Server
var port =  process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Server running');
});
