import axios from 'axios';
import { getOptionsForAllStocks } from './getStockData';
import drawChart from './drawChart';
import drawHTML from './drawHTML';
import { saveStock } from './background';

async function onLoad() {
  if (stocksArr.length === 0) {
    stocksArr.push('fb');

    // save to db in background (sudet db funkcijas i atksira folderi)
    // arti baigto esi, paskui emiterius sutvaryt ir tada ant dizaino
    // axios
    //   .post('/stock', { stock: 'fb' })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.error('Invalid Stock Name');
    //   });
    saveStock('fb');
  }

  optionsArr = await Promise.all(getOptionsForAllStocks(stocksArr));
  console.log(optionsArr);
  drawChart(optionsArr);
  drawHTML(stocksArr);
}

export default onLoad;
