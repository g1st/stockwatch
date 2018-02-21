// cia visos db funkcijos kru seivina i db

function saveStock(stock) {
  axios
    .post('/stock', {
      stock
    })
    .then(res => {
      console.log(res);
      input.value = '';

      // stock added - update all clients
      // socket.emit('newStock', { data: res.data.stocks });
      // add html

      // drawHTML(res.data.stocks);
    })
    .catch(err => {
      alert('Invalid Stock Name');
      input.value = '';
    });
}
