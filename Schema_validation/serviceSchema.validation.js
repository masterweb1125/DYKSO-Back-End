import Joi from "joi";

export const serviceSchema_validation = (data) => {

    const schema = Joi.object({
      userId: Joi.string().required(),
      posterName: Joi.string().required(),
      posterEmail: Joi.string().email().required(),
      profileImage: Joi.string().optional(),
      zipCode: Joi.string().required(),
      serviceTitle: Joi.string().required(),
      service_info: Joi.string().optional(),
      attachment: Joi.string().optional(),
    });

  const valid = schema.validate(data);
  return valid;
};


