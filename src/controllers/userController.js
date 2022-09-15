import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { stripHtml } from "string-strip-html";
import { ObjectId } from "mongodb";

const postSignIn = async (req, res) => {
  const { email, password } = res.locals.user;

  try {
    const user = await db.collection("users").findOne({ email });
    const isPasswordTrue = bcrypt.compareSync(password, user.password);
    if (!user || !isPasswordTrue) {
      return res.status(404).send({ message: "Invalid email or password." });
    }
    const token = uuid();
    await db.collection("sessions").insertOne({
      token,
      userId: user._id,
    });
    return res.status(202).send({ token });
  } catch (error) {
    return res.status(400).send({ message: "Invalid email or password." });
  }
};

const postSignUp = async (req, res) => {
  let { name, email, password } = res.locals.user;

  name = stripHtml(name).result.trim();
  email = stripHtml(email).result.trim();
  password = stripHtml(password).result.trim();

  const emailNotAvailable = await db.collection("users").findOne({ email });
  const passwordhash = bcrypt.hashSync(password, 12);

  if (emailNotAvailable) {
    return res
      .status(409)
      .send({ message: "The email is already been in use." });
  }

  try {
    await db.collection("users").insertOne({
      name,
      email,
      password: passwordhash,
    });
    return res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error);
  }
};

const postCart = async (req, res) => {
  const { productId } = req.body;
  const user = res.locals.user;

  try {
    const productExists = await db
      .collection("products")
      .findOne({ _id: ObjectId(productId) });
    if (!productExists)
      return res.status(401).send({ message: "Invalid product." });

    const addToCart = await db.collection("cart").insertOne({
      userId: user._id,
      productId,
      name: productExists.nameProduct,
    });

    let price = productExists.price;
    let name = productExists.nameProduct;
    let description = productExists.description;
    let img = productExists.img;
    return res.status(201).send({
      message: "Product added to cart",
      product: { name, price, description, img },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getCart = async (req, res) => {
  try {
    const userCartList = await db
      .collection("cart")
      .find({ _id: user._id })
      .toArray();
    return res.status(201).send({ userCartList });
  } catch (error) {
    return res.status(404).send(error);
  }
};

export { postSignIn, postSignUp, postCart, getCart };
