const mongoose = require('mongoose');
require('dotenv').config();


const dbSeed = require(`./seeds/pcparts.js`);


const Pcpart = require(`./models/pcpart.js`);


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

Pcpart.insertMany(dbSeed, function(error, animal) {
  console.log('Data import completed.')
  mongoose.connection.close();
});