const cards = document.getElementById('cards');

function drawStockCards(stocks) {
  const html = stocks
    .map(
      stock => `<div class="card">
                  <h2>${stock}</h2>
                  <button id="${stock}" class="button button__remove">Remove</button>
                </div>`
    )
    .join('');

  cards.innerHTML = html;
}

export default drawStockCards;
