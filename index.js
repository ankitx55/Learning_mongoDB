const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
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


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetables', 'dairy', 'new prodct'];
// app.get('/dogs', ( req, res) => {
//   res.send("working fine on dogs");
//   console.log("on dogs");
// });




// ******indexing of all products

app.get('/products', async(req, res) => {
  const products = await Product.find({})
  // console.log(products)
  // res.send('all products will be here')

  res.render('products/index',{products})

  // res.render('products/index.ejs')
  // console.log('new files ')
})







// *******creating new products

app.get('/products/new', (req,res) => {
  res.render('products/new', {categories})
})

app.post('/products', async (req, res)=>{
  // console.log(req.body)
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`)
})












// ***********showing the specific product

app.get('/products/:id',async(req,res)=>{
  const {id} = req.params;
  const product = await Product.findById(id)
  res.render('products/show',{product})
  // console.log(product)
  // res.send('details page')
})


// ***************editing the product
app.get('/products/:id/edit', async(req,res) =>{
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', {product, categories})
})
// **************updating the product
app.put('/products/:id', async(req,res)=>{
  const {id} = req.params;
  const  product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new:true})
  res.redirect(`/products/${product._id}`);
  console.log(req.body);
})



// ******************Delete a product
app.delete('/products/:id', async(req, res) =>{
  // res.send('deleted')
  const {id} = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id)
  res.redirect('/products'); 
})





app.listen(3000, () => {
  console.log("listening on port 3000");
});
