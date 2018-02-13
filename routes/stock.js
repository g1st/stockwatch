const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Stock = require('../models/stocks');

/* handle POST stock request */
router.post('/', async function(req, res, next) {
  try {
    const stockName = req.body.stock;
    const oneStock = await Stock.find({ stock: stockName });
    if (oneStock.length) {
      // stock already exsists
      return res.status(200).json({ message: 'Stock already exists' });
    }
    // before saving need to check if it exists in stocks db
    // validStockName(stockName)
    const stock = await new Stock({ stock: stockName }).save();
    const Stocks = await Stock.find({});
    console.log('Stocks - ', Stocks);
    // 201 = created successfully
    res.status(201).json({ stocks: Stocks });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
