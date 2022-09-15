import { productSchema } from "../schemas/productsSchema.js";

const postProductsMiddleware = async (req, res, next) => {
  const { nameProduct, img, category, description, price } = req.body;
  const validate = productSchema.validate(
    { nameProduct, img, category, description, price },
    { abortEarly: false }
  );
  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  }
  res.locals.products = { nameProduct, img, category, description, price };
  next();
};

export default postProductsMiddleware;
