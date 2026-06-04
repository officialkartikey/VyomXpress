import Joi from "joi";

export const signupSchema =
  Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain uppercase, lowercase, number and special character",
      }),
  });

export const loginSchema =
  Joi.object({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .required(),
  });