const Joi = require("joi");

module.exports.userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("user").default("user").messages({
    "string.base": "Role must be a string",
    "string.valid": "Role must be a valid role",
  }),
  subscription: Joi.object({
    plan: Joi.string()
      .valid("free", "premium", "pro")
      .default("free")
      .messages({
        "string.base": "Subscription plan must be a string",
        "any.only": "Plan must be one of 'free', 'premium', or 'pro'",
      }),
    startDate: Joi.date()
      .default(() => new Date())
      .messages({
        "date.base": "Start date must be a valid date",
      }),
    endDate: Joi.date()
      .greater(Joi.ref("startDate"))
      .default(() => {
        const date = new Date();
        return new Date(date.setMonth(date.getMonth() + 1));
      })
      .messages({
        "date.base": "End date must be a valid date",
        "date.greater": "End date must be after the start date",
      }),
  }),
});

module.exports.websiteSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  url: Joi.string().uri().required().messages({
    "string.base": "URL must be a string",
    "string.uri": "URL must be a valid URL",
    "string.empty": "URL cannot be empty",
    "any.required": "URL is required",
  }),
  interval: Joi.number().default(2).messages({
    "number.base": "Interval must be a number",
  }),
});

module.exports.logSchema = Joi.object({
  status: Joi.string().valid("online", "offline").required().messages({
    "string.base": "Status must be a string",
    "string.valid": "Status must be one of 'online' or 'offline'",
    "any.required": "Status is required",
  }),
  responseTime: Joi.number().required().messages({
    "number.base": "Response time must be a number",
    "any.required": "Response time is required",
  }),
  message: Joi.string().required().messages({
    "string.base": "Message must be a string",
  }),
  checkedAt: Joi.date()
    .default(() => new Date())
    .messages({
      "date.base": "Checked at must be a valid date",
    }),
});

// module.exports.notifySchema = Joi.object({
//   type: Joi.string().valid("email", "sms").default("email").messages({
//     "string.base": "Type must be a string",
//     "string.valid": "Type must be one of 'email' or 'sms'",
//   }),
// });

module.exports.trafficSchema = Joi.object({
  timestamp: Joi.date().required().messages({
    "date.base": "Timestamp must be a date",
    "any.required": "Timestamp is required",
  }),
  responseCount: Joi.number().required().messages({
    "number.base": "Response Count must be a number",
    "any.required": "Response Count is required",
  }),
});
