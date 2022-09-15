import Joi from "joi";

const productSchema = Joi.object({
  nameProduct: Joi.string().required(),
  img: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

const productCartSchema = Joi.object({
  productId: Joi.string().required(),
});

export { productCartSchema, productSchema };
