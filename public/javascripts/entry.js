import drawChart from './modules/drawChart.js';
import getStockData from './modules/getStockData.js';
import h from './modules/helpers.js';
import clickingButtons from './modules/clickingButtons.js';

getStockData(
  `https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?column_index=4&start_date=2018-01-01&end_date=2018-02-12&collapse=daily&order=asc&api_key=tEUBaD69NkzPc6io288M`
);

// cia callina frontend function pachekint db kokios akcijos yra
// tada kia gauna su jomis callina akciju api
// gave statsus piesia grapha

// papildomos funkcijos kai prideda viena akcija, tai frontende piesia akcija
// callina akciju api, gauna info ir piesia grapha
// prideda akcija i db
// bet josj au viduj kitu, ne ant sito main screeno
