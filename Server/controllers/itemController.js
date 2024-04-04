
const Item = require('../models/item');

const itemController = {
  getAllItems: async (req, res, next) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (err) {
      next(err);
    }
  },

  createItem: async (req, res, next) => {

    try {
      const newItem = await Item.create({
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        date: req.body.date,
        image: req.file ? req.file.path : null
      });
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  },

  updateItem: async (req, res, next) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        date: req.body.date,
        image: req.file.path  
      }, { new: true });
      res.json(updatedItem);
    } catch (err) {
      next(err);
    }
  },

  deleteItem: async (req, res, next) => {
    try {
      await Item.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = itemController;
