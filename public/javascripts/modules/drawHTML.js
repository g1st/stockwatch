const cards = document.getElementById('cards');

function drawStockCards(stocks) {
  console.log(stocks, 'in drawHTML');
  const stocksArr = stocks.data.data;
  const html = stocksArr
    .map(stock => {
      // html here
      return `<div class="card">${stock.stock}</div>
              <button id="${stock.stock}">Remove</button>`;
    })
    .join('');

  cards.innerHTML = html;
}

export default drawStockCards;
