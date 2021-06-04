'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const Joi = require('joi')

const v8n = require('../lib')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const v = {
  user: {
    query: Joi.object().keys({
      name: Joi.string().required().max(20)
    })
  },
  create: {
    body: Joi.object().keys({
      id: Joi.string().required().max(20),
      name: Joi.string().required().max(20)
    })
  },
  spec: {
    headers: Joi.object().keys({
      token: Joi.string().required()
    })
  },
  info: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^\d+$/).required()
    })
  }
}

app.get('/', function (req, res) {
  res.send('Hello world')
})

const r200 = function (req, res) {
  res.json(200)
}

app.get('/user', v8n(v.user), r200)
app.post('/create', v8n(v.create), r200)
app.get('/spec', v8n(v.spec), r200)
app.get('/info/:id', v8n(v.info), r200)

app.use(function (err, req, res, next) {
  if (err.name === 'v8nError') {
    res.status(400).json(err.errors[0].message)
  } else {
    res.status(400).json(err)
  }
})

app.listen(4000)

module.exports = app
