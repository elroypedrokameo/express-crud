// Layer untuk handle request dan response
// Handle validasi body

const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById } = require('./product.service');


router.get('/', async (req, res) => {
  const products = await getAllProducts();

  res.send(products);

});

router.get('/:id', async (req, res) => {

  try {
    const productId = Number(req.params.id)

    const product = await getProductById(productId)
  
    res.send(product)  
  } catch (error) {
    res.status(400).send(error.message) 
  }
})

router.post('/', async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData)

    res.send({
      data: product,
      message: "Create new product successfully!",
    })    
  } catch (error) {
    res.status(400).send(error.message)
  }

});


router.delete('/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);

    await deleteProductById(productId)
  
    res.send("Delete product successfully!"); 
  } catch (error) {
    res.status(400).send(error.message)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const productData = req.body;

    if(!(productData.name && productData.description && productData.image && productData.price)) {
      return res.status(400).send("Missing data!");
    }

    const product = await updateProductById(productId, productData)

    res.send({
      data: product,
      message: "Update product successfully!",
      status: 201,
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const newProductData = req.body;
  
    await updateProductById(productId, newProductData)
    
    res.send({
      message: "Update product successfully!"
    })
  } catch (error) {
    res.status(400).send(error.message )
  }
})

module.exports = router;