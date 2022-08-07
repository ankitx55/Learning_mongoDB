const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type: String,
        lowercase:true,
        enum: ['fruit', 'vegetables','dairy']
    }
    // this enum will define a string of objects that are our only option for 'category' field

})
// now to compile our schema

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

