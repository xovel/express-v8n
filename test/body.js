'use strict'

const app = require('./app')
const request = require('supertest')

describe('body', function () {
  it('should return status 200', function (done) {
    const data = {
      id: 'u1',
      name: 'Foo'
    }
    request(app)
      .post('/create')
      .send(data)
      .expect(200, done)
  })

  it('should return status 400', function (done) {
    const data = {
      name: 'Foo'
    }
    request(app)
      .post('/create')
      .send(data)
      .expect(400, done)
  })

})
