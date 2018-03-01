import axios from 'axios';

function saveStock(stock) {
  axios
    .post('/stock', {
      stock
    })
    .then(res => {
      // return res;
    })
    .catch(err => {
      // console.log('Invalid Stock Name');
      console.error(err);
    });
}

function removeStock(stock) {
  axios
    .post('/stock/remove', { stock })
    .then(res => {
      // return res;
    })
    .catch(err => console.log(err));
}

export { saveStock, removeStock };
