import axios from 'axios';
import drawChart from './drawChart.js';
import moment from 'moment';
moment().format();

const endDate = moment().format('YYYY-MM-DD');

const startDate = moment(endDate)
  .subtract(1, 'years')
  .format('YYYY-MM-DD');

const getStockData = async () => {
  try {
    const stocks = await getAllStocksFromDb();

    const stocksArr = [];
    stocks.forEach(stock => {
      const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?column_index=4&start_date=${startDate}&end_date=${endDate}&collapse=daily&order=asc&api_key=tEUBaD69NkzPc6io288M`;
      stocksArr.push(function() {
        return axios.get(url);
      });
    });

    console.log(stocksArr);

    // for (const stock of stocks) {
    //   console.log(stock);
    // const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?column_index=4&start_date=${startDate}&end_date=${endDate}&collapse=daily&order=asc&api_key=tEUBaD69NkzPc6io288M`;
    //   const response = await axios.get(url);
    //   const data = response.data.dataset.data;
    //   const name = response.data.dataset.dataset_code;
    //   console.log(data, name);
    // }

    // const options = [
    //   // { name: 'USD to EUR', data: [1, 2, 3, 4, 5, 6, 5, 4, 3, 9] },
    //   { name, data }
    // ];
    // draw chart here, when all data fetched
    drawChart(options);
  } catch (error) {
    console.log(error);
  }
};

const getAllStocksFromDb = async () => {
  try {
    const stocksInDb = await axios.get('stock/all');

    const stocksSet = new Set();
    for (const stock of stocksInDb.data.stocks) {
      stocksSet.add(stock.stock);
    }
    return stocksSet;
  } catch (error) {
    console.log(error);
  }
};

export default getStockData;
