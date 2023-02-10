<div align="center"><img src="https://i.imgur.com/kWq95V6.png"></img></div>
<hr>
<h2 align=center>Pitchau</h2>
<h3 align=center>E-Commerce Web APP | Back-End Project</h3>
<hr>
<h4 align=center>This is a FullStack project of a complete E-Commerce APP. Pitchau was inspired in the tech store of Pichau!</h4>
<h4 align=center>This repository is just Back-End, you can find the Front-End part in my github profile! </h4>
<br>
<div align=center style="display:flex; justify-content: center; gap:5%">
    <img style="width: 600px" src="https://i.imgur.com/9R6d27H.gif">
</div>

## About

Pithcau E-Commerce was made for the fourteenth project of Driven Full Stack Web Development bootcamp. And it was made by two amazing developers
who loves technology and games!

## Features

- Log in
- Sign up
- Authentication routes for registering and logging in
- You can see all products in the store
- You can filter for categories in the navigation bar
- You can add and remove products to your cart
- See what products are in your cart
- Checkout page
- Number of products in your cart shows dinamically in the top cart icon
- Finish buy using just a fake card

## API Features

- Insert new products (Authenticated Router)
- Get products (Authenticated Router)
- Sign In and Sign Up route
- Add, remove products to your cart
- Checkout route

### Built with

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### How to run (You need MongoDB installed to continue)

1. Clone the project

```bash
  git clone https://github.com/vinicbarros/Pitchau-Back.git
```

2. Go to the project directory

```bash
  cd Pitchau-Back
```

3. Install dependencies

```bash
  npm install
```

4. Go to src directory

```bash
  cd src
```

5. Before running server, make sure that MongoDB is running in your machine and a db called "pitchau" is created

6. Start the server

```bash
  npm run dev
```

## API documentation

<hr>
<br>

### Create new account

<hr>

```http
  POST /sign-up
```

Body:

```json
{
  "name": "Pedro",
  "email": "pedro@gmail.com",
  "password": "secret"
}
```

Response:

- Invalid Body

```json
"status": 400
```

- Email is already in use

```json
"status": 409
```

- Account is created

```json
"status": 201
```

<br>

### Log in to your account

<hr>

```http
  POST /sign-in
```

Body:

```json
{
  "email": "pedro@gmail.com",
  "password": "secret"
}
```

Response:

- Invalid Body

```json
"status": 400
```

- Email and password do not match

```json
"status": 404
```

- User is logged in

```json
"status": 202
```

Response Body:

```json
{
  "user": {
    "id": 1,
    "name": "Pedro",
    "email": "pedro@gmail.com"
  },
  "token": "token"
}
```

<br>

### **All routes below are authenticated routes and will use an authorization header as shown below**

Instead of "token", use your own token acquired through the **/sign-in** route

```json
{
  "headers": {
    "Authorization": "Bearer token"
  }
}
```

<br>

### Create new product

<hr>

```http
  POST /products
```

Body:

```json
{
  "nameProduct": "Headset Gamer With LED",
  "img": "https://image.png",
  "category": "Headset",
  "description": "Best headset",
  "price": 10099
}
```

Response:

- Invalid Body

```json
"status": 400
```

- Product is created

```json
"status": 201
```

<br>

### Return all products

<hr>

```http
  GET /products
```

Response:

```json
{
  "products": [
    {
      "_id": "1",
      "nameProduct": "Notebook gamer",
      "img": "https://notebookimage.png",
      "category": "Notebook",
      "description": "The best notebook ever!",
      "price": 128099
    }
  ]
}
```

<br>

### Returns the filtered products by category

<hr>

```http
  GET /products?category={category}
```

| Parâmetro  | Tipo     | Descrição                        |
| :--------- | :------- | :------------------------------- |
| `category` | `string` | **Needs to be a valid category** |

Response:

```json
{
  "products": [
    {
      "_id": "1",
      "nameProduct": "Notebook gamer",
      "img": "https://notebookimage.png",
      "category": "Notebook",
      "description": "The best notebook ever!",
      "price": 128099
    }
  ]
}
```

<br>

### Finish buy

<hr>

```http
  POST /checkout
```

Body:

```json
{
  "method": "Credit",
  "payment": "",
  "numberCard": 123456789,
  "cvv": 123,
  "products": []
}
```

Response:

- Invalid Body

```json
"status": 404
```

- Buy completed

```json
"status": 200
```

<br>

### Post cart

<hr>

```http
  POST /cart
```

Body:

```json
{
  "productId": 12
}
```

Response:

- Invalid Body

```json
"status": 401
```

- Product added

```json
"status": 201
```

<br>

### Get cart

<hr>

```http
  GET /cart
```

Response:

- Invalid Body

```json
"status": 401
```

- Status OK

```json
{
  "userCartList": [
    {
      "_id": "1",
      "userId": "1",
      "productId": "2",
      "name": "Monitor ",
      "img": "https://monitor.jpg",
      "description": "The best!",
      "price": 72999
    }
  ]
}
```

<br>

### Delete product of cart by id

<hr>

```http
  DELETE /cart/:id
```

| Parâmetro | Tipo     | Descrição                  |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Needs to be a valid id** |

Response:

- Invalid Params

```json
"status": 404
```

- Item deleted

```json
"status": 200
```


## Contact

Feel free to contact me in Linkedin!

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/ovinibarros/
