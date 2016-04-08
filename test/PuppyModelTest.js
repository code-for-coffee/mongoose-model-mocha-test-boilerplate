// requir testing libraries
var chai = require('chai'),             // http://chaijs.com/api/bdd/
    expect = chai.expect,               // http://chaijs.com/guide/styles/#expect
    should = require('chai').should(),  // http://chaijs.com/guide/styles/#should
    control = control || {};

require('../db/database');              // require persistent db connection
var Puppy = require('../models/Puppy'); // require our Puppy Model

describe('CRUD on a Puppy Model', function () {

  beforeEach(function() {
    control.puppy = {
      name: 'Wishbone',
      breed: 'Jack Terrier'
    }
  });

  afterEach(function() {
    control.puppy = {};
  })

  it('can create a new Object', function() {
    Puppy.create(control.puppy, function(error, puppy) {
      should.not.exist(error);  // there better not be an error!!!!!
      should.exist(puppy);      // we should get back our mongoDB object
      should.exist(puppy.name);
      should.exist(puppy.breed);
    });
  });

  it('can get a list of ALL Objects', function() {
    // create a puppy so we can verify we have a list of objects
    var myObjectId;
    Puppy.create(control.puppy, function(error, puppy) {
      // same test as create
      should.not.exist(error);  // there better not be an error!!!!!
      should.exist(puppy);      // we should get back our mongoDB object
      should.exist(puppy.name);
      should.exist(puppy.breed);
      control.testObjectID = puppy['_id'];
    });
    // now time to test for all
    Puppy.find({}, function(error, puppies) {
      should.not.exist(error);  // there better not be an error!!!!!
      should.exist(puppies);      // we should get back our mongoDB object
      expect(puppies.length).to.be.above(0);
    });
  });

  it('can get an individual Object by ID', function() {
    // ok, we have the ID.. time to find it
    Puppy.findById(control.testObjectID, function(error, puppy) {
      should.not.exist(error);  // there better not be an error!!!!!
      should.exist(puppy);      // we should get back our mongoDB object
      should.exist(puppy.name);
      should.exist(puppy.breed);
    });
  });

  it('can update an object Object by ID', function() {
    var newName = 'Ultra Mega Wishbone';
    Puppy.findByIdAndUpdate(control.testObjectID,
      { name: newName },
      { new: true }, // this allows us to see the updated object
      function(error, puppy) {
        should.not.exist(error);  // there better not be an error!!!!!
        should.exist(puppy);      // we should get back our mongoDB object
        should.exist(puppy.name);
        should.exist(puppy.breed);
        expect(puppy.name).to.equal(newName);
    });
  });

  it('can destroy an object Object by ID', function() {
    // remove our object
    Puppy.findByIdAndRemove(control.testObjectID,
      function(error, puppy) {
        should.not.exist(error);  // there better not be an error!!!!!
        should.exist(puppy);      // we should get back our mongoDB object
        should.exist(puppy.name);
        should.exist(puppy.breed);
        expect(puppy.name).to.equal(newName);
    });
    // now search for it... it should not exist
    // ok, we have the ID.. time to find it
    Puppy.findById(control.testObjectID, function(error, puppy) {
      should.not.exist(puppy);   // this should not exist now...
    });
  });


});
