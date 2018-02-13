import axios from 'axios';
import drawChart from './drawChart.js';

const url = `https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?column_index=4&start_date=2018-01-01&end_date=2018-02-12&collapse=daily&order=asc&api_key=tEUBaD69NkzPc6io288M`;

const getStockData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data.dataset;
    console.log(data.data);
    const options = [
      { name: 'USD to EUR', data: [1, 2, 3, 4, 5, 6, 5, 4, 3, 9] },
      { name: data.dataset_code, data: data.data }
    ];
    // draw chart here, when all data fetched
    drawChart(options);
  } catch (error) {
    console.log(error);
  }
};

export default getStockData;
