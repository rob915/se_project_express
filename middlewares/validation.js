const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const { validate } = require("../models/user");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItemOnCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),

    weather: Joi.string().required().valid("hot", "warm", "cold"),
  }),
});

const validateUserInfoBodyOnCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string-empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field is required',
      "string.email": 'The "email" must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled out',
    }),
  }),
});

const validateUserInfoBodyOnUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string-empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" must be a valid url',
    }),
  }),
});

const authenticationOnUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field is required',
      "string.email": 'The "email" must be a valid email',
    }),

    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled out',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    postId: Joi.string().hex().length(24),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateClothingItemOnCreate,
  validateUserInfoBodyOnCreate,
  validateUserInfoBodyOnUpdate,
  authenticationOnUserLogin,
  validateUserId,
  validateItemId,
};
