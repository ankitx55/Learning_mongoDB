const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Product = require('./models/product');

mongoose.connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("ohh no mongo error")
    console.log(err)
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/dogs', ( req, res) => {
//   res.send("working fine on dogs");
//   console.log("on dogs");
// });


app.get('/product', async(req, res) => {
  const products = await Product.find({})
  // console.log(products)
  // res.send('all products will be here')

  res.render('products/index',{products})

  // res.render('products/index.ejs')
  // console.log('new files ')
})

app.listen(3000, () => {
  console.log("listening on port 3000");
});
