const Joi = require('joi');
const WebException = require('../exception/WebException');

const validate = (data, validation) => {
  const schema = Joi.object().keys(validation);
  const result = Joi.validate(data, schema, {
    allowUnknown: true,
    abortEarly: true,
  });

  if (result.error) {
    const { message } = result.error.details[0];

    throw new WebException(message.replace(/"/g, ''));
  }
};

module.exports = {
  validate,
  Joi,
};
