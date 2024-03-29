import express from 'express';
import logger from 'morgan';
import products from "./products/products.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger("dev"));


//Home Route
app.get('/products', (req, res) => {
  // res.send("Hello there");
  res.json(products); //json 
});

//Show Route
app.get('/products/:id', (req, res) => {
  // console.log(req.params);
  const id = req.params.id;
  const product = products.find(product => product._id === id);
  res.json(product);
});
// params allow us to pass the slug. :id

//Create Product Route
app.post("/products", (req, res) => {
  // console.log(req.body);
  const newProduct = req.body;
  products.push(newProduct);
  res.json(products);
});

//Update Product Route
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex(product => product._id === id);

  const updatedProduct = {
    ...products[productIndex],
    _id: req.body._id,
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
  };

  products.splice(productIndex, 1, updatedProduct);
  res.json(updatedProduct);
});

//Delete Product Route.. when using postman, we dont need to put anything in the raw data. 
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex(product => product._id === id);
  console.log(products[productIndex])
  products.splice(productIndex, 1);
  res.json(products)
})


app.listen(PORT, () =>
  console.log(`Listening on Port ${PORT}`))