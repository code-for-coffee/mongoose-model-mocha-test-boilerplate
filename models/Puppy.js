// require our ORM
var mongoose = require('mongoose'); // our handy dandy ORM

// define what types our values should be
// using a Schema - this is similar declaring
// table columns etc using Migration
// want to add required and other validators?
// http://mongoosejs.com/docs/validation.html
var PuppySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String
  }
});

// we export a Mongoose Model with the Schema
module.exports = mongoose.model('Puppy', PuppySchema);
