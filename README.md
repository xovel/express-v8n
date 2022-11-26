# express-v8n

Express validation middleware using joi.

## Install

`npm install express-v8n`

## Example

```js
'use strict'

const express = require('express')
const v8n = require('express-v8n')

const Joi = require('joi')

const app = express()

app.use(function (err, req, res, next) {
  if (err.name === 'v8nError') {
    res.status(400).json(err.errors)
  } else {
    res.status(400).json(err)
  }
})

const options = {
  query: Joi.object().keys({
    id: Joi.string().required().max(20),
    name: Joi.string().required().max(20)
  })
}

app.get('/user', v8n(options), function (req, res) {
  res.json({data: 'ok'})
})

app.listen(4000)
```

## Options

### query

Joi scheme for `req.query`.

### params

Joi scheme for `req.params`.

### headers

Joi scheme for `req.headers`.

### body

Joi scheme for `req.body`.

> `body-parser` maybe a useful helper.

### options

Joi scheme validate config for each mode.

## License

[MIT](LICENSE)
