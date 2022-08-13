const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("ohh no mongo error")
    console.log(err)
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))

const categories = ['fruit', 'vegetable', 'dairy'];
// app.get('/dogs', ( req, res) => {
//   res.send("working fine on dogs");
//   console.log("on dogs");
// });






app.get('/products', async(req, res) => {
  const products = await Product.find({})
  // console.log(products)
  // res.send('all products will be here')

  res.render('products/index',{products})

  // res.render('products/index.ejs')
  // console.log('new files ')
})









app.get('/products/new', (req,res) => {
  res.render('products/new')
})

app.post('/products', async (req, res)=>{
  // console.log(req.body)
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`)
})














app.get('/products/:id',async(req,res)=>{
  const {id} = req.params;
  const product = await Product.findById(id)
  res.render('products/show',{product})
  // console.log(product)
  // res.send('details page')
})

app.listen(3000, () => {
  console.log("listening on port 3000");
});
