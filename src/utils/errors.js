class NotFoundError extends Error {
  constructor(message, options) {
    super(`404 not found: ${message}`, options);
  }
}

class InvalidInputError extends Error {
  constructor(message, options) {
    super(`400 invalid Input: ${message}`, options);
  }
}
  
  module.exports = {NotFoundError,InvalidInputError};