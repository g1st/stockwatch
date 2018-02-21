import drawChart from './modules/drawChart.js';
import { getStockData } from './modules/getStockData.js';
import h from './modules/drawHTML.js';
import clickingButtons from './modules/clickingButtons.js';
import onLoad from './modules/onLoad.js';

onLoad();

// viska pakeist kad tie kdaug requestu nedarytu,
// kad po remove'o fronte tik nuimtu.
// reikia globaliai turet akciju arr?
