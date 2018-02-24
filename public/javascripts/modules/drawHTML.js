const cards = document.getElementById('cards');

function drawStockCards(stocks) {
  const html = stocks
    .map(
      stock => `<div class="card">${stock}</div>
              <button id="${stock}">Remove</button>`
    )
    .join('');

  cards.innerHTML = html;
}

export default drawStockCards;
