'use strict'

const app = require('./app')
const request = require('supertest')

describe('headers', function () {
  it('should return status 200', function (done) {
    request(app)
      .get('/spec')
      .set('token', 'foo')
      .expect(200, done)
  })

  it('should return status 400', function (done) {
    request(app)
      .get('/spec')
      .expect(400, done)
  })

})
