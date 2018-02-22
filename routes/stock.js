const axios = require('axios');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Stock = require('../models/stocks');
const moment = require('moment');
moment().format();

/* handle POST stock request */
router.post('/', async function(req, res, next) {
  try {
    const stockName = req.body.stock;
    const currentMonthEnd = moment()
      .endOf('month')
      .format('YYYY-MM-DD');
    const previousMonthEnd = moment(currentMonthEnd)
      .add(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');

    const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockName}.json?start_date=${currentMonthEnd}&end_date=${previousMonthEnd}&collapse=monthly&api_key=${
      process.env.quandl_api_key
    }`;

    try {
      const stockExists = await axios.get(url);
    } catch (error) {
      return res.status(404).json({ error: `Invalid stock name` });
    }

    // const oneStock = await Stock.find({ stock: stockName });
    // if (oneStock.length) {
    //   // stock already exsists
    //   return res.status(200).json({
    //     message: `Stock ${stockName} already exists`
    //   });
    // }
    const stock = await new Stock({ stock: stockName }).save();
    const Stocks = await Stock.find({});

    // 201 = created successfully
    res.status(201).json({ stocks: Stocks });
  } catch (error) {
    console.log(error);
  }
});

// remove stock
router.post('/remove', async function(req, res) {
  try {
    await Stock.findOneAndRemove({ stock: req.body.stock });
    const stocks = await Stock.find({});
    return res.status(200).json({ data: stocks });
  } catch (err) {
    console.log(err);
  }
});

// get all stocks
router.get('/all', async function(req, res) {
  try {
    const Stocks = await Stock.find({});
    return res.status(200).json({ stocks: Stocks });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
