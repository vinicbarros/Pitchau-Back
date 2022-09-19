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

const deleteProductsAndSaveBuy = async (req, res) => {
  const buy = req.body;
  const user = res.locals.user;

  try {
    await db.collection("cart").deleteMany({ userId: user._id });
    await db.collection("buy").insertOne({
      userId: user._id,
      method: buy.method,
      payment: buy.payment,
      numberCard: buy.numberCard,
      cvv: buy.cvv,
      products: buy.products,
    });
    res.status(200).send({ message: "Finished buy successfully." });
  } catch (error) {
    res.status(404).send({ message: "An error ocurred." });
  }
  //
};

export { postProducts, getProducts, deleteProductsAndSaveBuy };
