const ErrorObject = require('../utils/ErrorObject');

function validationFactory(validationObject, validatePart = 'body') {
  return async function validationMiddleware(req, res, next) {
    try {
      await validationObject.validateAsync(req[validatePart]);
    } catch (e) {
      return next(new ErrorObject(400, `Invalid inputs: ${e.message}`));
    }
    next();
  };
}

module.exports = validationFactory;
