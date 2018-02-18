import axios from 'axios';
import getStockData from './getStockData';
import drawHTML from './drawHTML';
const cards = document.getElementById('cards');

// make connection
const socket = io.connect('http://localhost:3001');

const stockForm = document.getElementById('stock-form');
const input = document.getElementById('stock-input');

stockForm.addEventListener('submit', function(e) {
  e.preventDefault();

  axios
    .post('/stock', {
      stock: input.value
    })
    .then(res => {
      console.log(res);

      // stock already in db
      if (res.data.message) {
        alert(res.data.message);
        return;
      }
      // stock added - update all clients
      socket.emit('newStock', { data: res.data.stocks });
      // add html
      // drawHTML(res.data.stocks);
    })
    .catch(err => {
      alert('Invalid Stock Name');
      input.value = '';
    });
});

socket.on('newStock', data => {
  getStockData();
  drawHTML(data);
});

// add event listener for remove
cards.addEventListener('click', function(e) {
  if (e.target.localName !== 'button') {
    return;
  }
  console.log(e.target.localName);
  axios
    .post('/stock/remove', {
      stock: e.target.id
    })
    .then(res => {
      socket.emit('newStock', { data: res.data.data });
      return;
    })
    .catch(err => console.log(err));
});
// pridet emiteri 'stockRemoved'
// tada kur stock removed html manipuliuot su iteration kad dadet diva su akcijos name ir remove buttonu ar isimt
