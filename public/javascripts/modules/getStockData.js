import axios from 'axios';
import drawChart from './drawChart.js';
import moment from 'moment';
moment().format();
const input = document.getElementById('stock-input');

const endDate = moment().format('YYYY-MM-DD');

const startDate = moment(endDate)
  .subtract(1, 'years')
  .subtract(1, 'months')
  .format('YYYY-MM-DD');

const getStockData = async () => {
  try {
    const stocks = await getAllStocksFromDb();

    const stocksArr = [];
    stocks.forEach(stock => {
      const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?column_index=4&start_date=${startDate}&end_date=${endDate}&collapse=daily&order=asc&api_key=${
        process.env.quandl_api_key
      }`;
      stocksArr.push(Promise.resolve(axios.get(url)));
    });

    const options = [];

    await Promise.all(stocksArr)
      .then(res => {
        res.forEach(stock => {
          const oneStock = {
            name: stock.data.dataset.dataset_code,
            data: timeToMilliseconds(stock.data.dataset.data)
          };
          options.push(oneStock);
          // console.log(oneStock);
        });
      })
      .catch(err => {
        console.log(err);
      });

    // draw chart here, when all data fetched
    input.value = '';
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
    if (stocksSet.size === 0) {
      // default stock
      axios.post('/stock', {
        stock: 'fb'
      });
      stocksSet.add('fb');
    }
    return stocksSet;
  } catch (error) {
    console.log(error);
  }
};

const timeToMilliseconds = data => {
  return data.map(x => {
    return [new Date(x[0]).getTime(), x[1]];
  });
};

export default getStockData;
