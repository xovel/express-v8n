'use strict'

const app = require('./app')
const request = require('supertest')

describe('demo', function () {
  it('should return status 200', function (done) {
    request(app)
      .get('/test?name=a&test=b')
      .expect(200, done)
  })

  it('should return status 400', function (done) {
    request(app)
      .get('/test?name=a')
      .expect(400, done)
  })

  after(function () {
    process.exit(0)
  })
})
