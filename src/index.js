const express = require('express');
const dotenv = require('dotenv');
const productController = require("./product/product.controller.js")

const app = express();

app.use(express.json());

dotenv.config();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/products', productController)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});