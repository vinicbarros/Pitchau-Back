import db from "../database/db.js";

const postProducts = async (req, res) => {
  const { nameProduct, img, category, description, price } =
    res.locals.products;

  try {
    db.collection("products").insertOne({
      nameProduct,
      img,
      category,
      description,
      price,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

const getProducts = async (req, res) => {
  const { category } = req.query;

  try {
    const products = await db.collection("products").find().toArray();
    if (category) {
      return res.send(products.filter((value) => value.category === category));
    } else {
      res.status(201).send({ products });
    }
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

export { postProducts, getProducts };
