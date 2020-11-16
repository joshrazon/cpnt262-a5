const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Import Models
const Pcpart = require('./models/pcpart.js');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Connect to DB
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');
});

app.get('/', (req, res) => res.send('<h1>Go to /api/v0/pcparts to see a list of pc parts</h1>'))

// Returns a list of pc parts
app.get('/api/v0/pcparts', (req, res) => {
  Pcpart.find(function(err, data) {
    console.log(data);
    res.json(data)
  });
})

app.get('/api/v0/pcparts/:id', (req, res) => {
  let partID = req.params.id;
  Pcpart.findOne({ id: partID }, function (err, part) {
    res.json(part)
  });
})

app.use(function(req, res) {
  res.status(404);
  res.send('404: File Not Found');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});