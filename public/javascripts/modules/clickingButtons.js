import axios from 'axios';
import getStockData from './getStockData';
import drawHTML from './drawHTML';
import { getStockData, getOptionsForOneStock } from './getStockData';
import drawChart from './drawChart';
import { saveStock, removeStock } from './background';

const cards = document.getElementById('cards');

// make connection
const socket = io.connect('http://localhost:3001');

const stockForm = document.getElementById('stock-form');
const input = document.getElementById('stock-input');

stockForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  try {
    const inputStock = input.value;

    // check if stock already exists
    if (stocksArr.includes(inputStock)) {
      alert('Stock ' + inputStock + ' already exists');
      return;
    }
    // get info about current stock
    const stockOptions = await getOptionsForOneStock(inputStock);
    if (stockOptions === undefined) {
      alert('Invalid Stock Name');
      return;
    }

    // double click prevention
    if (optionsArr.length > 0) {
      if (!optionsArr.find(stock => stock.name === stockOptions.name)) {
        // get different colors after calling for one stock
        stockOptions._colorIndex =
          optionsArr[optionsArr.length - 1]._colorIndex + 1;
        optionsArr.push(stockOptions);
      } else {
        return;
      }
    }
    optionsArr.push(stockOptions);

    // update graph
    drawChart(optionsArr);

    // doubleclick prevention
    if (!stocksArr.includes(inputStock)) {
      stocksArr.push(inputStock);
    } else {
      return;
    }
    // update html
    drawHTML(stocksArr);
    input.value = '';

    // save stock to db in background
    saveStock(inputStock);
    // axios
    //   .post('/stock', {
    //     stock: inputStock
    //   })
    //   .then(res => {
    //     // input.value = '';
    //     // stock added - update all clients
    //     // socket.emit('newStock', { data: res.data.stocks });
    //     // add html
    //     // drawHTML(res.data.stocks);
    //   })
    //   .catch(err => {
    //     console.log('Invalid Stock Name');
    //     console.error(err);
    //   });
  } catch (err) {
    alert('Invalid Stock Nameyyy');
    console.log(err);
    return;
  }
});

input.value = '';
// socket.on('newStock', data => {
//   getStockData();
//   drawHTML(data);
// });

// add event listener for remove
cards.addEventListener('click', function(e) {
  if (e.target.localName !== 'button') {
    return;
  }
  // console.log(e.target.localName);

  // update graph
  const idxToRemove = optionsArr.findIndex(
    stock => stock.name === e.target.id.toUpperCase()
  );
  optionsArr.splice(idxToRemove, 1);
  drawChart(optionsArr);

  //update html
  stocksArr.splice(stocksArr.indexOf(e.target.id), 1);
  drawHTML(stocksArr);

  // remove from db in background
  removeStock(e.target.id);
  // axios
  //   .post('/stock/remove', {
  //     stock: e.target.id
  //   })
  //   .then(res => {
  //     // socket.emit('newStock', { data: res.data.data });
  //     return;
  //   })
  //   .catch(err => console.log(err));
});
