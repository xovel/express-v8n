'use strict'

const app = require('./app')
const request = require('supertest')

describe('query', function () {
  it('should return status 200', function (done) {
    request(app)
      .get('/user?name=a&test=777')
      .expect(200, done)
  })

  it('should return status 400', function (done) {
    request(app)
      .get('/user?nam=a')
      .expect(400, done)
  })

})
