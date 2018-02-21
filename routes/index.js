const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Stock = require('../models/stocks');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const Stocks = await Stock.find({});
    const stocksArr = [];

    for (let stock of Stocks) {
      stocksArr.push(stock.stock);
    }

    return res.render('index', {
      title: 'watchstocks',
      stocks: Stocks,
      stocksArr: JSON.stringify(stocksArr)
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
