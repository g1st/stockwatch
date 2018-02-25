import axios from 'axios';
import drawChart from './drawChart.js';
import moment from 'moment';
import drawHTML from './drawHTML';
moment().format();

const input = document.getElementById('stock-input');
const endDate = moment().format('YYYY-MM-DD');
const startDate = moment(endDate)
  .subtract(1, 'years')
  .subtract(1, 'months')
  .format('YYYY-MM-DD');

async function getStockData() {
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
            // highcharts want millis
            data: timeToMilliseconds(stock.data.dataset.data)
          };
          options.push(oneStock);
        });
      })
      .catch(err => {
        console.log(err);
      });

    drawChart(options);
  } catch (error) {
    console.log(error);
  }
}

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

function getOptionsForOneStock(stock) {
  // call for that one stock and add to options
  return Promise.resolve(
    axios
      .get(
        `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?column_index=4&start_date=${startDate}&end_date=${endDate}&collapse=daily&order=asc&api_key=${
          process.env.quandl_api_key
        }`
      )
      .then(res => {
        return {
          name: res.data.dataset.dataset_code,
          data: timeToMilliseconds(res.data.dataset.data)
        };
      })
      .catch(err => {
        // console.log(err);
      })
  );
}

function getOptionsForAllStocks(stocks) {
  return stocks.map(stock => {
    return Promise.resolve(
      axios
        .get(
          `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?column_index=4&start_date=${startDate}&end_date=${endDate}&collapse=daily&order=asc&api_key=${
            process.env.quandl_api_key
          }`
        )
        .then(res => {
          return {
            name: res.data.dataset.dataset_code,
            data: timeToMilliseconds(res.data.dataset.data)
          };
        })
        .catch(err => console.log(err))
    );
  });
}
export { getStockData, getOptionsForOneStock, getOptionsForAllStocks };
