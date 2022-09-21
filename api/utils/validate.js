const Joi = require('joi');
const WebException = require('../exception/WebException');


const validate = (data, validation, language) => {
  const schema = Joi.object().keys(validation);
  const result = Joi.validate(data, schema, {
    allowUnknown: true,
    abortEarly: true,
  });

  if (result.error) {
    const message = result.error.details[0].message;

    throw new WebException(message.replace(/"/g, ''));
  }
};


module.exports = {
  validate,
  Joi,
};
