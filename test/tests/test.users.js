var request     = require('supertest');
var authservice = require('../library/authentication');

describe('Tests for users', function () {

  var serve; 
  before(function () { 
    process.env.NODE_ENV = 'testing';
    server = require('../../app');
    
  });

  after(function() {
    process.env.NODE_ENV = 'development';
  });
  
/* 
  it('Should fail login user.', function testUserLogin (done) {
    request(server)
      .post('/auth/login')
      .send(failUser)
      .expect(400)
      .end(function (err, ress) {
        if (err)
          done(err);
      });
      done();
  });

// how to use auth on closed calls
  it('Should get all users ', function testGetAllUsers (done) {
    request(server)
      .get('/api/getAllUsers')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });
*/

 


});