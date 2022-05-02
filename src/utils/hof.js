const {NotFoundError} = require('../utils/errors');

function handleError(fn) {
  return function(req, res, next) {
    try {
      fn(req, res, next);
    } catch (err) {
      console.log('Something went wrong');
      next(err);
    } 
  }
}

function handleErrorAsync(fn) {
  return  async  function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log('Something went wrong');
      next(err);
    } 
  }
}

module.exports = {handleError, handleErrorAsync};