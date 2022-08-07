const mongoose = require("mongoose");

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
  .then(() => {
    console.log("mongo connection open");
  })
  .catch(err => {
    console.log("ohh no mongo error")
    console.log(err)
  });

const seedProducts = [
  {
    name: 'Ruby 1',
    price: 1.99,
    category: 'fruit'
},
{
  name: 'Ruby 2',
  price: 2.99,
  category: 'fruit'
},
{
  name: 'Ruby 3',
  price: 3.99,
  category: 'fruit'
},
{
  name: 'Ruby 4',
  price: 4.99,
  category: 'fruit'
}
]
  

Product.insertMany(seedProducts)
.then((res)=> {
  console.log(res)
})
.catch((e) => {
  console.log(e)
})





// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })


// p.save()
// .then(p=>{
//   console.log(p)
// })
// .catch(e=>{
//   console.log(e)
// })