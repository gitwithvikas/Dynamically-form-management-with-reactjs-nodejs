
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String,required:true  } 
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
