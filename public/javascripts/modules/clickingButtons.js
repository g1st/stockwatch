import axios from 'axios';

const stockForm = document.getElementById('stock-form');
const input = document.getElementById('stock-input');

stockForm.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(input.value);

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
      // prideti callinti API su visom akcijom
    })
    .catch(err => {
      console.error(err);
    });
});
