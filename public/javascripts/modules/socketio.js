import drawHTML from './drawHTML';
import drawChart from './drawChart';

// make connection
const socket = io.connect('http://localhost:3001');

socket.on('newStock', res => {
  console.log(res);
  stocksArr = res.data.stocksArr;
  optionsArr = res.data.optionsArr;

  // update graph
  drawChart(res.data.optionsArr);
  // update html
  drawHTML(res.data.stocksArr);
});

socket.on('goneStock', res => {
  console.log(res);
  stocksArr = res.data.stocksArr;
  optionsArr = res.data.optionsArr;

  drawChart(res.data.optionsArr);
  drawHTML(res.data.stocksArr);
});

export { socket };
