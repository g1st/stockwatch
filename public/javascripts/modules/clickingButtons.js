import axios from 'axios';
import getStockData from './getStockData';

// make connection
const socket = io.connect('http://localhost:3001');

const stockForm = document.getElementById('stock-form');
const input = document.getElementById('stock-input');

stockForm.addEventListener('submit', function (e) {
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
      socket.emit('newStock');
      // add html

    })
    .catch(err => {
      alert('Invalid Stock Name');
      input.value = '';
    });
});

socket.on('newStock', data => {
  getStockData();
});

// add event listener for remove
// pridet emiteri 'stockRemoved'
// tada kur stock removed html manipuliuot su iteration kad dadet diva su akcijos name ir remove buttonu ar isimt