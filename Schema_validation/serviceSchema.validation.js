import Joi from "joi";

export const serviceSchema_validation = (data) => {

    const schema = Joi.object({
        userId: Joi.string().required(),
        zipCode: Joi.string().required(),
        service_info: Joi.string().required(),
        attachment: Joi.string().required(),
  });

  const valid = schema.validate(data);
  return valid;
};


