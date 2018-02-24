import axios from 'axios';
import { getOptionsForAllStocks } from './getStockData';
import drawChart from './drawChart';
import drawHTML from './drawHTML';
import { saveStock } from './background';
import { socket } from './socketio';

async function onLoad() {
  const length = stocksArr.length;
  if (length === 0) {
    stocksArr.push('fb');
    saveStock('fb');
  }

  optionsArr = await Promise.all(getOptionsForAllStocks(stocksArr));
  drawChart(optionsArr);
  drawHTML(stocksArr);

  // updates all clients when all stocks was removed
  // and one of clients (re)connected with default stock
  if (length === 0) {
    socket.emit('newStock', { optionsArr, stocksArr });
  }
}

export default onLoad;
