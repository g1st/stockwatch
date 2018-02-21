const cards = document.getElementById('cards');

function drawStockCards(stocks) {
  // const stocksArr = stocks.data.data;
  const html = stocks
    .map(stock => {
      // html here
      return `<div class="card">${stock}</div>
              <button id="${stock}">Remove</button>`;
    })
    .join('');

  console.log(html);
  cards.innerHTML = html;
}

export default drawStockCards;
