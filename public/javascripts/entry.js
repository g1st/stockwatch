import drawChart from './modules/drawChart.js';
import getStockData from './modules/getStockData.js';
import h from './modules/helpers.js';
import clickingButtons from './modules/clickingButtons.js';

getStockData();

// cia callina frontend function pachekint db kokios akcijos yra
// tada kia gauna su jomis callina akciju api
// gave statsus piesia grapha

// papildomos funkcijos kai prideda viena akcija, tai frontende piesia akcija
// callina akciju api, gauna info ir piesia grapha
// prideda akcija i db
// bet josj au viduj kitu, ne ant sito main screeno
