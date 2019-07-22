'use strict'

const app = require('./app')
const request = require('supertest')

describe('params', function () {
  it('should return status 200', function (done) {
    request(app)
      .get('/info/123')
      .expect(200, done)
  })

  it('should return status 400', function (done) {
    request(app)
      .get('/info/a')
      .expect(400, done)
  })

})
