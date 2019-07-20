'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const Joi = require('@hapi/joi')

const v8n = require('../lib')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const v = {
  test: {
    query: Joi.object().keys({
      test: Joi.string().required().max(20),
      name: Joi.string().required().max(20),
    })
  },
  demo: {
    body: Joi.object().keys({
      demo: Joi.string().required().max(20),
      text: Joi.string().required().max(20),
    })
  }
}

app.get('/test', v8n(v.test), function (req, res) {
  res.json(200)
})
app.post('/demo', v8n(v.demo), function (req, res) {
  res.json(200)
})

app.use(function (err, req, res, next) {
  res.status(400).json(err);
})

const server = app.listen(4000, function () {
  const port = server.address().port
  process.stdout.write('Project listening at http://localhost:' + port + '\n')
})

module.exports = app
