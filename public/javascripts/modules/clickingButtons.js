import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import getStockData from './getStockData';
import drawHTML from './drawHTML';
import { getStockData, getOptionsForOneStock } from './getStockData';
import drawChart from './drawChart';
import { saveStock, removeStock } from './background';
import { socket } from './socketio';

const cards = document.getElementById('cards');
const stockForm = document.getElementById('stock-form');
const input = document.getElementById('stock-input');

// add stock handler
stockForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  try {
    const inputStock = sanitizeHtml(input.value);

    // check if stock already exists
    if (stocksArr.includes(inputStock)) {
      alert('Stock ' + inputStock + ' already exists');
      input.value = '';
      return;
    }

    // get info about current stock
    const stockOptions = await getOptionsForOneStock(inputStock);

    if (stockOptions === undefined) {
      alert('Invalid Stock Name');
      return;
    }

    // doubleclick prevention
    if (optionsArr.length > 0) {
      if (!optionsArr.find(stock => stock.name === stockOptions.name)) {
        // get different colors after calling for one stock
        stockOptions._colorIndex =
          optionsArr[optionsArr.length - 1]._colorIndex + 1;
        optionsArr.push(stockOptions);
      } else {
        return;
      }
    } else {
      optionsArr.push(stockOptions);
    }

    // doubleclick prevention
    if (!stocksArr.includes(inputStock)) {
      stocksArr.push(inputStock);
    } else {
      return;
    }

    // update graph
    drawChart(optionsArr);
    // update html
    drawHTML(stocksArr);

    input.value = '';

    // save stock to db in background
    saveStock(inputStock);

    socket.emit('newStock', { optionsArr, stocksArr });
  } catch (err) {
    alert('Invalid Stock Name');
    console.log(err);
    return;
  }
});

// remove stock handler
cards.addEventListener('click', function(e) {
  if (e.target.localName !== 'button') {
    return;
  }

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

  socket.emit('goneStock', { optionsArr, stocksArr });
});
