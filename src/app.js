import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import Joi from 'joi';
import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const client = new MongoClient(process.env.MONGO_URI);

try {
	await client.connect();
	console.log('Mongo conectado!');
} catch (error) {
	console.log(error);
}

const db = client.db('pitchau');

const userSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().trim().required(),
});

app.post('/sign-up', async (req, res) => {
	let { name, email, password } = req.body;

	const validate = userSchema.validate(
		{ name, email, password },
		{ abortEarly: false }
	);
	if (validate.error) {
		const error = validate.error.details.map((detail) => detail.message);
		return res.status(422).send(error);
	}

	name = stripHtml(name).result.trim();
	email = stripHtml(email).result.trim();
	password = stripHtml(password).result.trim();

	const emailNotAvailable = await db.collection('users').findOne({ email });
	const passwordhash = bcrypt.hashSync(password, 12);

	if (emailNotAvailable) {
		return res
			.status(409)
			.send({ message: 'The email is already been in use.' });
	}

	try {
		await db.collection('users').insertOne({
			name,
			email,
			password: passwordhash,
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

app.post('/sign-in', async (req, res) => {
	const { email, password } = req.body;

	const validate = signInSchema.validate(
		{ email, password },
		{ abortEarly: false }
	);

	if (validate.error) {
		const error = validate.error.details.map((detail) => detail.message);
		return res.status(422).send(error);
	}

	try {
		const user = await db.collection('users').findOne({ email });
		const isPasswordTrue = bcrypt.compareSync(password, user.password);
		if (!user || !isPasswordTrue) {
			return res.status(404).send({ message: 'Invalid email or password.' });
		}
		const token = uuid();
		await db.collection('sessions').insertOne({
			token,
			userId: user._id,
		});
		return res.status(202).send({ token });
	} catch (error) {
		return res.status(400).send({ message: 'Invalid email or password.' });
	}
});

const productSchema = Joi.object({
	nameProduct: Joi.string().required(),
	img: Joi.string().required(),
	category: Joi.string().required(),
	description: Joi.string().required(),
});

app.post('/products', async (req, res) => {
	const { nameProduct, img, category, description, price } = req.body;

	const validate = productSchema.validate(
		{ nameProduct, img, category, description },
		{ abortEarly: false }
	);
	if (validate.error) {
		const error = validate.error.details.map((detail) => detail.message);
		return res.status(422).send(error);
	}

	try {
		db.collection('products').insertOne({
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
});

app.get('/products', async (req, res) => {
	const { category } = req.query;

	console.log(category);

	try {
		const products = await db.collection('products').find().toArray();
		if (category) {
			return res.send(products.filter((value) => value.category === category));
		} else {
			res.status(201).send(products);
		}
	} catch (error) {
		console.log(error);
		res.send(500);
	}
});

app.listen(5000);
