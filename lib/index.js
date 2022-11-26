'use strict'

class v8nError extends Error {
  constructor(errors) {
    super()
    this.name = 'v8nError'
    this.message = 'v8n error'
    this.errors = errors
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      errors: this.errors
    }
  }
}

const allowUnknownOptions = {
  body: false,
  query: false,
  params: true,
  headers: true
}

const allModes = [
  'body',
  'query',
  'params',
  'headers'
]

module.exports = function v8n(config) {
  if (!config) {
    throw new Error('Schema config is required.')
  }

  return function (req, res, next) {
    var errors = []

    allModes.forEach(mode => {
      const schema = config[mode]
      if (schema) {
        const validateOptions = {
          abortEarly: false,
          allowUnknown: allowUnknownOptions[mode],
          ...(config.options && config.options[mode])
        }
        if (schema.validate) {
          const {error} = schema.validate(req[mode], validateOptions)
          if (!error || error.details.length === 0) {
            return
          }
          error.details.forEach(item => {
            errors.push(item)
          })
        }
      }
    })

    if (errors.length === 0) {
      return next()
    }

    return next(new v8nError(errors))
  }
}

module.exports.v8nError = v8nError
